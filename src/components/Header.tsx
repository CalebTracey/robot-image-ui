import React from 'react'
import { Alert } from 'react-bootstrap'
import HeaderText from './HeaderText'

const PageTitle = 'AI image factory'
interface Props {
  alert: AlertT | undefined
}

const Header = (props: Props): JSX.Element => {
  const { alert } = props

  return (
    <header className='header'>
      <div className='header-content'>
        <HeaderText text={PageTitle} />

        {alert ? (
          <Alert
            className='header-alert'
            show={!!alert}
            variant={alert?.type}
          >
            <span>{alert?.message}</span>
          </Alert>
        ) : null}
      </div>
    </header>
  )
}

export default Header
