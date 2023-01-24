import type { IncentiveTracker, IncentiveToken } from "~/types/global";
import { type Signer, type Contract, type BigNumber, type BigNumberish, ethers }  from "ethers";
import { Tendies } from "~/config/networks/arbitrum"
import rewardRouterAbi from "~/config/sample-reward-router-abi"
import rewardTrackerAbi from "~/config/sample-reward-tracker-abi"
import rewardTokenAbi from "~/config/sample-reward-token-abi"
import type { TransactionReceipt } from "@ethersproject/providers";

interface Txn {
  wait: (n?: number) => TransactionReceipt;
  hash: string;
}

const UINT_MAX = ethers.constants.MaxUint256
const { Trackers, Tokens }= Tendies

const getToken = (token: IncentiveToken) => { return Tokens[token] }
const getTracker = (tracker: IncentiveTracker) => { return Trackers[tracker] }
const getTokenTracker = (token: IncentiveToken) => { return getTracker(getToken(token).tracker) }

const getContract = (contractName: IncentiveToken | IncentiveTracker, signer: Signer): Contract  => {
  const isToken = contractName in Object.keys(Tokens)
  const abi = isToken ? rewardTokenAbi : rewardTrackerAbi;
  // @ts-ignore
  const address = isToken ? getToken(contractName).address : getTracker(contractName).address;
  return new ethers.Contract(address, abi, signer);
}

export const getClaimable = async (token: IncentiveToken, signer: Signer): Promise<BigNumber> => {
  const trackerContract = getContract(getToken(token).tracker, signer)
  return trackerContract.claimable(await signer.getAddress());
}

export const getBalance = async (token: IncentiveToken, signer: Signer): Promise<BigNumber> => {
  const tokenContract = getContract(token, signer)
  return tokenContract.balanceOf(await signer.getAddress());
}

export const getStaked = async (token: IncentiveToken, signer: Signer): Promise<BigNumber> => {
  const tokenContract = getContract(token, signer);
  return tokenContract.depositBalances(await signer.getAddress(), tokenContract.address);
}

export const enable = async (token: IncentiveToken, signer: Signer): Promise<Txn> => {
  const tokenContract = getContract(token, signer);
  const trackerAddress = getTokenTracker(token).address
  return tokenContract.approve(trackerAddress, UINT_MAX)
}

const callRewardRouterFn = async (fnName: string, signer: Signer, ...args: any[]): Promise<Txn>  => {
  const routerContract = new ethers.Contract(Tendies.RewardRouter, rewardRouterAbi, signer);
  return routerContract[fnName](...args)
}

export const stakeTnd = async (amount: BigNumberish, signer: Signer): Promise<Txn> => {
  return callRewardRouterFn('stakeTnd', signer, [amount])
}

export const stakeEsTnd = async (amount: BigNumberish, signer: Signer): Promise<Txn> => {
  return callRewardRouterFn('stakeEsTnd', signer, [amount])
}

export const unstakeTnd = async (amount: BigNumberish, signer: Signer): Promise<Txn> => {
  return callRewardRouterFn('unstakeTnd', signer, [amount])
}

export const unstakeEsTnd = async (amount: BigNumberish, signer: Signer): Promise<Txn> => {
  return callRewardRouterFn('unstakeEsTnd', signer, [amount])
}

export const compound = async (signer: Signer): Promise<Txn> => {
  return callRewardRouterFn('compound', signer)
}

export const claim = async (signer: Signer): Promise<Txn> => {
  return callRewardRouterFn('claimTnd', signer)
}

export const claimEsTnd = async (signer: Signer): Promise<Txn> => {
  return callRewardRouterFn('claimEsTnd', signer)
}

export const claimFees = async (signer: Signer): Promise<Txn> => {
  return callRewardRouterFn('claimFees', signer)
}

export const getStakingData = async (signer: Signer) => {
  const [ tndStaked, esTndStaked, bnTndStaked ] = await Promise.all([
    getStaked('TND', signer),
    getStaked('esTND', signer),
    getStaked('bnTND', signer),
  ]);
  return { tndStaked, esTndStaked, bnTndStaked };
}

export const getClaimableData = async (signer: Signer) => {
  const [ tndClaimable, esTndClaimable, bnTndClaimable ] = await Promise.all([
    getClaimable('TND', signer),
    getClaimable('esTND', signer),
    getClaimable('bnTND', signer),
  ]);
  return { tndClaimable, esTndClaimable, bnTndClaimable };
}

export const getBalanceData = async (signer: Signer) => {
  const [ tndBalance, esTndBalance ] = await Promise.all([
    getBalance('TND', signer),
    getBalance('esTND', signer),
  ]);
  return { tndBalance, esTndBalance };
}

export const getAllData = async (signer: Signer) => {
  const [ stakingData, claimableData, balanceData ] = await Promise.all([
    getStakingData(signer),
    getClaimableData(signer),
    getBalanceData(signer),
  ]);
  return { stakingData, claimableData, balanceData };
}
