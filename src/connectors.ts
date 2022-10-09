import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});

const walletconnect = new WalletConnectConnector({
  rpc: `https://goerli.infura.io/v3/${process.env.INFURA_KEY}`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true
});

/**
 * Actually this is Coinbase Wallet
 */
const walletlink = new WalletLinkConnector({
  url: `https://goerli.infura.io/v3/${process.env.INFURA_KEY}`,
  appName: "hackaton-project"
});

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: walletlink
};