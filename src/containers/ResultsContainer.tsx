import React from 'react'
import { ImageList } from '../components/ImageList'
import Results from '../components/results/Results'

interface Props {
  resultLocation: ResultLocationT
  respCount: number
  isLoading: boolean
  result: ResultI | undefined
  prompt: string
}

const ResultsContainer = (props: Props): JSX.Element | null => {
  const { isLoading, result, prompt, respCount, resultLocation } = props
  return (
    <div className={`result-container ${resultLocation}`}>
      <Results
        respCount={respCount}
        isLoading={isLoading}
        result={result}
        prompt={prompt}
      />
    </div>
  )
}

export default ResultsContainer
