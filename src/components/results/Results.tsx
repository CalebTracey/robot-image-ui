import React from 'react'
import { ImageList } from '../ImageList'
import ResultInfo from './ResultInfo'

interface Props {
  respCount: number
  isLoading: boolean
  result: ResultI | undefined
  prompt: string
}

const Results = (props: Props): JSX.Element => {
  const { isLoading, result, prompt, respCount } = props

  return (
    <div className={'results'}>
      {!isLoading && prompt && respCount > 0 ? (
        <div className='result-info-container'>
          <ResultInfo prompt={prompt} respCount={respCount} />
        </div>
      ) : (
        <span>Welcome!</span>
      )}
      {isLoading ? null : <ImageList images={result?.data} />}
    </div>
  )
}

export default Results
