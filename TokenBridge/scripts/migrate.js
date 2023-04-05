async function main() {
    // Get the contract to deploy
    const MyContract = await ethers.getContractFactory("MyContract");
    const myContract = await MyContract.deploy();
  
    console.log("MyContract deployed to:", myContract.address);
  }
  
  // Run the function
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  