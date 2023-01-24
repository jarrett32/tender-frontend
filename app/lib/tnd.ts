import type { IncentiveTracker, IncentiveToken } from "~/types/global";
import { type Signer, type Contract, ethers}  from "ethers";
import { Tendies } from "~/config/networks/arbitrum"
import rewardRouterAbi from "~/config/sample-reward-router-abi"
import rewardTrackerAbi from "~/config/sample-reward-tracker-abi"
import rewardTokenAbi from "~/config/sample-reward-token-abi"

import type {
  TransactionReceipt,
} from "@ethersproject/providers";

interface Txn {
  wait: (n?: number) => TransactionReceipt;
  hash: string;
}

const UINT_MAX = ethers.constants.MaxUint256
const trackers = Tendies.Trackers
const tokens   = Tendies.Tokens

const getToken = (token: IncentiveToken) => { return tokens[token] }
const getTracker = (tracker: IncentiveTracker) => { return trackers[tracker] }
const getTokenTracker = (token: IncentiveToken) => { return getTracker(getToken(token).tracker) }

const getContract = (contractName: IncentiveToken | IncentiveTracker , signer: Signer): Contract  => {
  const isToken = contractName in Object.keys(tokens)
  const abi = isToken ? rewardTokenAbi : rewardTrackerAbi;
  //@ts-ignore
  const address = isToken ? getToken(contractName).address : getTracker(contractName).address;
  return new ethers.Contract(address, abi, signer);
}

export const getClaimable = async (token: IncentiveToken, signer: Signer): Promise<number> => {
  const trackerContract = getContract(getToken(token).tracker, signer)
  return await trackerContract.claimable(await signer.getAddress());
}

export const getBalance = async (token: IncentiveToken, signer: Signer): Promise<number> => {
  const trackerContract = getContract(getToken(token).tracker, signer)
  return await trackerContract.claimable(await signer.getAddress());
}

export const getStaked = async (token: IncentiveToken, signer: Signer): Promise<number> => {
  const tokenContract = getContract(token, signer);
  return await tokenContract.stakedAmount(await signer.getAddress());
}

export const enable = async (token: IncentiveToken, signer: Signer): Promise<Txn> => {
  const tokenContract = getContract(token, signer);
  const trackerAddress = getTokenTracker(token).address
  return await tokenContract.approve(trackerAddress, UINT_MAX)
}

const callRewardRouterFn = async (fnName: string, signer: Signer, ...args: any[]): Promise<Txn>  => {
  const routerContract = new ethers.Contract(Tendies.RewardRouter, rewardRouterAbi, signer);
  return await routerContract[fnName](...args)
}

export const stakeTnd = async (amount: Number, signer: Signer): Promise<Txn> => {
  return await callRewardRouterFn('stakeTnd', signer, [amount])
}
export const stakeEsTnd = async (amount: Number, signer: Signer): Promise<Txn> => {
  return await callRewardRouterFn('stakeEsTnd', signer, [amount])
}
export const unstakeTnd = async (amount: Number, signer: Signer): Promise<Txn> => {
  return await callRewardRouterFn('unstakeTnd', signer, [amount])
}
export const unstakeEsTnd = async (amount: Number, signer: Signer): Promise<Txn> => {
  return await callRewardRouterFn('unstakeEsTnd', signer, [amount])
}
export const compound = async (signer: Signer): Promise<Txn> => {
  return await callRewardRouterFn('compound', signer)
}
export const claim = async (amount: Number, signer: Signer): Promise<Txn> => {
  return await callRewardRouterFn('claimTnd', signer, [amount])
}
export const claimEsTnd = async (amount: Number, signer: Signer): Promise<Txn> => {
  return await callRewardRouterFn('claimEsTnd', signer, [amount])
}
export const claimFees = async (amount: Number, signer: Signer): Promise<Txn> => {
  return await callRewardRouterFn('claimFees', signer, [amount])
}

export const getStakingData = async (signer: Signer) => {
  const [ tndStaked, esTndStaked, bnTndStaked ] = await Promise.all([
    getStaked('TND', signer),
    getStaked('esTND', signer),
    getStaked('bnTND', signer),
  ]);
  return { tndStaked, esTndStaked, bnTndStaked }
}

export const getClaimableData = async (signer: Signer) => {
  const [ tndClaimable, esTndClaimable, bnTndClaimable ] = await Promise.all([
    getClaimable('TND', signer),
    getClaimable('esTND', signer),
    getClaimable('bnTND', signer),
  ]);
  return { tndClaimable, esTndClaimable, bnTndClaimable }
}

export const getBalanceData = async (signer: Signer) => {
  const [ tndBalance, esTndBalance, bnTndBalance ] = await Promise.all([
    getBalance('TND', signer),
    getBalance('esTND', signer),
    getBalance('bnTND', signer),
  ]);
  return { tndBalance, esTndBalance, bnTndBalance }
}
