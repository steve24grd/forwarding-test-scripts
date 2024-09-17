const { ethers } = require("ethers");
require('dotenv').config();

// Load environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY; // Private key of the external address
const FORWARDER_ADDRESS = "0xForwarderContractAddress"; // Replace with your Forwarder contract address
const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID; // Or your provider's API key

// Initialize provider
const provider = new ethers.providers.InfuraProvider("mainnet", INFURA_PROJECT_ID);

// Initialize wallet
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

async function sendETH() {
    const tx = {
        to: FORWARDER_ADDRESS,
        value: ethers.utils.parseEther("0.01"), // Amount to send
        gasLimit: 21000, // Basic ETH transfer gas limit
        gasPrice: ethers.utils.parseUnits("50", "gwei"), // Adjust as needed
    };

    console.log(`Sending 0.01 ETH from ${wallet.address} to ${FORWARDER_ADDRESS}`);

    const transaction = await wallet.sendTransaction(tx);
    console.log("Transaction hash:", transaction.hash);

    const receipt = await transaction.wait();
    console.log("Transaction confirmed in block", receipt.blockNumber);
}

sendETH().catch(error => {
    console.error("Error sending ETH:", error);
});
