import { Spinner } from 'react-bootstrap'

export const GrowSpinner = (): JSX.Element => {
    return (
        <div className={'grow-spinner-container'}>
            <Spinner animation='grow' />
        </div>
    )
}
