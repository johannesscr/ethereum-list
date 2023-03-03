import { Alchemy, Network, Utils } from 'alchemy-sdk'


// wss://eth-mainnet.alchemyapi.io/v2/GNauZOAEhjOc34zQQqQuXorOlmC6wJ6Wv
const settings = {
	apiKey: 'GNauZOAEhjOc34zQQqQuXorOlmC6wJ6W',
	network: Network.ETH_MAINNET,
}

const alchemy = new Alchemy(settings)

export {
	alchemy
}

// async function main() {
// 	const latestBlock = await alchemy.core.getBlockNumber();
// 	console.log(`The latest block number is ${latestBlock}`)
// }


// main()
// // Subscription for new blocks on Eth Mainnet.
// alchemy.ws.on("block", (blockNumber) =>
// 	console.log("The latest block number is", blockNumber)
// );
// Subscription for Alchemy's pendingTransactions Enhanced API
// let i = 1;
// alchemy.ws.on(
// 	{
// 		// method: "alchemy_pendingTransactions",
// 		method: "alchemy_minedTransactions",
// 		// toAddress: "vitalik.eth",
// 	},
// 	(tx) => {
// 		i += 1
// 		console.log(i, tx)
// 		// let e = Utils.formatEther(tx.value)
// 		// console.log(`value: ${tx.value} WEI => ${e} ETH`)
// 	}
// );

// // Subscription for new blocks on Eth Mainnet.
// alchemy.ws.on("block", (blockNumber) => {
// 		let bHex = Utils.hexValue(blockNumber)
// 	console.log("The latest block number is", blockNumber, bHex)
// 	}
// );