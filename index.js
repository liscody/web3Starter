// dotenv
require("dotenv").config();

// web3.js
const Web3 = require("web3");

// BSC testnet
const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");

// contract ABI
const abi = require("./abi.json");

const contractAddress = "0x94C126EC858c5e4ada49863b0f3D1c01a87cab72";
const contract = new web3.eth.Contract(abi, contractAddress);

const privateKey = process.env.PRIVATE_KEY;
const account = process.env.ACCOUNT;

// safeMint function
const safeMint = async () => {
  try {
    const nonce = await web3.eth.getTransactionCount(account, "latest");
    console.log("Nonce:", nonce);
    const gasPrice = await web3.eth.getGasPrice();
    console.log("Gas Price:", gasPrice);

    const tx = {
      from: account,
      to: contractAddress,
      nonce: nonce,
      gas: 500000,
      gasPrice: gasPrice,
      chainId: 97, // BSC testnet chain ID
      data: contract.methods.safeMint(
        account
      ).encodeABI(),
    };

    console.log("Transaction object:", tx);

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    console.log("Signed transaction", signedTx);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log("Transaction successful with hash:", receipt.transactionHash);

    // console.log("Transaction successful with hash:", receipt.transactionHash);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

safeMint();


// npm run start