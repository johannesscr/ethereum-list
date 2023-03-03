import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import BlockDetail from './BlockDetail'
import type { BlockWithTransactions } from 'alchemy-sdk'

describe('BlockView.tsx', () => {
	it('should render the block', () => {
		const mockBlock: BlockWithTransactions = {
			// define the following as any to suppress the ts error
			// as we won't be using these properties
			_difficulty: undefined as any,
			gasLimit: undefined as any,
			gasUsed: undefined as any,
			difficulty: 0,
			extraData: '',
			hash: '0x8499c184995c4c051793f9c889fac8ffd9b03f21205cb16021ce235b29e7b227',
			miner: '0x388C818CA8B9251b393131C08a736A67ccB19297',
			nonce: '0x0000000000000000',
			number: 16746806,
			parentHash: '0x47eeab980d34b8d16fc402e88e5797f098b479405f6cf745c20730019daa6eb8',
			timestamp: 1677832235,
			transactions: []

		}
		render(<BlockDetail block={mockBlock} />)
		expect(screen.getByText(/block #16746806/i)).toBeInTheDocument()
	})
})