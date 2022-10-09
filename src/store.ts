import create from "zustand";
import { useAccount, useNetwork } from "@web3modal/react";
import { useWeb3React } from "@web3-react/core";
const WalletInfoStore = create(() => ({
  address: "",
  network: "",
}));

export function useSyncWallets() {
  const { address: wcAddress, isConnected: isConnectedwc } = useAccount();
  const { chain, chains } = useNetwork();
  const { active, chainId, account } = useWeb3React();
}
