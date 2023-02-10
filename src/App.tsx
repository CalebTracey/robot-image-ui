import { useEffect, useState } from 'react'
import { GrowSpinner } from './components/GrowSpinner'
import ContentContainer from './containers/ContentContainer'
import useSearch, { InitialSearchState } from './hooks/useSearch'

const App = (): JSX.Element => {
    const [Mounted, setMounted] = useState(false)
    const [SearchBarLoc, setSearchBarLoc] = useState<SearchBarLocT>('center')
    const [SearchBarState] = useSearch(InitialSearchState)

    const { Location } = SearchBarState

    useEffect(() => {
        setMounted(true)
        {
            console.info('=== mounted!')
        }
    }, [setMounted])

    useEffect(() => {
        if (Location !== SearchBarLoc) {
            setSearchBarLoc(Location)
        }
    }, [Location, SearchBarLoc])

    return Mounted ? (
        <div className='app'>
            <ContentContainer
                SearchBarState={SearchBarState}
                SearchBarLoc={SearchBarLoc}
            />
        </div>
    ) : (
        <div className='loading-page'>
            <GrowSpinner />
        </div>
    )
}

export default App
