import { ethers } from 'ethers';

declare const window: any;

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner(0);

export { provider, signer }; 