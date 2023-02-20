import { SearchBarT } from '../../hooks/useSearch'
import ImageList from './ImageList'

interface Props {
    SearchBarState: SearchBarT
    Result: ResultI | null
}

const Results = (props: Props): JSX.Element => {
    const { Result } = props

    return (
        <div className='results'>
            {Result ? <ImageList images={Result.data} /> : null}
        </div>
    )
}

export default Results
