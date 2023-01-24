import { IncentiveContractsConfig, IncentivesConfig } from "~/types/global";

export default {
  ChainId: 42161,
  name: "Arbitrum",
  blockExplorerName: "Arbitrum",
  blockExplorerUrl: "https://arbiscan.io",
  rpcUrls: ["https://arb1.arbitrum.io/rpc", "https://rpc.ankr.com/arbitrum"],
  userExplorerUrl: "https://arbiscan.io/address/",
  secondsPerBlock: 12, // L1 value
  l2SecondsPerBlock: 0.31, // L2 value
  graphUrl: "https://graph.tender.fi/",
  Contracts: {
    Comptroller: "0xeed247Ba513A8D6f78BE9318399f5eD1a4808F8e", // address of unitroller contract
    PriceOracle: "0x626fEE808A206dF7529B5AB7E5a6E8FC98509cEA",
    Maximillion: "0x1834a5C13EE814ADCCd8D012E0356A3E836208Fc",
  },
  Tokens: {
    ETH: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
      address: "",
      icon: "/images/coin-icons/ethereum.svg",
      cToken: {
        name: "tETH",
        symbol: "tETH",
        decimals: 8,
        address: "0x0706905b2b21574DEFcF00B5fc48068995FCdCdf",
        isVault: false,
      },
    },
    WBTC: {
      name: "WBTC",
      symbol: "WBTC",
      decimals: 8,
      address: "0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f",
      icon: "/images/coin-icons/bitcoin.svg",
      cToken: {
        name: "tWBTC",
        symbol: "tWBTC",
        decimals: 8,
        address: "0x0A2f8B6223EB7DE26c810932CCA488A4936cF391",
        isVault: false,
      },
    },
    USDC: {
      name: "USDC",
      symbol: "USDC",
      decimals: 6,
      address: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
      icon: "/images/coin-icons/usdc.svg",
      cToken: {
        name: "tUSDC",
        symbol: "tUSDC",
        decimals: 8,
        address: "0x068485a0f964B4c3D395059a19A05a8741c48B4E",
        isVault: false,
      },
    },
    USDT: {
      name: "USDT",
      symbol: "USDT",
      decimals: 6,
      address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      icon: "/images/coin-icons/usdt.svg",
      cToken: {
        name: "tUSDT",
        symbol: "tUSDT",
        decimals: 8,
        address: "0x4A5806A3c4fBB32F027240F80B18b26E40BF7E31",
        isVault: false,
      },
    },

    DAI: {
      name: "DAI",
      symbol: "DAI",
      decimals: 18,
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      icon: "/images/coin-icons/dai.svg",
      priceDecimals: 18,
      cToken: {
        name: "tDAI",
        symbol: "tDAI",
        decimals: 8,
        address: "0xB287180147EF1A97cbfb07e2F1788B75df2f6299",
        isVault: false,
      },
    },

    FRAX: {
      name: "FRAX",
      symbol: "FRAX",
      decimals: 18,
      address: "0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F",
      icon: "/images/coin-icons/frax.svg",
      cToken: {
        name: "tFRAX",
        symbol: "tFRAX",
        decimals: 8,
        address: "0x27846A0f11EDC3D59EA227bAeBdFa1330a69B9ab",
        isVault: false,
      },
    },
    UNI: {
      name: "UNI",
      symbol: "UNI",
      decimals: 18,
      address: "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0",
      icon: "/images/coin-icons/uni.svg",
      cToken: {
        name: "tUNI",
        symbol: "tUNI",
        decimals: 8,
        address: "0x8b44D3D286C64C8aAA5d445cFAbF7a6F4e2B3A71",
        isVault: false,
      },
    },
    LINK: {
      name: "LINK",
      symbol: "LINK",
      decimals: 18,
      address: "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",
      icon: "/images/coin-icons/link.svg",
      cToken: {
        name: "tLINK",
        symbol: "tLINK",
        decimals: 8,
        address: "0x87D06b55e122a0d0217d9a4f85E983AC3d7a1C35",
        isVault: false,
      },
    },
    GMX: {
      name: "GMX",
      symbol: "GMX",
      decimals: 18,
      address: "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a",
      rewardTracker: "0xd2D1162512F927a7e282Ef43a362659E4F2a728F",
      vault: "0x489ee077994B6658eAfA855C308275EAd8097C4A",
      nativeToken: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1", //WETH
      icon: "/images/coin-icons/gmx.svg",
      // min transaction amount
      // GMX fails for small amounts
      floor: "500",
      cToken: {
        name: "tGMX",
        symbol: "tGMX",
        decimals: 8,
        address: "0x20a6768F6AABF66B787985EC6CE0EBEa6D7Ad497",
        isVault: true,
      },
    },
    GLP: {
      name: "GLP",
      symbol: "GLP",
      decimals: 18,
      // staked glp is for approve
      sGLPAddress: "0x2F546AD4eDD93B956C8999Be404cdCAFde3E89AE",
      // fsGLP has balanceOf
      address: "0x1aDDD80E6039594eE970E5872D247bf0414C8903",
      glpAddress: "0x4277f8F2c384827B5273592FF7CeBd9f2C1ac258",
      glpManager: "0x321F653eED006AD1C29D174e17d96351BDe22649",
      rewardTracker: "0x4e971a87900b931fF39d1Aad67697F49835400b6",
      vault: "0x489ee077994B6658eAfA855C308275EAd8097C4A",
      nativeToken: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1", //WETH
      icon: "/images/coin-icons/glp.svg",
      cToken: {
        name: "tfsGLP",
        symbol: "tfsGLP",
        decimals: 8,
        address: "0xFF2073D3810754D6da4783235c8647e11e43C943",
        isVault: true,
      },
    },
  },
};
export const Tendies: IncentiveContractsConfig= {
  RewardRouter: "0xca11F41b1384A7Af40be244eFb602F1a5aFeFf61",
  RewardDistributor: "0x705B3d2DF6e8F8E0e7007f52A7BD66086A12E9aE",
  Tokens: {
    TND: {
      name: "TND",
      symbol: "TND",
      decimals: 18,
      address: "0xc47d9753f3b32aa9548a7c3f30b6aec3b2d2798c",
      tracker: 'sTND'
    },
    esTND: {
      name: "Escrowed TND",
      symbol: "esTND",
      decimals: 18,
      address: "0x8a3ab81902e1b3d4a3c73ad3ce250d1a584fe925",
      tracker: 'sTND'
    },
    bnTND: {
      name: "Bonus TND",
      symbol: "bnTND",
      decimals: 18,
      address: "0x8030523e14e246f537474173c03f69c5521d384a",
      tracker: 'sbTND'
    },
  },
  Trackers: {
    sbfTND: {
      name: "Staked + Bonus + Fee TND",
      symbol: "sbfTND",
      decimals: 18,
      address: "0xe94Ebd36482f91B9E97a958F836324442F34C1F4",
    },
    sTND: {
      name: "Staked TND",
      symbol: "sTND",
      decimals: 18,
      address: "0x8a3aB81902E1b3D4A3C73AD3CE250D1A584fE925",
    },
    sbTND: {
      name: "Staked + Bonus TND",
      symbol: "sbTND",
      decimals: 18,
      address: "0x510894845E7f632222bd8a912855Aa82ba3f7eD0",
    },
  }
}
