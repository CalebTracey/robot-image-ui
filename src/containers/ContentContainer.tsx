import { Container } from 'react-bootstrap'
import useSearch, { InitialSearchState } from '../hooks/useSearch'
import Header from '../components/header/Header'
import { useContext } from 'react'
import { ResultContext } from '../context/ResultContext'
import ResultContainer from './ResultContainer'
import SearchBarContainer from './SearchBarContainer'

// interface Props {
//     // SearchBarState: SearchBarT
//     // SearchBarLoc: SearchBarLocT
// }

const ContentContainer = (): JSX.Element => {
    const { Result, setResult } = useContext(ResultContext)
    const [SearchBarState, Handler] = useSearch(InitialSearchState)

    return (
        <div className='content-container'>
            <div className='header-container'>
                <Header />
            </div>

            <Container className='content-grid'>
                <ResultContainer
                    SearchBarState={SearchBarState}
                    Result={Result}
                />
                <SearchBarContainer
                    SearchBarState={SearchBarState}
                    Result={Result}
                    setResult={setResult}
                    Handler={Handler}
                />
            </Container>
        </div>
    )
}

export default ContentContainer
