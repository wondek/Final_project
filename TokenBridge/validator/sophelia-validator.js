const { ethers } = require("hardhat");
const abi = require("./build/contracts/TokenBridge.json").abi;

async function main() {
  const network = "sophelia";
  const providerUrl = "https://goerli.infura.io/v3/${f1a29dc7a13844d2a2648004b4394fdf}";
  const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  const bridgeAddress = "<SOPHELIA_BRIDGE_ADDRESS>";
  const bridge = new ethers.Contract(bridgeAddress, abi, provider);

  const validatorAddress = "<LOCAL_VALIDATOR_ADDRESS>";
  const tx = await bridge.addValidator(validatorAddress);
  console.log(`Validator ${validatorAddress} added to ${network} bridge: ${tx.hash}`);
}

main();
