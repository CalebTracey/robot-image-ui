import { Image } from 'react-bootstrap'

interface Props {
    src: string
}

export const ImageContainer = (props: Props): JSX.Element => {
    const { src } = props

    return (
        <>
            {/* <DownloadButton src={src} /> */}
            <div className='image-item'>
                <Image
                    className='image-container'
                    thumbnail={false}
                    src={src}
                />
            </div>
        </>
    )
}

export default ImageContainer
