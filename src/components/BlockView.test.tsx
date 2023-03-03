import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BlockView from './BlockView'

describe('BlockView.tsx', () => {
	it('should render the block', () => {
		render(<BlockView blockNumber={156721} />)
		expect(screen.getByText(/156721/i)).toBeInTheDocument()
	})
})