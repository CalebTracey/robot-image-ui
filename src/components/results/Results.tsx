import useSearch, { SearchBarT } from '../../hooks/useSearch'
import { ImageList } from '../ImageList'
import ResultInfo from './ResultInfo'

interface Props {
    SearchBarState: SearchBarT

    Result: ResultI | null
}

const Results = (props: Props): JSX.Element => {
    const { SearchBarState, Result } = props
    const [{ isSearchLoading, Input }] = useSearch(SearchBarState)

    return (
        <div className='results'>
            {!isSearchLoading && Input && Result ? (
                <div className='result-info-container'>
                    <ResultInfo Input={Input} respCount={Result.data.length} />
                </div>
            ) : null}
            {Result && !isSearchLoading ? (
                <ImageList images={Result.data} />
            ) : null}
        </div>
    )
}

export default Results
