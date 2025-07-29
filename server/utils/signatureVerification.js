import { ethers } from 'ethers';

/**
 * Test function to verify signature verification is working correctly
 * This can be used for testing or debugging signature issues
 */
export const testSignatureVerification = () => {
    try {
        // Create a test wallet
        const testWallet = ethers.Wallet.createRandom();
        const testAddress = testWallet.address;
        
        // Create a test message
        const testMessage = `Login to CRM System

Wallet Address: ${testAddress}
Timestamp: ${Date.now()}
Nonce: test123

Please sign this message to authenticate your wallet.
This signature will be used to verify your identity.

By signing this message, you confirm that you are the owner of this wallet address.`;
        
        // Sign the message
        const signature = testWallet.signMessage(testMessage);
        
        // Verify the signature
        const recoveredAddress = ethers.utils.verifyMessage(testMessage, signature);
        
        // Check if verification is successful
        const isValid = recoveredAddress.toLowerCase() === testAddress.toLowerCase();
        
        console.log('Signature Verification Test Results:');
        console.log('Original Address:', testAddress);
        console.log('Recovered Address:', recoveredAddress);
        console.log('Verification Result:', isValid);
        console.log('Signature:', signature);
        
        return {
            success: isValid,
            originalAddress: testAddress,
            recoveredAddress: recoveredAddress,
            signature: signature,
            message: testMessage
        };
        
    } catch (error) {
        console.error('Signature verification test failed:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

/**
 * Verify a signature against a wallet address and message
 * @param {string} walletAddress - The claimed wallet address
 * @param {string} signature - The signature to verify
 * @param {string} message - The original message that was signed
 * @returns {object} - Verification result
 */
export const verifySignature = (walletAddress, signature, message) => {
    try {
        // Validate wallet address format
        if (!ethers.utils.isAddress(walletAddress)) {
            return {
                success: false,
                error: 'Invalid wallet address format'
            };
        }
        
        // Recover the address from the signature
        const recoveredAddress = ethers.utils.verifyMessage(message, signature);
        
        // Check if the recovered address matches the claimed wallet address
        const isValid = recoveredAddress.toLowerCase() === walletAddress.toLowerCase();
        
        return {
            success: isValid,
            originalAddress: walletAddress,
            recoveredAddress: recoveredAddress,
            isValid: isValid
        };
        
    } catch (error) {
        return {
            success: false,
            error: 'Invalid signature format or verification failed: ' + error.message
        };
    }
};

export default {
    testSignatureVerification,
    verifySignature
}; 