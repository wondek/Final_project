const TokenBridge = artifacts.require("TokenBridge");
const TokenRegistry = artifacts.require("TokenRegistry");
const BridgeValidators = artifacts.require("BridgeValidators");

module.exports = async function (deployer, network, accounts) {
  // Check if we are on a supported network
  const isSupportedNetwork = ["goerli", "sophia"].includes(network);
  if (!isSupportedNetwork) {
    throw new Error(`Network ${network} is not supported`);
  }

  // Deploy TokenRegistry contract
  await deployer.deploy(TokenRegistry);
  const tokenRegistry = await TokenRegistry.deployed();

  // Deploy BridgeValidators contract
  await deployer.deploy(BridgeValidators);
  const bridgeValidators = await BridgeValidators.deployed();

  // Set the validator of the bridge
  await bridgeValidators.addValidator(accounts[0]);

  // Deploy TokenBridge contract
  const chainId = network === "goerli" ? 5 : 6; // Goerli has chain id 5, Sophia has chain id 6
  //const foreignTokenAddress = ""; // Set the foreign token address for the other network
  //const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY;
  const foreignTokenAddress = "";
  const homeTokenAddress = MyToken.address; // Get the address of the deployed token contract
  await deployer.deploy(TokenBridge, homeTokenAddress, foreignTokenAddress, chainId, tokenRegistry.address, bridgeValidators.address);
};
