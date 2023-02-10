import { Dispatch, SetStateAction } from 'react'
import SearchBar from '../components/SearchBar'
import { SearchBarI, SearchBarT } from '../hooks/useSearch'

interface Props {
    SearchBarState: SearchBarT
    Handler: SearchBarI
    // SearchBarState: SearchBarT
    Result: ResultI | null
    setResult: Dispatch<SetStateAction<ResultI | null>>
}
const SearchBarContainer = (props: Props): JSX.Element => {
    const { SearchBarState, Handler, Result, setResult } = props
    const { isSearchLoading, Location } = SearchBarState

    return (
        <div className={`search-container ${Location}`}>
            <SearchBar
                // SearchBarState={SearchBarState}
                isSearchLoading={isSearchLoading}
                Handler={Handler}
                Result={Result}
                setResult={setResult}
            />
        </div>
    )
}

export default SearchBarContainer
