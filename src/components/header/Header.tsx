import HeaderItem from './HeaderItem'

export const AppName = 'AI Hub'

const Header = (): JSX.Element => {
    return (
        <header>
            <div className='header-content'>
                <div className='header-item-container'>
                    <span className='header-title'>{AppName}</span>
                </div>
                <HeaderItem text='stuff' />
                <HeaderItem text='and' />
                <HeaderItem text='things' />
            </div>
        </header>
    )
}

export default Header
