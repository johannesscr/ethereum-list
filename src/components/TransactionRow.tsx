import { FC } from 'react'
import type { TransactionResponse } from 'alchemy-sdk'
import { Utils } from 'alchemy-sdk'

type TransactionRowProps = {
	transaction: TransactionResponse
	currency: number
}

/**
 * TransactionRow displays the basic information of a transaction from the
 * ethereum block.
 * Basic info to display is the from address, to address, value in ETH and
 * then to convert the ETH to USD to display the value of the transaction
 * in USD.
 *
 * @param transaction the transaction.
 * @param currency the conversion rate of 1 ETH to USD.
 */
const TransactionRow: FC<TransactionRowProps> = ({ transaction, currency }) => {
	const eth = parseFloat(Utils.formatEther(transaction.value))
	const ethereumUSD = eth * currency
	return (
		<tr className="transaction-row">
			<td className="text-left font-mono px-1">{ transaction.from }</td>
			<td className="text-left font-mono px-1">{ transaction.to }</td>
			<td className="text-right font-mono px-1">{ eth.toFixed(12) } ETH</td>
			<td className="text-right font-mono px-1">$ { ethereumUSD.toFixed(3) }</td>
		</tr>
	)
}

export default TransactionRow