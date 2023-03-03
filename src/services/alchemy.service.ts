import { Alchemy, Network } from 'alchemy-sdk'

const settings = {
	apiKey: import.meta.env.VITE_ALCHEMY,
	network: Network.ETH_MAINNET,
}

const alchemy = new Alchemy(settings)

export {
	alchemy
}
