const AppName = 'AI Hub'

const Header = (): JSX.Element => {
  return (
    <header>
      <div className='header-content'>
        <div className='header-item-container'>
          <span className='header-title'>{AppName}</span>
        </div>

        <div className='header-item-container__sm'>
          <span className='header-span'>stuff</span>
        </div>
        <div className='header-item-container__sm'>
          <span className='header-span'>and</span>
        </div>
        <div className='header-item-container__sm'>
          <span className='header-span'>things</span>
        </div>
      </div>
    </header>
  )
}

export default Header
