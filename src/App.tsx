import { useState } from 'react'
import { Alchemy, Network } from 'alchemy-sdk'

import BlockView from './components/BlockView'
import './App.css'

// wss://eth-mainnet.alchemyapi.io/v2/GNauZOAEhjOc34zQQqQuXorOlmC6wJ6Wv
const settings = {
    apiKey: 'GNauZOAEhjOc34zQQqQuXorOlmC6wJ6W',
    network: Network.ETH_MAINNET,
}

const alchemy = new Alchemy(settings)

function App() {
    const [block, setBlock] = useState<number|undefined>()

    // Subscription for new blocks on Eth Mainnet.
    alchemy.ws.on("block", (blockNumber) => {
        setBlock(blockNumber)
    });

    return (
        <div className="App">
            <BlockView blockNumber={block} />
        </div>
    )
}

export default App
