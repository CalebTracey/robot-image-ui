import { FC, useContext } from 'react'
import useSearch, { SearchBarT } from '../../hooks/useSearch'
import { ResultContext } from '../../ResultContext'
import { ImageList } from '../ImageList'
import ResultInfo from './ResultInfo'

interface Props {
  searchBarState: SearchBarT
}

const Results: FC<Props> = ({ searchBarState }): JSX.Element => {
  // TODO add custom state hooks
  const { result } = useContext(ResultContext)
  const { searchLoading, prompt } = searchBarState

  return (
    <div className={'results'}>
      {!searchLoading && prompt && result ? (
        <div className='result-info-container'>
          <ResultInfo prompt={prompt} respCount={result.data.length} />
        </div>
      ) : (
        <span>Welcome!</span>
      )}
      {result && !searchLoading ? <ImageList images={result.data} /> : null}
    </div>
  )
}

export default Results
