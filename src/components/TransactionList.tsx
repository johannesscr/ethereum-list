import { FC, useEffect, useState } from 'react'
import type { TransactionResponse } from 'alchemy-sdk'
import TransactionRow from './TransactionRow'
import { CoinGeckoAPI } from '../services/coinGecko.service'

type TransactionListProps = {
	transactions: TransactionResponse[];
}

/**
 * TransactionList shows a list of all the transactions, it fetches the current
 * trading price of ethereum in USD to be able to convert ETH to USD value.
 *
 * @param transactions the array of block transactions.
 */
const TransactionList: FC<TransactionListProps> = ({ transactions }) => {
	const [ethereumPriceUSD, setEthereumPriceUSD] = useState(0)

	/**
	 * getUSD is a wrapper function to fetch the current trading price of ETH
	 * to USD from the Coin Gecko API.
	 */
	async function getUSD() {
		const result = await CoinGeckoAPI.getSimplePrice(['ethereum'], ['usd'])
		if (result !== undefined) {
			setEthereumPriceUSD(result.ethereum.usd)
		}
	}

	/**
	 * useEffect to fetch the latest price of ETH to USD when a new set of
	 * transactions are passed to the component.
	 */
	useEffect(() => { getUSD() }, [transactions])

	return (
		<div className="transaction-list">
			<p className="uppercase font-bold text-left text-2xl">transactions</p>
			<table>
				<thead>
				<tr className="text-left">
					<th className="capitalize">from</th>
					<th className="capitalize">to</th>
					<th className="uppercase">eth</th>
					<th className="uppercase">usd</th>
				</tr>
				</thead>
				<tbody>
				{transactions.map((transaction, idx) => <TransactionRow key={idx} transaction={transaction} currency={ethereumPriceUSD} />)}
				</tbody>
			</table>
		</div>
	)
}

export default TransactionList