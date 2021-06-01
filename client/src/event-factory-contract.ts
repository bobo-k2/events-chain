import { ethers } from 'ethers';
import contractJson from './contracts/EventFactory.json';
import { provider } from './web3';

const contractAddress = '0x443F7474158cA832A8baCB8508293920DC2101f8';

const eventFactoryContract = new ethers.Contract(
  contractAddress,
  contractJson.abi,
  provider
);

export default eventFactoryContract;