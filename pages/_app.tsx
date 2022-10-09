import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ethers } from "ethers";
import { Web3ReactProvider } from "@web3-react/core";
import type { ConfigOptions } from "@web3modal/react";
import { Web3Modal } from "@web3modal/react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import {  providers } from '@web3modal/ethereum'

const { chains, provider } = configureChains(
  [chain.goerli, chain.polygonMumbai],
  [publicProvider()]
);
const config: ConfigOptions = {
  projectId: process.env.WALLETCONNECTID as string,
  theme: "dark",
  accentColor: "default",
  ethereum: {
    appName: "ETH-Hackaton",
    chains: [chain.goerli, chain.polygonMumbai],
    providers: [providers.walletConnectProvider({ projectId: process.env.WALLETCONNECTID as string })]
  },
};
const wagmiClient = createClient({
  autoConnect: true,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
        <Web3Modal config={config} />
      </Web3ReactProvider>
    </WagmiConfig>
  );
}

export default MyApp;

const getLibrary = (provider: any) => {
  console.log(provider);
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
};
