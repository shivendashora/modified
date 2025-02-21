// filepath: /c:/Users/PRANAMY/Documents/VSC/block/scripts/deploy.js
const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const CampaignFactory = await ethers.getContractFactory("CampaignFactory");
  const campaignFactory = await CampaignFactory.deploy();

  await campaignFactory.deployed();

  console.log("CampaignFactory deployed to:", campaignFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });