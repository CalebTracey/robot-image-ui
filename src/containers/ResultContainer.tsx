import { useContext, useEffect, useState } from 'react'
import Results from '../components/results/Results'
import useSearch, { SearchBarT } from '../hooks/useSearch'
import { ResultContext } from '../context/ResultContext'
import ResultInfo from '../components/results/ResultInfo'

interface Props {
    SearchBarState: SearchBarT
}

const ResultContainer = (props: Props): JSX.Element => {
    const { SearchBarState } = props
    const { Result } = useContext(ResultContext)
    const [CurrentLocation, setCurrentLocation] = useState('center')
    const [{ isSearchLoading, Input }] = useSearch(SearchBarState)

    const { Location } = SearchBarState

    useEffect(() => {
        if (Result && Location === 'center') {
            setCurrentLocation('top')
        } else if (!Result && Location === 'top') {
            setCurrentLocation('center')
        }
        return setCurrentLocation('center')
    }, [Result, Location])

    const resultContainerLoc = (): ResultLocT =>
        CurrentLocation === 'top' ? 'center' : 'bottom'

    return (
        <div className={`result-container ${resultContainerLoc()}`}>
            {Result && !isSearchLoading ? (
                <div className='result-info-container'>
                    <ResultInfo Input={Input} respCount={Result.data.length} />
                </div>
            ) : null}
            <Results Result={Result} SearchBarState={SearchBarState} />
        </div>
    )
}

export default ResultContainer
