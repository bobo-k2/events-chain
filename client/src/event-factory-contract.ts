import { ethers } from 'ethers';
import contractJson from './contracts/EventFactory.json';
import { provider } from './web3';

const contractAddress = '0xc5C8530f3a94AC591E590Bdd0F5E8d155eF594c6';

const eventFactoryContract = new ethers.Contract(
  contractAddress,
  contractJson.abi,
  provider
);

export default eventFactoryContract;