import { FC, useEffect, useState } from 'react'
import type { TransactionResponse } from 'alchemy-sdk'
import TransactionRow from './TransactionRow'
import { CoinGeckoAPI } from '../services/coinGecko.service'

type TransactionListProps = {
	transactions: TransactionResponse[];
}
const TransactionList: FC<TransactionListProps> = ({ transactions }) => {
	const [ethereumPriceUSD, setEthereumPriceUSD] = useState(0)
	async function getUSD() {
		const result = await CoinGeckoAPI.getSimplePrice(['ethereum'], ['usd'])
		if (result !== undefined) {
			setEthereumPriceUSD(result.ethereum.usd)
		}
	}
	useEffect(() => { getUSD() }, [transactions])

	return (
		<div className="transaction-list">
			<p>transactions</p>
			<table>
				<thead>
				<tr>
					<th>from</th>
					<th>to</th>
					<th>eth</th>
					<th>usd</th>
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