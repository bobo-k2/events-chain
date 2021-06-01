import { ethers } from 'ethers';
import contractJson from './contracts/EventFactory.json';
import { provider } from './web3';

const contractAddress = '0x6505aD0575093B1E8d154dD35a21A9396255084f';

const eventFactoryContract = new ethers.Contract(
  contractAddress,
  contractJson.abi,
  provider
);

export default eventFactoryContract;