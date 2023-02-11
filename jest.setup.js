import React from 'react'
import { render } from '@testing-library/react'

global.render = (component) => {
    render(component)
}
