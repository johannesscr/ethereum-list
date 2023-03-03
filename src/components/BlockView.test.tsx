import { describe, it, expect, beforeEach, afterAll, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { alchemy } from '../services/alchemy.service'
import BlockView from './BlockView'
import { BlockWithTransactions } from 'alchemy-sdk'

let mockAlchemy: any

beforeEach(() => {
	mockAlchemy = vi.spyOn(alchemy.core, 'getBlockWithTransactions')
})
afterEach(() => vi.resetAllMocks())

describe('BlockView.tsx', () => {
	it('should indicate that the initial block is loading', () => {
		mockAlchemy.mockImplementation(() => undefined)
		render(<BlockView blockNumber={156721} />)
		expect(screen.getByText(/loading.../i)).toBeInTheDocument()
	})

	it('should display the block detail once the block has loaded', async () => {
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
		mockAlchemy.mockImplementation(() => mockBlock)
		// Note that the block number passed is used to fetch the actual block
		// data. From the block data all the rendering is done.
		render(<BlockView blockNumber={156721} />)

		expect(screen.getByText(/loading.../i)).toBeInTheDocument()
		await waitFor(() => {
			expect(screen.getByText(/#16746806/i)).toBeInTheDocument()
		})
	})
})