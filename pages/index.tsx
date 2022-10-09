import type { NextPage } from "next";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ConnectButton } from "@web3modal/react";
import { useAccount, useNetwork } from "@web3modal/react";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  const { chain, chains } = useNetwork();
  console.log(`
  
  Address ${address}
  isConnected ${isConnected}
  chain ${chain?.network}

  `);
  return (
    <section className="h-screen w-screen">
      <div className="flex justify-center w-full items-center h-full">
        <div
          className="flex flex-col mx-auto rounded-2xl relative overflow-hidden 
        shadow-lg max-w-lg w-full bg-slate-700"
        >
          <span className="p-4 text-slate-300 font-bold">Swap</span>
          <div className="flex justify-between p-4">
            <InputAmount />
            <ButtonTokens token="RCOP" />
          </div>
          <div className="flex flex-col bg-slate-800 p-4">
            <div className="flex justify-between  ">
              <InputAmount />
              <ButtonTokens token="RARG" />
            </div>
            <div className="w-full flex justify-center mt-10">
              {isConnected ? <Swap /> : <ConnectButton />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

const ButtonTokens = ({ token = "" }) => {
  return (
    <button className="bg-slate-600 shadow-2xl rounded-xl px-2 py-1 ">
      <div className="flex items-center text-white">
        <span className="mr-2">{token}</span>
        <div className="text-3xl">
          <RiArrowDropDownLine className="text-white" />
        </div>
      </div>
    </button>
  );
};

const Swap = ({ onClick = () => {} }) => {
  return (
    <button
      className="
          btn w-full flex hover:ring-2 focus:ring-2 items-center 
          justify-center gap-2 cursor-pointer 
          bg-blue-700
          text-slate-50 bg-blue  px-4 h-[52px] rounded-2xl 
          text-base font-semibold
          mt-4
          "
      onClick={onClick}
    >
      Swap
    </button>
  );
};

const InputAmount = () => {
  return (
    <input
      inputMode="decimal"
      title="Token Amount"
      autoComplete="off"
      autoCorrect="off"
      spellCheck="false"
      type="text"
      pattern="^[0-9]*[.,]?[0-9]*$"
      placeholder="0"
      min="0"
      minLength={1}
      maxLength={79}
      className="text-left text-base md:text-sm placeholder:font-normal font-medium p-0 bg-transparent border-none focus:outline-none focus:ring-0 w-full truncate font-medium !text-3xl py-1 text-slate-200 hover:text-slate-100"
    />
  );
};
