import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'
import Header, { AppName } from '../../../src/components/header/Header'
// import Header, { AppName } from

describe('Header Test', () => {
    it('renders app header successfully', () => {})
    render(<Header />)
    // const title = screen.getByTitle(AppName)
    const title = screen.getByText(AppName)
    // expect(title).toBeDefined()
    expect(title).toBeDefined()
    // expect(screen.getByRole('div', { level: 1 })).toBeDefined()
})
