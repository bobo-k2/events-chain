# EventsChain

EventsChain is dapp dealig with event tickets management. User can create an event or but tickets for some other event. Ticket owner can easily transfer tickets to another user.

## The Poject structure

Root folder - Node js backend application, provides database access and server the client application
Client - React fronted application
Solidity - Smart contracts, tests and deployment script

## How to run

Checkout the repository first.

### Deploy contract

From command prompt navigate to Solidity subfolder and run the following command

```bash
npm install
```

In scripts sub folder create secrets.js file with the following content

```java script
const ALCHEMY_API_KEY = "";
const ROPSTEN_PRIVATE_KEY = "";

module.exports = {
  ALCHEMY_API_KEY,
  ROPSTEN_PRIVATE_KEY
};
```

or use scripts/_secrets.js as template.

Make sure you entered values for ALCHEMY_API_KEY and ROPSTEN_PRIVATE_KEY constants with your own Alchemy API key and Ropsten private key.

From command prompt run the following commands:

```bash
npm run compile
npm run deploy 
```

You should got output like

```bash
Deploying contracts with the account: 0xF77...
Account balance: 7...
Token address: 0x038...
```

Copy Token address and paste it to value of contractAddress variable in client\src\event-factory-contract.ts 

```java script 
const contractAddress = '0x038...';
```

### Deploy backend and fronted applications 

From command prompt navigate to the project root folder and run the following commands

```bash
npm install
npm run build
npm start
```

Open your favourite web browser and navigate to http://localhost:3000

Enjoy the application.







