# Notes

This file is to answer the prompt/writeup questions as well as to document other thoughts and the process.

## Questions

**How does your solution work**

**How many hours did this take you**

**What went well, what went poorly**
**Poorly**
- Coming to grips with the Alchemy API and understanding the documentation to
  put together the puzzle of getting a block, then it's transactions.

**What did you have trouble with/how did you solve it**

**What would you add to your solution if you had more time**


## The Process

### Understanding the Transaction Object on Ethereum
> See: [alchemy docs understanding the transaction object on ethereum](https://docs.alchemy.com/docs/understanding-the-transaction-object-on-ethereum)

The important thing to understand on the transaction object is the `value`
which is defined as "QUANTITY - value transferred in Wei" and more detailed.

```text
Every transaction has an attached value which is the amount that is being
transferred from the sender to the receiver. The value returns this
quantity and is shown in Wei.
```

Therefore, we need to be able to convert the WEI to ETH, and finally we can
convert it to USD.

The Alchemy SDK has a Utils Object which has helper methods of which converts
WEi to ETH.

```javascript
// tx.value is the transaction value in ETH
let eth = Utils.formatEther(tx.value)
// where eth is the decimal value in ETH
```

### Exploring Alchemy and the endpoints available
Before starting anything, knowing what the data looks like and what to expect
would help a lot. So we start with exploring the data sources.

**Alchemy**
From their website they have an SDK to help with the process collecting data
from the blockchain.

```bash
export ARKHAMAPI=GNauZOAEhjOc34zQQqQuXorOlmC6wJ6W
```

Install the Alchemy SDK
```bash
npm install alchemy-sdk
```

Get a block's data and all the transaction in a block.

```bash
curl --request POST \
     --url https://eth-mainnet.g.alchemy.com/v2/$ARKHAMAPI \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '{
     "id": 1,
     "jsonrpc": "2.0",
     "method": "eth_getBlockByNumber",
     "params": [
          true,
          false
     ]
}'
```

And after going finding the Javascript method `getBlock`, and using the definition
to find all the other methods available on the SDK finally found a method
`getBlockWithTransaction` which returns a block data as well as the transaction
data.

```text
{
  hash: '0x92fc42b9642023f2ee2e88094df80ce87e15d91afa812fef383e6e5cd96e2ed3',
  parentHash: '0x6890edf8ad6900a5472c2a7ee3ef795f020ef6f907afb7f4ebf6a92d6aeb1804',
  number: 15221026,
  timestamp: 1658877717,
  nonce: '0xd8c399035d6e6e8f',
  difficulty: null,
  gasLimit: BigNumber { _hex: '0x01ca35d2', _isBigNumber: true },
  gasUsed: BigNumber { _hex: '0x01ca1ae1', _isBigNumber: true },
  miner: '0x52bc44d5378309EE2abF1539BF71dE1b7d7bE3b5',
  extraData: '0x6e616e6f706f6f6c2e6f7267',
  transactions: [
    {
      hash: '0xba4938ea41154427c8cb424ea89d9f150f139ed10065fe43ce11102dc82e1c37',
      type: 2,
      accessList: [],
      blockHash: '0x92fc42b9642023f2ee2e88094df80ce87e15d91afa812fef383e6e5cd96e2ed3',
      blockNumber: 15221026,
      transactionIndex: 0,
      confirmations: 1521822,
      from: '0x91aaE0aAfd9D2d730111b395c6871f248d7Bd728',
      gasPrice: [BigNumber],
      maxPriorityFeePerGas: [BigNumber],
      maxFeePerGas: [BigNumber],
      gasLimit: [BigNumber],
      to: '0x98C3d3183C4b8A650614ad179A1a98be0a8d6B8E',
      value: [BigNumber],
      nonce: 117386,
      data: '0xce2e62ff00000000000000000000000000000000000000000000000006d37a96c691fec00000000000000000000000000000000000000000000000006c5f2aba0307f8000000000000000000000000000c4a68cf6857cc76fe946d04fe85fac5fae9625e000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000062e07780',
      r: '0xc509b635a3a59b03be542d6d9ef898b9b2acc479e8bbae79d20481c5cde53694',
      s: '0x35f94c8c184c73f9086ba093147ed705d3240e9caadced2b436eb5fece4674cd',
      v: 0,
      creates: null,
      chainId: 1,
      wait: [Function (anonymous)]
    },
}
```

**Coin Market Cap**
1. Set up an account and get an API key.
2. Find a suitable endpoint to get the price of ETH.

**Test the sandbox API curl command**
```bash
curl -H "X-CMC_PRO_API_KEY: $COINMARKETAPI" -H "Accept: application/json" -d "start=1&limit=5000&convert=USD" -G https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest
```

From the available endpoints the best choice seems to be: `v2/cryptocurrency/quotes/latest?id=1027`
where the `id=1027` is the ID for Ethereum. As: "Returns the latest market
quote for 1 or more cryptocurrencies. Use the "convert" option to return market
values in multiple fiat and cryptocurrency conversions in the same call."

```bash
curl -H "X-CMC_PRO_API_KEY: $COINMARKETAPI" -H "Accept: application/json" -G https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=1027
```

With a response structure, from which we can get the price of a single ETH in
USD. With some arithmetic `quantity * price/quantity = trade value`.

```json
{
  "data": {
    "1027": {
      "name": "Ethereum",
      "symbol": "ETH",
      "quote": {
        "USD": {
          "price": 1657.3535732498028
        }
      }
    }
  }
}
```

Spend quite a bit of time trying to figure out why Coin Market Cap's API did
not want to work due to CORS. After a while retired their API, as it became
clear that the API allows server to server communication, but not server to
browser communication and therefore switching to Coin Gecko.

**Coin Gecko**

Have a very simple an intuitive API and docs using the OpenAPI doc spec
simplifies the process, [Coin Gecko Docs](https://www.coingecko.com/en/api/documentation).

With the one of the first endpoints being the one required, `GET /simple/price`.

A quick test in the browser using `fetch` confirmed that this endpoint would
work.

