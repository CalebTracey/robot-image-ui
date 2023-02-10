import { useEffect, useState } from 'react'
import Results from '../components/results/Results'
import { SearchBarT } from '../hooks/useSearch'

interface Props {
    SearchBarState: SearchBarT
    Result: ResultI | null
}

const ResultContainer = (props: Props): JSX.Element => {
    const { SearchBarState, Result } = props
    const [CurrentLocation, setCurrentLocation] = useState('center')
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
            <Results SearchBarState={SearchBarState} Result={Result} />
        </div>
    )
}

export default ResultContainer
