import { ethers } from 'ethers';
import contractJson from './contracts/EventFactory.json';
import { provider } from './web3';

const contractAddress = '0x9611e67E32DDFBB082f9d04c0ac866c7ba69E270';

const eventFactoryContract = new ethers.Contract(
  contractAddress,
  contractJson.abi,
  provider
);

export default eventFactoryContract;