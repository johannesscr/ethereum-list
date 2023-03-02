import { useState } from 'react'
import './App.css'
import { Alchemy, Network } from 'alchemy-sdk'

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
            <p>Current block number is { block }</p>
        </div>
    )
}

export default App
