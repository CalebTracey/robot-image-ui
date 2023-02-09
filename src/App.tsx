import React, { useEffect, useState } from 'react'
import { GrowSpinner } from './components/GrowSpinner'
import ContentContainer from './containers/ContentContainer'

const App = (): JSX.Element => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    {
      console.info('=== mounted!')
    }
  }, [setMounted])

  return mounted ? (
    <div className='app'>
      <ContentContainer />
    </div>
  ) : (
    <div className='loading-page'>
      <GrowSpinner />
    </div>
  )
}

export default App
