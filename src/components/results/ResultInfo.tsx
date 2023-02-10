import { Col, Container, Row } from 'react-bootstrap'

interface Props {
    respCount: number
    Input: string
}

const ResultInfo = (props: Props): JSX.Element => {
    const { Input, respCount } = props
    return (
        <div className='result-info'>
            <Container>
                <Col>
                    <Row>
                        <span>{Input}</span>
                    </Row>
                    <Row>
                        <span>Total: {respCount}</span>
                    </Row>
                </Col>
            </Container>
        </div>
    )
}

export default ResultInfo
