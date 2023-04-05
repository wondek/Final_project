Running the hardhat project before deploying:

1.	Connect to the Ethereum network
2.	Create your app (and API key)
3.	Create an Ethereum account (address)
4.	Add ether from a Faucet
5.	Check your Balance
6.	Initialize our project
```shell
npm init # (or npm init --yes)
```
7.	Download Hardhat
```shell
npm install --save-dev hardhat
```
8.	Create Hardhat project
```shell
npx hardhat
```
9.	Add project folders

```shell
mkdir contracts
mkdir scripts
```
10.	Write our contract
11.	Connect Metamask & Infura to your project
```shell
npm install dotenv --save
```
Your .env should look like this:
API_URL = "https://goerli.infura.io/v3/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"

12.	Install Ethers.js
```shell
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```
13.	Update hardhat.config.js
14.	Compile our contract
```shell
npx hardhat compile
```
15.	Write our deploy script

16.	Deploy our contract
```shell
npx hardhat run scripts/deploy.js --network goerli
```

#Steps: Additional elaboration 

1.	Obtain two Infura project IDs, one for the Goerli network and one for the Sophilia network.
2.	Update the hardhat.config.js file with the Infura project IDs, network URLs, and account private keys to be used for deployment.
3.	Run npm install to install the required packages and dependencies.
4.	Run npx hardhat compile to compile the smart contracts.
5.	Run npx hardhat test to run the tests and ensure everything is working as expected.
6.	Run npx hardhat run --network goerli scripts/deploy.js to deploy the contracts to the Goerli network.
7.	Run npx hardhat run --network sophilia scripts/deploy.js to deploy the contracts to the Sophilia network.
8.	Verify the contracts have been deployed correctly on both networks using a block explorer like Etherscan.
9.	Test the token transfer functionality by minting some tokens on one network, transferring them to the other network using the bridge, and then verifying they were received on the other network.
10.	Test the token transfer functionality in the opposite direction by minting some tokens on the other network, transferring them back using the bridge, and then verifying they were received on the original network.

To add tests to the ERC20 token bridge project, you can create test files in the test/
1.	First, make sure you have the chai and chai-as-promised packages installed as dev dependencies:

```shell
npm install --save-dev chai chai-as-promised
```

2.	Then, create a new test file tokenbridge.test.js in the test/ directory:

This example test file defines a TokenBridge contract and tests its deposit and withdraw functions. The tests use the expect syntax from the chai library to make assertions about the behavior of the contract.
3.	To run the tests, use the following command:

```shell
npx hardhat test
```


















# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

