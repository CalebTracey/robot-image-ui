import { useEffect, useState } from 'react'
import { GrowSpinner } from './components/GrowSpinner'
import ContentContainer from './containers/ContentContainer'

const App = (): JSX.Element => {
    const [Mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        {
            console.info('=== mounted!')
        }
    }, [setMounted])

    return Mounted ? (
        <div className='app'>
            <ContentContainer />
        </div>
    ) : (
        <div className='loading-page'>
            <GrowSpinner />
        </div>
    )
}

export default App
