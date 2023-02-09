import { Container, Image } from 'react-bootstrap'
import DownloadButton from '../components/buttons/DownloadButton'

interface Props {
  src: string
}

export const ImageContainer = (props: Props): JSX.Element => {
  const { src } = props

  return (
    <Container>
      <DownloadButton result={src} />
      <div className='image-item'>
        <Image className='image-container' thumbnail={true} src={src} />
      </div>
    </Container>
  )
}

export default ImageContainer
