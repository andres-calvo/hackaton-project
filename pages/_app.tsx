import "../styles/globals.css";
import type { AppProps } from "next/app";
import type { ConfigOptions } from "@web3modal/react";
import { Web3Modal } from "@web3modal/react";
import {chains, providers } from "@web3modal/ethereum";

// const { chains, provider } = configureChains(
//   [chain.goerli, chain.polygonMumbai],
//   [publicProvider()]
// );
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
// const wagmiClient = createClient({
//   autoConnect: true,
//   provider,
// });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Web3Modal config={config} />
    </>
  );
}

export default MyApp;

// const getLibrary = (provider: any) => {
//   console.log(provider);
//   const library = new ethers.providers.Web3Provider(provider);
//   library.pollingInterval = 8000;
//   return library;
// };
