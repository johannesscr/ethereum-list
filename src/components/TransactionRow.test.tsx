import { describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import TransactionRow from './TransactionRow'
import type { BigNumber, TransactionResponse, TransactionReceipt } from 'alchemy-sdk'
describe('TransactionRow.tsx', () => {
	it('should render and format the transaction', () => {
		const mockTransaction: TransactionResponse = {
			value: {
				_hex: "0x02c68af0bb140000",
				_isBigNumber: true
			} as BigNumber,
			wait(confirmations: number | undefined): Promise<TransactionReceipt> {
				return Promise.resolve(undefined as any)
			},
			accessList: undefined,
			blockHash: "0x7bb431efba345ce5deb9291a36271cd79f17706043430bb4e82d6f9ade317c16",
			blockNumber: 16747025,
			chainId: 1,
			confirmations: 1,
			data: "0x8a8c523c",
			from: "0x08baAc56132bbC4b363de8f3B88D132b113D9f58",
			gasLimit: undefined as any,
			gasPrice: undefined as any,
			hash: "0x12b0f4c67572b5f6ae3da464dd6b753e4869f1878ba7eae36e2b00faa9432f97",
			nonce: 3,
			r: "0xbe9e476f9096593a5c5d40472a18e63041c766354950d24e832671a569b71875",
			s: "0x597c7a4fcb0de1871e07b03075ea2430383848682b9b760c6f6d2a9f86dc80ea",
			to: "0x202130058ADa9538071ec8d6630847d98D843b33",
			type: 0,
			v: 37
		}

		render(<TransactionRow transaction={mockTransaction} currency={100} />)
		// get the from address
		expect(screen.getByText(/0x08baAc56132bbC4b363de8f3B88D132b113D9f58/i)).toBeInTheDocument()
		// get the to address
		expect(screen.getByText(/0x202130058ADa9538071ec8d6630847d98D843b33/i)).toBeInTheDocument()
		// get the eth value
		expect(screen.getByText(/0.2000+ eth/i)).toBeInTheDocument()
		// get the usd value
		expect(screen.getByText(/\$ 20.000/i)).toBeInTheDocument()
	})
})