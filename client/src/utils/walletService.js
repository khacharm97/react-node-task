import { ethers } from 'ethers';

class WalletService {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.account = null;
  }

  // Check if MetaMask is installed
  isMetaMaskInstalled() {
    return typeof window !== 'undefined' && window.ethereum && window.ethereum.isMetaMask;
  }

  // Check if MetaMask is unlocked (user is logged in)
  async isMetaMaskUnlocked() {
    if (!this.isMetaMaskInstalled()) {
      return false;
    }

    try {
      // Check if MetaMask is unlocked by trying to get accounts
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      return accounts && accounts.length > 0;
    } catch (error) {
      console.error('Error checking MetaMask unlock status:', error);
      return false;
    }
  }

  // Get current MetaMask account if unlocked
  async getCurrentMetaMaskAccount() {
    if (!this.isMetaMaskInstalled()) {
      return null;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      return accounts && accounts.length > 0 ? accounts[0] : null;
    } catch (error) {
      console.error('Error getting current MetaMask account:', error);
      return null;
    }
  }

  // Get MetaMask provider
  async getProvider() {
    if (!this.isMetaMaskInstalled()) {
      throw new Error('MetaMask is not installed. Please install MetaMask to use wallet login.');
    }

    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      return this.provider;
    } catch (error) {
      throw new Error('Failed to connect to MetaMask: ' + error.message);
    }
  }

  // Connect wallet
  async connectWallet() {
    try {
      const provider = await this.getProvider();
      this.signer = provider.getSigner();
      this.account = await this.signer.getAddress();
      
      return {
        success: true,
        account: this.account,
        provider: this.provider
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Get current account
  async getCurrentAccount() {
    if (!this.provider) {
        if(this.isMetaMaskUnlocked){
            return null;
        }
    }
    try {
      const accounts = await this.provider.listAccounts();
      return accounts[0] || null;
    } catch (error) {
      console.error('Error getting current account:', error);
      return null;
    }
  }

  // Create a secure message for authentication
  createAuthMessage(walletAddress) {
    const timestamp = Date.now();
    const nonce = Math.random().toString(36).substring(2, 15);
    
    return `Login to CRM System

Wallet Address: ${walletAddress}
Timestamp: ${timestamp}
Nonce: ${nonce}

Please sign this message to authenticate your wallet.
This signature will be used to verify your identity.

By signing this message, you confirm that you are the owner of this wallet address.`;
  }

  // Sign a message for authentication
  async signMessage(message) {
    if (!this.signer) {
      await this.connectWallet();
    }

    try {
      const signature = await this.signer.signMessage(message);
      return signature;
    } catch (error) {
      throw new Error('Failed to sign message: ' + error.message);
    }
  }

  // Disconnect wallet
  disconnectWallet() {
    this.provider = null;
    this.signer = null;
    this.account = null;
  }

  // Listen for account changes
  onAccountsChanged(callback) {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', callback);
    }
  }

  // Listen for chain changes
  onChainChanged(callback) {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', callback);
    }
  }

  // Remove listeners
  removeListeners() {
    if (window.ethereum) {
      window.ethereum.removeAllListeners('accountsChanged');
      window.ethereum.removeAllListeners('chainChanged');
    }
  }
}

export default new WalletService(); 