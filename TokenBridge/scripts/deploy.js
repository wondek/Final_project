// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const lockedAmount = hre.ethers.utils.parseEther("0.001");

  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();

  console.log(
    `Lock with ${ethers.utils.formatEther(
      lockedAmount
    )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const { ethers } = require("hardhat");

async function main() {
  // Deploying the Token contract
  const Token = await ethers.getContractFactory("Token");
  console.log("Deploying Token contract...");
  const token = await Token.deploy();
  await token.deployed();
  console.log('Token deployed to:', token.address);

  // Deploying the BridgeValidators contract
  const BridgeValidators = await ethers.getContractFactory("BridgeValidators");
  console.log("Deploying BridgeValidators contract...");
  const bridgeValidators = await BridgeValidators.deploy();
  await bridgeValidators.deployed();
  console.log('BridgeValidators deployed to:', bridgeValidators.address);

  // Deploying the TokenRegistry contract
  const TokenRegistry = await ethers.getContractFactory("TokenRegistry");
  console.log("Deploying TokenRegistry contract...");
  const tokenRegistry = await TokenRegistry.deploy(bridgeValidators.address);
  await tokenRegistry.deployed();
  console.log('TokenRegistry deployed to:', tokenRegistry.address);

  // Deploying the TokenBridge contract
  const TokenBridge = await ethers.getContractFactory("TokenBridge");
  console.log("Deploying TokenBridge contract...");
  const tokenBridge = await TokenBridge.deploy(
    bridgeValidators.address,
    tokenRegistry.address,
    process.env.BRIDGE_OWNER_ADDRESS,
    process.env.BRIDGE_VALIDATOR_ADDRESS
  );
  await tokenBridge.deployed();
  console.log('TokenBridge deployed to:', tokenBridge.address);

  // Registering the token on both networks
  const tx = await tokenRegistry.addToken(
    process.env.FOREIGN_NETWORK_ID,
    process.env.FOREIGN_TOKEN_ADDRESS,
    token.address,
    tokenBridge.address
  );
  await tx.wait();
  console.log('Token registered on foreign network');

  const tx2 = await tokenRegistry.addToken(
    process.env.HOME_NETWORK_ID,
    process.env.HOME_TOKEN_ADDRESS,
    token.address,
    tokenBridge.address
  );
  await tx2.wait();
  console.log('Token registered on home network');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
