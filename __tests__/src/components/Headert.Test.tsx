import { render, screen } from '@testing-library/react'
import React from 'react'
import Header, { AppName } from '../../../src/components/header/Header'
// import Header, { AppName } from

test('Header Test', () => {
    render(<Header />)
    const title = screen.getByTitle(AppName)
    expect(title).toBeDefined()
})
