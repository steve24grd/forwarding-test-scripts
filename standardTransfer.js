const { ethers } = require("ethers");
require('dotenv').config();

// Load environment variables
const SENDER_PRIVATE_KEY = process.env.SENDER_PRIVATE_KEY; // Private key of the sender
const RECIPIENT_ADDRESS = "0xRecipientAddressHere"; // Replace with recipient address
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID; // Or your provider's API key

// Initialize provider
const provider = new ethers.providers.InfuraProvider("mainnet", INFURA_PROJECT_ID);

// Initialize wallet
const wallet = new ethers.Wallet(SENDER_PRIVATE_KEY, provider);

async function transferETH() {
    const tx = {
        to: RECIPIENT_ADDRESS,
        value: ethers.utils.parseEther("0.05"), // Amount to send
        gasLimit: 21000, // Basic ETH transfer gas limit
        gasPrice: ethers.utils.parseUnits("50", "gwei"), // Adjust as needed
    };

    console.log(`Sending 0.05 ETH from ${wallet.address} to ${RECIPIENT_ADDRESS}`);

    const transaction = await wallet.sendTransaction(tx);
    console.log("Transaction hash:", transaction.hash);

    const receipt = await transaction.wait();
    console.log("Transaction confirmed in block", receipt.blockNumber);
}

transferETH().catch(error => {
    console.error("Error transferring ETH:", error);
});
