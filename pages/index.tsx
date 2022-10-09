import type { NextPage } from "next";
import { ConnectButton, useWaitForTransaction } from "@web3modal/react";
import { useAccount } from "@web3modal/react";
import { useWriteTx } from "../src/store";
import { useForm } from "react-hook-form";
import { Loading } from "../src/loading";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Home: NextPage = () => {
  const { isConnected } = useAccount();
  const { write, data: swapData, isLoading } = useWriteTx();
  const { register, getValues, formState, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      token1: 0,
      token2: 0,
    },
  });
  const {
    receipt: transactionData,
    error,
    isWaiting: isLoadingTransaction,
  } = useWaitForTransaction({
    hash: swapData?.hash,
  });
  const { isValid } = formState;
  useEffect;
  useEffect(() => {
    if (transactionData && !isLoadingTransaction) {
      const { token1, token2 } = getValues();
      Swal.fire(
        "Success",
        `You have exchanged ${token1}RCOP for ${token2}RARG`
      );
    }
  }, [transactionData, swapData]);
  const onSwapClick = () => {
    write();
  };
  return (
    <section className="h-screen w-screen">
      <div className="flex justify-center w-full items-center h-full">
        <div
          className="flex flex-col mx-auto rounded-2xl relative overflow-hidden 
        shadow-lg max-w-lg w-full bg-slate-700"
        >
          <span className="p-4 text-slate-300 font-bold">Swap</span>
          <div className="flex justify-between p-4">
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
              {...register("token1", {
                required: true,
                onChange: (e) => {
                  setValue("token2", e.target.value / 30.9);
                },
              })}
            />
            <ButtonTokens token="RCOP" />
          </div>
          <div className="flex flex-col bg-slate-800 p-4">
            <div className="flex justify-between  ">
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
                disabled={true}
                minLength={1}
                maxLength={79}
                className="text-left text-base md:text-sm placeholder:font-normal font-medium p-0 bg-transparent border-none focus:outline-none focus:ring-0 w-full truncate font-medium !text-3xl py-1 text-slate-200 hover:text-slate-100"
                {...register("token2", {})}
              />
              <ButtonTokens token="RARG" />
            </div>
            <div className="w-full flex justify-center mt-10">
              {isConnected ? (
                <Swap
                  disabled={!isValid}
                  onClick={onSwapClick}
                  isLoading={isLoading || isLoadingTransaction}
                />
              ) : (
                <ConnectButton />
              )}
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
        <span className="">{token}</span>
      </div>
    </button>
  );
};

const Swap = ({ onClick = () => {}, disabled = false, isLoading = false }) => {
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
      disabled={disabled}
    >
      {!isLoading ? "Swap" : <Loading />}
    </button>
  );
};
