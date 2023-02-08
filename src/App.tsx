import React, { useState } from 'react'
import ContentContainer from './containers/content/ContentContainer'

const App = (): JSX.Element => {
  const [initializing, setInitializing] = useState(true)

  return (
    <div className='app'>
      <ContentContainer
        initializing={initializing}
        setInitializing={setInitializing}
      />
    </div>
  )
}

export default App
