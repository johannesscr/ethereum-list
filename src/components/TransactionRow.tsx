import { FC } from 'react'
import type { TransactionResponse } from 'alchemy-sdk'
import { Utils } from 'alchemy-sdk'

type TransactionRowProps = {
	transaction: TransactionResponse
	currency: number
}
const TransactionRow: FC<TransactionRowProps> = ({ transaction, currency }) => {
	const eth = parseFloat(Utils.formatEther(transaction.value))
	const ethereumUSD = eth * currency
	// 00000000002525
	return (
		<tr className="transaction-row">
			<td className="text-left font-mono px-1">{ transaction.from }</td>
			<td className="text-left font-mono px-1">{ transaction.to }</td>
			<td className="text-right px-1">{ eth === 0 ? 0 : eth.toFixed(12) } ETH</td>
			<td className="text-right px-1">$ { ethereumUSD === 0 ? 0 : ethereumUSD.toFixed(3) }</td>
		</tr>
	)
}

export default TransactionRow