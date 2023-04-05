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

1.	Obtain two Infura project IDs, one for the Goerli network and one for the Sepolia network.
2.	Update the hardhat.config.js file with the Infura project IDs, network URLs, and account private keys to be used for deployment.
3.	Run npm install to install the required packages and dependencies.
4.	Run npx hardhat compile to compile the smart contracts.
5.	Run npx hardhat test to run the tests and ensure everything is working as expected.
6.	Run npx hardhat run --network goerli scripts/deploy.js to deploy the contracts to the Goerli network.
7.	Run npx hardhat run --network Sepolia scripts/deploy.js to deploy the contracts to the Sepolia network.
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

#Regarding the addresses needed to deploy the token bridge 

Here are the six addresses used in the deployment process:
1.	Address that deploys the TokenBridge contract
2.	Address that deploys the Token contract
3.	Address that deploys the BridgeValidators contract
4.	Address that deploys the TokenRegistry contract
5.	Address that is used as the bridge address
6.	Address that is used as the local validator address

To deploy on Goerli or any other network, you will need to modify the following addresses:
1.	Address that deploys the TokenBridge contract
2.	Address that deploys the Token contract
3.	Address that deploys the BridgeValidators contract
4.	Address that deploys the TokenRegistry contract

You will need to use the respective addresses for the Goerli network when deploying to Goerli and for the Sepolia network when deploying to Sepolia. The remaining two addresses (bridge address and local validator address) will remain the same regardless of the network you are deploying to.

The addresses that can be replaced by the corresponding Metamask addresses of the two networks are:
- Item	The address that is used as the bridge address: This address will be used as the owner of the TokenBridge contract on both networks.
- Item	The address that is used as the local validator address: This address will be used as the validator for the TokenBridge contract on both networks.
- Item	The address that is used to deploy the TokenBridge contract: This address will be used to deploy the TokenBridge contract on both networks.
You can replace these addresses in the .env file with the corresponding Metamask addresses of the two networks.


















```

