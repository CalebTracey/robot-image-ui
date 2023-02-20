interface Props {
    text: string
}
const HeaderItem = (props: Props): JSX.Element => {
    const { text } = props

    return (
        <div className='header-item-container__sm'>
            <span className='header-span__sm'>{text}</span>
        </div>
    )
}

export default HeaderItem
