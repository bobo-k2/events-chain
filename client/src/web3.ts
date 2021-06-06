import { ethers } from 'ethers';

declare const window: any;
let provider: any; 
if (typeof window.ethers !== 'undefined') {
  provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  provider = new ethers.providers.InfuraProvider(
    'ropsten', {
      projectId: '54266b9086e742ddbeaf47e9f6cadd1b',
      projectSecret: '485cfcd10228443a8f110526785745dd'
    }
  );
}

const signer = provider.getSigner(0);

export { provider, signer };