import { useWeb3React } from "@web3-react/core";
import { connectors } from "../connectors";
import { AiOutlineClose } from "react-icons/ai";
export const SelectWalletModal = ({
  isOpen = false,
  closeModal = () => {},
}) => {
  const { activate } = useWeb3React();
  if (!isOpen) return null;
  return (
    <div
      className="fixed w-screen h-screen 
     top-0 left-0 
     flex justify-center items-center "
    >
      <div className="opacity-70  fixed top-0 left-0 w-screen h-screen bg-neutral-900"></div>
      <div className="bg-white z-10 p-4 rounded-xl flex flex-col gap-4 w-80">
        <div className="flex justify-between items-center">
          <h2 className="text-slate-600 font-bold ">Select Wallet</h2>
          <AiOutlineClose className="cursor-pointer" onClick={closeModal} />
        </div>
        <WalletButton
          name="Wallet Connect"
          onClick={() => {
            activate(connectors.coinbaseWallet);
            closeModal();
          }}
          icon="/cbw.png"
        />
        <WalletButton
          name="Wallet Connect"
          onClick={() => {
            activate(connectors.walletConnect);
            closeModal();
          }}
          icon="/wc.png"
        />
        <WalletButton
          name="Metamask"
          onClick={() => {
            activate(connectors.injected);
            closeModal();
          }}
          icon="/mm.png"
        />
      </div>
    </div>
  );
};

function WalletButton({ name = "", onClick = () => {}, icon = "" }) {
  return (
    <button
      onClick={onClick}
      className="flex gap-2 items-center border rounded-lg p-3 text-center"
    >
      <img src={icon} alt="" className="w-4 h-4" />
      {name}
    </button>
  );
}
