#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Contract build script for VeritasChain
const contracts = ["ArticleRegistry", "ReputationSystem", "PaymentGateway"];

function buildContract(contractName) {
  console.log(`Building ${contractName}...`);

  const contractPath = `assembly/contracts/${contractName}.ts`;
  const outputPath = `build/${contractName}.wasm`;

  if (!fs.existsSync(contractPath)) {
    console.error(`Contract file not found: ${contractPath}`);
    return false;
  }

  try {
    // Use asc (AssemblyScript compiler) to build
    execSync(
      `npx asc ${contractPath} --target release --outFile ${outputPath}`,
      {
        stdio: "inherit",
        cwd: process.cwd(),
      }
    );

    console.log(`✅ ${contractName} built successfully`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to build ${contractName}:`, error.message);
    return false;
  }
}

function main() {
  // Create build directory if it doesn't exist
  if (!fs.existsSync("build")) {
    fs.mkdirSync("build");
  }

  console.log("🚀 Building VeritasChain contracts...\n");

  let successCount = 0;

  for (const contract of contracts) {
    if (buildContract(contract)) {
      successCount++;
    }
    console.log(""); // Empty line for readability
  }

  console.log(
    `\n🎉 Build complete: ${successCount}/${contracts.length} contracts built successfully`
  );

  if (successCount === contracts.length) {
    console.log("✅ All contracts built successfully!");
    process.exit(0);
  } else {
    console.log("❌ Some contracts failed to build");
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { buildContract, contracts };
