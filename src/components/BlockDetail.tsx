import { FC } from 'react'
import type { BlockWithTransactions } from 'alchemy-sdk'

type BlockDetailProps = {
	block: BlockWithTransactions
}

/**
 * BlockDetail shows the mined block's details.
 *
 * @param block the ethereum block.
 */
const BlockDetail: FC<BlockDetailProps> = ({ block }) => {
	return (
		<div className="block-detail">
			<h3>Block #{block.number}</h3>
		</div>
	)
}

export default BlockDetail