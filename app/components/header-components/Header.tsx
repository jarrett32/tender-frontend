import { useCallback, useEffect, useRef, useState, useContext } from "react";
import NetworksDropdown from "./networksDropdown";
import ConnectWallet from "./connect-wallet";
import { useLocation } from "react-router-dom";
import ClaimRewardsModal from "../claimRewardsModal/claimRewardsModal";
import { allData, displayTND, displayTNDInUSD } from "../earn-page/earnContent";
import { TenderContext } from "~/contexts/tender-context";
import { displayErrorMessage } from "../deposit-borrow-flow/displayErrorMessage";
import { getAllData, quotePriceInUSDC } from "~/lib/tnd";
import { useWeb3Signer } from "~/hooks/use-web3-signer";
import { hooks as Web3Hooks } from "~/connectors/meta-mask";
import useAuth from "~/hooks/use-auth";
import { useTndPrice } from "~/hooks/useTndPrice";
import * as TND from "~/lib/tnd";
import toast from "react-hot-toast";

const menuLinks = [
  {
    name: "Dashboard",
    link: "/",
    target: "_self",
  },
  {
    name: "Markets",
    link: "/markets",
    target: "_self",
  },
  // hiding temporarily, will need it later
  {
    name: "Earn",
    link: "/earn",
    target: "_self",
  },
  {
    name: "Docs",
    link: "https://docs.tender.fi",
    target: "_blank",
  },
  {
    name: "Community",
    link: "https://discord.com/invite/TenderFi",
    target: "_blank",
  },
];

export default function Header() {
  let location = useLocation();
  const burgerRef = useRef<any>(null);
  const menuRef = useRef<any>(null);
  const [activePopupMenu, setActivePopupMenu] = useState<boolean>(false);
  const [dataClaimModal, setDataClaimModal] = useState<any>({ open: false });
  const [TNDData, setTNDData] = useState<allData | null>(null);
  const { networkData } = useContext(TenderContext);

  const provider = Web3Hooks.useProvider();
  const signer = useWeb3Signer(provider);
  let tndPrice: null | number = useTndPrice();

  useEffect(() => {
    setTimeout(() => {
      setLoadingTndBtn(false);
    }, 1000);
  }, []);
  const handleClickBurger = useCallback((value: boolean) => {
    setActivePopupMenu(value);
    if (value) {
      document.querySelector("body")?.classList.add("body__fixed");
    } else {
      document.querySelector("body")?.classList.remove("body__fixed");
    }
  }, []);

  const handleChainChanged = useCallback((ethereum: any) => {
    ethereum.on("chainChanged", () => {
      window.location.reload();
    });
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      handleChainChanged(window.ethereum);
    }

    const closeDropdown = (e: any) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(e.target)
      ) {
        handleClickBurger(false);
      }
    };
    window.addEventListener("click", closeDropdown);
  }, [handleClickBurger, handleChainChanged]);

  function RefreshData() {
    if (signer) getAllData(signer).then(setTNDData);
  }

  const onClaimRewards = async () => {
    if (!signer || TNDData?.getUnclaimedRewards(signer).eq(0)) return;
    var id = toast.loading("Submitting transaction");
    try {
      var tx = await TND.claimRewards(signer);
      toast.success(`Successfully Claimed: ${displayTND(tx)} esTND`);
    } catch (e) {
      displayErrorMessage(networkData, e, "Claim unsuccessful");
    } finally {
      toast.dismiss(id);
    }
    RefreshData();
  };

  return (
    <header className="relative">
      <ClaimRewardsModal
        title="Protocol Rewards (esTND)"
        onClickClaim={onClaimRewards}
        handlerClose={() =>
          setDataClaimModal({ ...dataClaimModal, open: false })
        }
        data={{
          open: dataClaimModal.open,
          rewards: [
            {
              exchange: `1 esTND = ${tndPrice ?? "?"}`,
              unclaimed: TNDData
                ? `${displayTND(TNDData.getUnclaimedRewards(signer))} esTND`
                : "?",
              unclaimedUsd: `$${
                TNDData
                  ? displayTNDInUSD(
                      TNDData.getUnclaimedRewards(signer),
                      tndPrice ?? 0
                    )
                  : "?"
              }`,
            },
          ],
        }}
      />
      <div className="header__block bg-black z-20 relative h-[71px] lg:h-[110px] flex items-center justify-between">
        <div className="flex w-full c items-center justify-between max-w-[1400px]">
          <div className="w-[104px] block lg:w-[196px] z-20 relative">
            <a href="https://tender.fi">
              <img src="/images/logo1.svg" alt="Tender Finance" />
            </a>
          </div>
          <div className="text-[#ADB5B3] hidden lg:flex justify-center font-normal text-base font-nova gap-x-[30px] z-20 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            {menuLinks.map(
              (item: { name: string; link: string; target: string }) => (
                <a
                  key={item.name}
                  className={`cursor-pointer hover:text-white ${
                    location.pathname === item.link ? "text-white" : ""
                  }`}
                  href={item.link}
                  target={item.target}
                  rel="noreferrer"
                >
                  {item.name}
                </a>
              )
            )}
          </div>
          <div className="flex items-center z-20 relative">
            {tndPrice ? (
              <div className="show animate w-[34px] h-[34px] xl:w-[90px] xl:h-[44px] mr-[6px] xl:mr-[12px]"></div>
            ) : (
              <div className="relative z-10 w-[34px] xl:w-[auto] mr-[6px] xl:mr-[12px] h-[34px] xl:h-[44px]">
                <button
                  aria-label="Claim Rewards"
                  tabIndex={0}
                  className={`relative flex p-[9px] xl:mr-[0px] bg-[#181D1B] hover:bg-[#262C2A] cursor-pointer rounded-[6px] flex items-center h-[34px] xl:h-[44px]`}
                  onClick={() =>
                    setDataClaimModal({ ...dataClaimModal, open: true })
                  }
                >
                  <img
                    className="w-[16px] h-[16px] mr-[0px] xl:mr-[9px]"
                    src="/images/wallet-icons/balance-icon.svg"
                    alt="..."
                  />
                  <div className="whitespace-nowrap text-ellipsis overflow-hidden block text-sm font-semibold text-right leading-[14px] font-nova hidden xl:flex">
                    {TNDData
                      ? `${displayTND(
                          TNDData.getUnclaimedRewards(signer)
                        )} esTND`
                      : "?"}
                  </div>
                </button>
              </div>
            )}
            <NetworksDropdown />
            <ConnectWallet />
            <button
              aria-label="menu"
              className={`flex lg:hidden header__burg ${
                activePopupMenu ? "active" : ""
              }`}
              onClick={() => handleClickBurger(!activePopupMenu)}
              ref={burgerRef}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
          <div
            className={`aside__menu__wrap top-[71px] flex lg:hidden ${
              activePopupMenu ? `act` : ""
            }`}
            ref={menuRef}
          >
            <div className="aside__menu__container w-full h-full bg-black py-[60px] px-[30px]">
              <div className="relative flex justify-center items-center flex-col text-[#ADB5B3] font-nova-400 text-xl gap-y-[30px]">
                {menuLinks.map(
                  (item: { name: string; link: string; target: string }) => (
                    <a
                      key={item.name}
                      className="font-nova text-white text-lg gap-y-[20px]"
                      href={item.link}
                      target={item.target}
                      rel="noreferrer"
                    >
                      {item.name}
                    </a>
                  )
                )}
              </div>
              <div className="mt-[40px] flex justify-center">
                <ConnectWallet inMenu={true} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
