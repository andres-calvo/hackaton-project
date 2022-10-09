import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { ConfigOptions } from "@web3modal/react";
import { Web3Modal } from "@web3modal/react";
import { chains, providers } from "@web3modal/ethereum";

const config: ConfigOptions = {
  projectId: process.env.WALLETCONNECTID as string,
  theme: "dark",
  accentColor: "default",
  ethereum: {
    appName: "ETH-Hackaton",
    chains: [chains.goerli, chains.polygonMumbai],
    providers: [
      providers.walletConnectProvider({
        projectId: process.env.WALLETCONNECTID as string,
      }),
    ],
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Web3Modal config={config} />
    </>
  );
}

export default MyApp;
