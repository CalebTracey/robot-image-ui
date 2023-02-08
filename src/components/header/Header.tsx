import React from 'react'
import { Alert } from 'react-bootstrap'

interface Props {
  alert: AlertT | undefined
}

const AppName = 'AI Hub'

const Header = (props: Props): JSX.Element => {
  const { alert } = props

  return (
    <header className='header'>
      <div className='header-content'>
        <div className='header-item-container'>
          <span style={{ fontWeight: 500 }} className='ph-a'>
            {AppName}
          </span>
        </div>
        {/* <HeaderText text={PageTitleA} /> */}
        {alert ? (
          <Alert className='header-alert' show={!!alert} variant={alert?.type}>
            <span>{alert?.message}</span>
          </Alert>
        ) : null}
      </div>
    </header>
  )
}

export default Header
