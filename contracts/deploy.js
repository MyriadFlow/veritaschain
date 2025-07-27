/* eslint-disable no-console */
import { Args, Mas, Account, Web3Provider } from "@massalabs/massa-web3";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getScByteCode(fileName) {
  return readFileSync(path.join(__dirname, "build", fileName));
}

async function getAccountProvider() {
  const account = await Account.fromEnv("MASSA_PRIVATE_KEY");
  let provider;
  if (process.env.MASSA_NODE_URL) {
    const rpcUrl = process.env.MASSA_NODE_URL;
    provider = Web3Provider.fromRPCUrl(rpcUrl, account);
  } else {
    provider = Web3Provider.buildnet(account);
  }
  return provider;
}

async function deployContract(contractName) {
  const provider = await getAccountProvider();

  console.log(`🚀 Deploying ${contractName}...`);
  console.log("Provider address:", provider.address);

  const balance = await provider.balance();
  console.log("Provider balance:", balance.toString());

  // Get the bytecode
  const byteCode = getScByteCode(`${contractName}.wasm`);

  // No constructor arguments needed for our contracts
  const constructorArgs = new Args();

  const contract = await provider.deploySC({
    coins: Mas.fromString("0.1"),
    byteCode,
    parameter: constructorArgs.serialize(),
  });

  console.log(`✅ ${contractName} deployed at:`, contract.address);

  return {
    name: contractName,
    address: contract.address,
  };
}

async function deployAllContracts() {
  console.log("� VeritasChain Contract Deployment");
  console.log("===================================");

  const contracts = ["ArticleRegistry", "ReputationSystem", "PaymentGateway"];
  const deploymentResults = [];

  for (const contractName of contracts) {
    try {
      const result = await deployContract(contractName);
      deploymentResults.push(result);
    } catch (error) {
      console.error(`❌ Failed to deploy ${contractName}:`, error.message);
      process.exit(1);
    }
  }

  // Save deployment info
  const deploymentInfo = {
    timestamp: new Date().toISOString(),
    network: process.env.MASSA_NODE_URL || "buildnet",
    contracts: deploymentResults,
  };

  const deploymentFile = path.join(__dirname, "deployment.json");
  const fs = await import("fs");
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));

  console.log("\n🎉 All contracts deployed successfully!");
  console.log("📄 Deployment info saved to deployment.json");
  console.log("\n📋 Contract Addresses:");
  deploymentResults.forEach((contract) => {
    console.log(`  ${contract.name}: ${contract.address}`);
  });

  console.log("\n� UPDATE your frontend with these addresses!");

  return deploymentResults;
}

deployAllContracts().catch(console.error);
