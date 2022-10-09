import testABI from "./testABI.json";
import { useContractRead, useContractWrite } from "@web3modal/react";
import { useNetwork } from "@web3modal/react";

const GoerliSmartContract = "0xDAA5D0365071bD6b55C66f5A2900b0bb3A8B132F";
const MumbaiSmartContract = "0x873FA9AC25fF215ed14aCD4C88823c2aD9c6663a";

export function useRead() {
  const { chain } = useNetwork();
  const contractAddress =
    chain?.network == "goerli" ? GoerliSmartContract : MumbaiSmartContract;
  return useContractRead({
    addressOrName: contractAddress,
    contractInterface: testABI,
    functionName: "message",
  });
}

export function useWriteTx() {
  const { chain } = useNetwork();
  const contractAddress =
    chain?.network == "goerli" ? GoerliSmartContract : MumbaiSmartContract;
  return useContractWrite({
    addressOrName: contractAddress,
    contractInterface: testABI,
    functionName: "setMessage",
    args: [chain?.network == "goerli" ? "GoerliMessage" : "MumbaiMessage"],
  });
}
