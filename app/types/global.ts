export interface cToken {
  name: string;
  address: string;
  decimals: number;
  symbol: string;
  isVault: boolean;
}

export interface Token extends TokenConfig {
  priceInUsd: number;
  sGLPAddress?: any;
  glpAddress?: string;
  glpManager?: string;
  rewardTracker?: string;
  vault?: string;
  nativeToken?: string;
  floor?: string; // the min amount to transfer
}

export interface TokenConfig {
  symbol: string;
  icon: string;
  name: string;
  decimals: number;
  address: string;
  cToken: cToken;
}

export interface NetworkData {
  ChainId: number;
  name: string;
  blockExplorerName: string;
  blockExplorerUrl: string;
  userExplorerUrl?: string;
  rpcUrls?: string[];
  secondsPerBlock: number;
  l2SecondsPerBlock: number;
  graphUrl: string;
  Contracts: {
    Comptroller: string;
    PriceOracle: string;
    Maximillion: string;
  };
  Tokens: {
    [key: string]: TokenConfig;
  };
}

export enum NetworkName {
  rinkeby = "rinkeby",
  metisStartdust = "metisStartdust",
  metisMainnet = "metisMainnet",
  arbitrum = "arbitrum",
  avalanche = "avalanche",
}

export type Networks = {
  [key in NetworkName]: NetworkData;
};

export interface TokenPair {
  token: Token;
  cToken: cToken;
}

export type TenderContext = {
  tokenPairs: TokenPair[];
  networkData: NetworkData;
  markets: Market[];
  currentTransaction: string | null;
  updateTransaction: Function;
  isWaitingToBeMined: boolean;
  setIsWaitingToBeMined: Function;
  blockNumber: number | boolean;
};

export type Market = {
  id: string;
  tokenPair: TokenPair;
  marketData: {
    depositApy: string;
    borrowApy: string;
    totalBorrowed?: number;
    marketSize?: number;
    totalBorrowedUsd?: string;
    marketSizeUsd?: string;
  };
  walletBalance: string;
  supplyBalance: number;
  supplyBalanceInUsd: number;
  borrowBalance: number;
  borrowBalanceInUsd: number;
  borrowLimit: number;
  borrowLimitUsedOfToken: string;
  borrowLimitUsed: string;
  totalBorrowedAmountInUsd: number;
  comptrollerAddress: string;
  maxBorrowLiquidity: number;
  hasSufficientAllowance: boolean;
  autocompound: boolean;
  performanceFee: number;
  withdrawFee: number;
  isBorrowable: boolean;
  liquidationThreshold: number;
  liquidationPenalty: number;
  borrowCaps: string,
  supplyCaps: string,
  collateralFactor: number
};

export type IncentiveTracker = "sTND" | "sbTND" | "sbfTND";
export type IncentiveToken = "TND" | "esTND" | "bnTND";

export type IncentiveConfig = {
  name: string;
  address: string;
  decimals: number;
  symbol: string;
}

export type IncentiveTokenConfig = IncentiveConfig & {
  tracker: IncentiveTracker
}

export type IncentiveContractsConfig = {
  RewardRouter: string,
  RewardDistributor: string,
  Tokens: {
    [key in IncentiveToken]: IncentiveTokenConfig;
  }
  Trackers: {
    [key in IncentiveTracker]: IncentiveConfig;
  }
}
