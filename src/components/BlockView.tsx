import { FC, useEffect, useState } from 'react'
import { alchemy } from '../services/alchemy.service'
import type { BlockWithTransactions } from 'alchemy-sdk'
import BlockDetail from './BlockDetail'
import TransactionList from './TransactionList'

type BlockViewProps = {
	blockNumber?: number;
}

/**
 * BlockView fetches an ethereum block with its transactions based on the block
 * number. It displays the block's data and its transactions with transaction
 * values in ETH and USD.
 *
 * @param blockNumber the block number.
 */
const BlockView: FC<BlockViewProps> = ({ blockNumber }) => {
	const [block, setBlock] = useState<BlockWithTransactions|undefined>()

	/**
	 * fetchBlock is a wrapper around the alchemy core getBlockWithTransactions
	 * method to fetch a block and its transaction based on the current block
	 * number being viewed.
	 *
	 * @param blockNumber
	 */
	async function fetchBlock(blockNumber: number) {
		const newBlock = await alchemy.core.getBlockWithTransactions(blockNumber)
		console.log(newBlock)
		setBlock(newBlock)
	}

	/**
	 * useEffect to trigger a re-fetch of the block data when block number
	 * changes.
	 */
	useEffect(() => {
		if (blockNumber) {
			fetchBlock(blockNumber)
		}
	}, [blockNumber])

	if (block === undefined) {
		return (
			<div>loading...</div>
		)
	}

	return (
		<div className="block-view">
			<BlockDetail block={block} />
			<TransactionList transactions={block.transactions} />
		</div>
	)
}

export default BlockView