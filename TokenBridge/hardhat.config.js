require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
};

require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');

const INFURA_PROJECT_ID = 'Wonde_TokenBridge';
const PRIVATE_KEY = 'YOUR_PRIVATE_KEY';

module.exports = {
  solidity: {
    version: '0.8.0',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${f1a29dc7a13844d2a2648004b4394fdf}`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    sophelia: {
      url: `https://sophelia.infura.io/v3/${f1a29dc7a13844d2a2648004b4394fdf}`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
