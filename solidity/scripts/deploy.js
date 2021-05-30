async function main() {

  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );
  
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("EventFactory");
  const token = await Token.deploy();

  console.log("Token address:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

// 30.5.2021 deployed EventFactory contract 
// Deploying contracts with the account: 0xF7769Cc9cf11F2f36bb91Adf9b86B7FB6a95Bca4
// Account balance: 1000000000000000000
// Token address: 0x9611e67E32DDFBB082f9d04c0ac866c7ba69E270