require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  solidity: "0.8.28",
  /** @type import('hardhat/config').HardhatUserConfig */
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/0458a02975ce40f9a7fcbef386f09292",
      accounts: ["272372e4aaad43ba4fb73fb99a069086d0492d6c10fe7b8c7e4f1d581ff975d6"],
    },
  },


};
