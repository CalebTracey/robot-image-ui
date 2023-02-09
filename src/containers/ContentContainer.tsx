import { Container } from 'react-bootstrap'
import useSearch, { initialSearchState } from '../hooks/useSearch'
import SearchBar from '../components/SearchBar'
import Header from '../components/header/Header'
import useService, { initialServiceState } from '../hooks/useService'
import Results from '../components/results/Results'
import { useState } from 'react'

export const ContentContainer = (): JSX.Element => {
  const [searchBarState, handler] = useSearch(initialSearchState)
  const [serviceState, serviceHandler] = useService(initialServiceState)
  // const [respCount, setRespCount] = useState(0)

  // const [searchBarLoc, setSearchBarLoc] = useState<SearchBarLocT>('center')
  const { location, searchLoading, prompt } = searchBarState

  // useEffect(() => {
  //   if (result) {
  //     setRespCount(result.data.length)
  //   }
  // }, [result])

  return (
    <div className='content-container'>
      <div className='header-container'>
        <Header />
      </div>
      <Container className='content-grid'>
        <div
          className={`result-container ${
            location === 'top' ? 'center' : 'bottom'
          }`}
        >
          <Results searchBarState={searchBarState} />
        </div>

        <div className={`search-container ${location}`}>
          <SearchBar searchState={searchBarState} handler={handler} />
        </div>
      </Container>
    </div>
  )
}

export default ContentContainer
