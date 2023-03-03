import { Alchemy, Network, Utils } from 'alchemy-sdk'

const settings = {
	apiKey: 'GNauZOAEhjOc34zQQqQuXorOlmC6wJ6W',
	network: Network.ETH_MAINNET,
}

const alchemy = new Alchemy(settings)

export {
	alchemy
}
