import { Alchemy, Network, Utils } from 'alchemy-sdk'

const settings = {
	apiKey: process.env.REACT_APP_ALCHEMY,
	network: Network.ETH_MAINNET,
}

const alchemy = new Alchemy(settings)

export {
	alchemy
}
