import { Container } from 'react-bootstrap'
import { SearchBarT } from '../hooks/useSearch'
import SearchBar from '../components/SearchBar'
import Header from '../components/header/Header'
import Results from '../components/results/Results'
import { useContext, useEffect, useState } from 'react'
import { ResultContext } from '../ResultContext'

interface Props {
    SearchBarState: SearchBarT
    SearchBarLoc: SearchBarLocT
}

const ContentContainer = (props: Props): JSX.Element => {
    const { SearchBarState, SearchBarLoc } = props

    const { Result, setResult } = useContext(ResultContext)
    const [Location, setLocation] = useState('center')

    useEffect(() => {
        if (Result && SearchBarLoc === 'center') {
            setLocation('top')
        } else if (!Result && SearchBarLoc === 'top') {
            setLocation('center')
        }
    }, [Result, SearchBarLoc])

    const resultContainerLoc = (): ResultLocT =>
        Location === 'top' ? 'center' : 'bottom'

    return (
        <div className='content-container'>
            <div className='header-container'>
                <Header />
            </div>
            <Container className='content-grid'>
                <div className={`result-container ${resultContainerLoc()}`}>
                    <Results SearchBarState={SearchBarState} Result={Result} />
                </div>

                <div className={`search-container ${Location}`}>
                    <SearchBar
                        SearchBarState={SearchBarState}
                        Result={Result}
                        setResult={setResult}
                    />
                </div>
            </Container>
        </div>
    )
}

export default ContentContainer
