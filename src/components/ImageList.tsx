import ImageContainer from '../containers/ImageContainer'

interface Props {
    images: UrlI[]
}

const ImageList = (props: Props): JSX.Element => {
    const { images } = props

    const resp = images.map((img) => {
        const { url } = img
        return <ImageContainer key={url} src={url} />
    })

    return <div className='image-list'>{resp}</div>
}

export default ImageList
