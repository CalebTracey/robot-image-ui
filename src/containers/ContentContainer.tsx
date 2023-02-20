import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'
import Header from '../components/header/Header'
import { ResultContext } from '../context/ResultContext'
import useSearch, { InitialSearchState } from '../hooks/useSearch'
import ResultContainer from './ResultContainer'
import SearchBarContainer from './SearchBarContainer'

const ContentContainer = (): JSX.Element => {
    const { setResult } = useContext(ResultContext)
    const [SearchBarState, Handler] = useSearch(InitialSearchState)

    return (
        <div className='content-container'>
            <div className='header-container'>
                <Header />
            </div>
            <Container className='content-grid'>
                <div style={{ marginTop: '15%', overflow: 'scroll' }}>
                    <ResultContainer SearchBarState={SearchBarState} />
                </div>
                <SearchBarContainer
                    SearchBarState={SearchBarState}
                    setResult={setResult}
                    Handler={Handler}
                />
            </Container>
        </div>
    )
}

export default ContentContainer
