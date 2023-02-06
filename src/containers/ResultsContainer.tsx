import React from 'react'
import { ImageList } from '../components/ImageList'

interface Props {
  respCount: number
  isLoading: boolean
  result: ResultI | undefined
  prompt: string
}

const ResultsContainer = (props: Props): JSX.Element | null => {
  const { isLoading, result, prompt, respCount } = props
  return (
    <div className='results-container'>
      <div id='results-container' className='lower-content__results'>
        {!isLoading && prompt && respCount > 0 ? (
          <p className='prompt'>{prompt}</p>
        ) : null}
        {isLoading ? null : <ImageList images={result?.data} />}
      </div>
    </div>
  )
}

export default ResultsContainer
