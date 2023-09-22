import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import { ethers } from "ethers";
const hre = require("hardhat");
const TelecomSharingJSON = require("./../artifacts/contracts/TelecomInfrastructureSharing.sol/TelecomSharing.json");

const contractAddress: string = process.env.CONTRACT_ADDRESS || "";
const contractABI: any[] = TelecomSharingJSON.abi;

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_NODE_URL || "");
  const signer = await hre.ethers.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  try {
    // Call functions here

  const createproduct = await contract.shareInfrastructure();
  await createproduct.wait();
  console.log("product created");
  console.log("The transaction hash is:", createproduct.hash);
  const receipt = await createproduct.wait();
  console.log(
    "The transaction returned the following transaction receipt:\n",
    receipt,
  );


  } catch (error) {
    console.error("Error:", error);
  }
}

main();
