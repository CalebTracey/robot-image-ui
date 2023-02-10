import { Dispatch, SetStateAction, useState } from 'react'
import SearchBar from '../components/SearchBar'
import Constants from '../Constants'
import { isResponseI, SearchBarI, SearchBarT } from '../hooks/useSearch'
import useService, { InitialServiceState } from '../hooks/useService'

const { DefaultLabel, SearchLabel } = Constants

interface Props {
    SearchBarState: SearchBarT
    Handler: SearchBarI
    Result: ResultI | null
    setResult: Dispatch<SetStateAction<ResultI | null>>
}

const SearchBarContainer = (props: Props): JSX.Element => {
    const { SearchBarState, Handler, setResult } = props
    const { Location } = SearchBarState

    const [, Service] = useService(InitialServiceState)

    const [isLoading, setIsLoading] = useState(false)
    const [Label, setLabel] = useState(DefaultLabel)
    // const [isLoading, setIsLoading] = useState(false)

    const { onSubmit, onInputChange } = Handler

    const HandleSubmit = async (e: SubmitEventT): Promise<void> => {
        console.log('=== submit handler')
        setLabel(SearchLabel)
        setIsLoading(true)
        const response = await onSubmit(e, Service)

        if (isResponseI(response)) {
            const resp = response as ResponseI
            setLabel(DefaultLabel)
            setResult(resp.result)
        }
        setIsLoading(false)
    }

    // const handleIsLoading = useCallback((loading: boolean) => {
    //     loading ? setLabel(SearchLabel) : setLabel(DefaultLabel)
    //     setIsLoading(loading)
    // }, [])

    // useEffect(() => {
    //     handleIsLoading(isSearchLoading)

    //     return () => {
    //         setLabel(DefaultLabel)
    //         setIsLoading(false)
    //     }
    // }, [handleIsLoading, isSearchLoading])

    return (
        <div className={`search-container ${Location}`}>
            <SearchBar
                Label={Label}
                isLoading={isLoading}
                // SearchBarState={SearchBarState}
                HandleSubmit={HandleSubmit}
                onInputChange={onInputChange}
                setLabel={setLabel}
            />
        </div>
    )
}

export default SearchBarContainer
