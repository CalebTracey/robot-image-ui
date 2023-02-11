import { Button } from 'react-bootstrap'
import { BsDownload } from 'react-icons/bs'
interface Props {
    src: string
}

const DownloadButton = (props: Props): JSX.Element => {
    const { src } = props
    return (
        <Button className='form-button' type='button'>
            <BsDownload />
        </Button>
    )
}

export default DownloadButton
