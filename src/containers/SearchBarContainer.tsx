import { Dispatch, SetStateAction, useState } from 'react'
import SearchBar from '../components/SearchBar'
import Constants from '../Constants'
import { isResponseI, SearchBarI, SearchBarT } from '../hooks/useSearch'
import useService, { InitialServiceState } from '../hooks/useService'

const { DefaultLabel, SearchLabel } = Constants

interface Props {
    SearchBarState: SearchBarT
    Handler: SearchBarI
    setResult: Dispatch<SetStateAction<ResultI | null>>
}

const SearchBarContainer = (props: Props): JSX.Element => {
    const { SearchBarState, Handler, setResult } = props
    const { Location } = SearchBarState

    const [, Service] = useService(InitialServiceState)

    const [isLoading, setIsLoading] = useState(false)
    const [Label, setLabel] = useState(DefaultLabel)

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

    return (
        <div className={`search-container ${Location}`}>
            <SearchBar
                Label={Label}
                isLoading={isLoading}
                HandleSubmit={HandleSubmit}
                onInputChange={onInputChange}
            />
        </div>
    )
}

export default SearchBarContainer
