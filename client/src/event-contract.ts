import { ethers } from 'ethers';
import contractJson from './contracts/Event.json';
import { provider } from './web3';

const eventContract = (address: string) => new ethers.Contract(
  address,
  contractJson.abi,
  provider
);

export default eventContract;