import { Container } from 'react-bootstrap'
import { SearchBarT } from '../hooks/useSearch'
import SearchBar from '../components/SearchBar'
import Header from '../components/header/Header'
import Results from '../components/results/Results'
import { FC, useContext, useEffect, useState } from 'react'
import { ResultContext } from '../ResultContext'

interface Props {
    SearchBarState: SearchBarT
    SearchBarLoc: SearchBarLocT
}

export const ContentContainer: FC<Props> = ({
    SearchBarState,
    SearchBarLoc,
}): JSX.Element => {
    const { Result, setResult } = useContext(ResultContext)
    const [Location, setLocation] = useState('center')

    useEffect(() => {
        if (Result && SearchBarLoc === 'center') {
            setLocation('top')
        } else if (!Result && SearchBarLoc === 'top') {
            setLocation('center')
        }
    }, [Result, SearchBarLoc])

    return (
        <div className='content-container'>
            <div className='header-container'>
                <Header />
            </div>
            <Container className='content-grid'>
                <div
                    className={`result-container ${
                        Location === 'top' ? 'center' : 'bottom'
                    }`}
                >
                    <Results SearchBarState={SearchBarState} Result={Result} />
                </div>

                <div className={`search-container ${Location}`}>
                    <SearchBar
                        SearchBarState={SearchBarState}
                        setResult={setResult}
                    />
                </div>
            </Container>
        </div>
    )
}

export default ContentContainer
