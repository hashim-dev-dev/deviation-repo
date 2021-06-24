import React, { Component } from 'react'
import { Context } from '../Context/MpdProvider'
import {Container, Row, Col, Card, Table } from 'react-bootstrap'
import DashboardBarPlot from '../components/DashboardBarPlot'

function FunctionalComponent(props){
    if (props.context.state.mpdImproved){
        const number = props.context.state.mpdImproved
        return (
            <p>{number}</p>
        )
    }
    return ''
}


function NumericInformation(props){
    if (props.context.state.mpdImproved){
        return (
                <Table striped bordered hover size='sm' variant='dark'>
                    <thead>
                        <tr>
                        <th></th>
                        <th>Improved Kpis</th>
                        <th>Degraded Kpis</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>Mpd</td>
                        <td>67</td>
                        <td>23</td>
                        </tr>
                        <tr>
                        <td>Tch Traffic</td>
                        <td>12</td>
                        <td>20</td>
                        </tr>
                        <tr>
                        <td>Tch Traffic 1800</td>
                        <td>12</td>
                        <td>20</td>
                        </tr>
                        <tr>
                        <td>Tch Traffic 900</td>
                        <td>12</td>
                        <td>20</td>
                        </tr>
                        <tr>
                        <td>Drops Bss</td>
                        <td>89</td>
                        <td>90</td>
                        </tr>
                        <tr>
                        <td>Drops Ho</td>
                        <td>12</td>
                        <td>20</td>
                        </tr>
                        <tr>
                        <td>Drops Rf</td>
                        <td>12</td>
                        <td>20</td>
                        </tr>
                        <tr>
                        <td>Tch Availability</td>
                        <td>12</td>
                        <td>20</td>
                        </tr>

                        <tr>
                        <td>Sdcch Blocking</td>
                        <td>12</td>
                        <td>20</td>
                        </tr>

                        <tr>
                        <td>Tch Raw Blocking</td>
                        <td>12</td>
                        <td>20</td>
                        </tr>
                    </tbody>
                </Table>
        ) 
    }
    return ''
}

function Measures(props){
    if (props.context.state.data){

        const totalImproved = props.context.state.mpdImproved + props.context.state.tchtrafficImproved + props.context.state.tchtraffic1800Improved + props.context.state.tchtraffic900Improved + props.context.state.dropshoImproved + props.context.state.dropsrfImproved + props.context.state.tchavailabilityImproved + props.context.state.sdcchImproved + props.context.state.tchrawImproved
        const totalDegraded = props.context.state.mpdDegraded + props.context.state.tchtrafficDegraded + props.context.state.tchtraffic1800Degraded + props.context.state.tchtraffic900Degraded + props.context.state.dropshoDegraded + props.context.state.dropsrfDegraded + props.context.state.tchavailabilityDegraded + props.context.state.sdcchDegraded + props.context.state.tchrawDegraded

        return (
            <Container>
                <Row>
                    <Col md={3}>
                        <Card>
                            <Card.Body>
                                <p>Total Cells Analyzed</p>
                                <Card.Subtitle>{props.context.state.totalCells}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3}>
                        <Card>
                            <Card.Body>
                                <p>Degradations Detected</p>
                                <Card.Subtitle>{Math.trunc(totalDegraded/totalDegraded +totalImproved)}%</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3}>
                        <Card>
                            <Card.Body>
                                <p>Improvements Detected</p>
                                <Card.Subtitle>{Math.trunc(totalImproved/totalDegraded+totalImproved)}%</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3}>
                        <Card>
                            <Card.Body>
                                <p>Cells Detected (Change Points)</p>
                                <Card.Subtitle>{props.context.state.detectedCells}</Card.Subtitle>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
    return ''
}

function Kpis(props){
    if (props.context.state.data){
        return (
            <div>
                <Row>
                    <Col md={4}>
                    <Card>
                    <Card.Header className='text-center'>Minutes Per Drop</Card.Header>
                    <Card.Body>
                        
                        <Card.Text>
                        <p className='text-center'>Degradations: {props.context.state.mpdDegraded}</p>
                        <p className='text-center'>Improvements: {props.context.state.mpdImproved}</p>
                        <p className='text-center'>Cells Detected: {props.context.state.cellCounts['Mpd']}</p>
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Col>


                    <Col md={4}>
                    <Card>
                    <Card.Header className='text-center'>Tch Traffic</Card.Header>
                    <Card.Body>
                        
                        <Card.Text>
                        <p className='text-center'>Degradations: {props.context.state.tchtrafficDegraded}</p>
                        <p className='text-center'>Improvements: {props.context.state.tchtrafficImproved}</p>
                        <p className='text-center'>Cells Detected: {props.context.state.cellCounts['TchTraffic']}</p>
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Col>


                    <Col md={4}>
                    <Card>
                    <Card.Header className='text-center'>Tch Traffic 1800</Card.Header>
                    <Card.Body>
                        
                        <Card.Text>
                        <p className='text-center'>Degradations: {props.context.state.tchtraffic1800Degraded}</p>
                        <p className='text-center'>Improvements: {props.context.state.tchtraffic1800Improved}</p>
                        <p className='text-center'>Cells Detected: {props.context.state.cellCounts['TchTraffic1800']}</p>
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Col>

                    </Row>


                    <Row>
                    <Col md={4}>
                    <Card>
                    <Card.Header className='text-center'>Tch Traffic 900</Card.Header>
                    <Card.Body>
                        
                        <Card.Text>
                        <p className='text-center'>Degradations: {props.context.state.tchtraffic900Degraded}</p>
                        <p className='text-center'>Improvements: {props.context.state.tchtraffic900Improved}</p>
                        <p className='text-center'>Cells Detected: {props.context.state.cellCounts['TchTraffic900']}</p>
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Col>


                    <Col md={4}>
                    <Card>
                    <Card.Header className='text-center'>Drops Ho</Card.Header>
                    <Card.Body>
                        
                        <Card.Text>
                        <p className='text-center'>Degradations: {props.context.state.dropshoDegraded}</p>
                        <p className='text-center'>Improvements: {props.context.state.dropshoImproved}</p>
                        <p className='text-center'>Cells Detected: {props.context.state.cellCounts['DropsHo']}</p>
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Col>


                    <Col md={4}>
                    <Card>
                    <Card.Header className='text-center'>Drops Rf</Card.Header>
                    <Card.Body>
                        
                        <Card.Text>
                        <p className='text-center'>Degradations: {props.context.state.dropsrfDegraded}</p>
                        <p className='text-center'>Improvements: {props.context.state.dropsrfImproved}</p>
                        <p className='text-center'>Cells Detected: {props.context.state.cellCounts['DropsRf']}</p>
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Col>

                    </Row>


                    <Row>
                    <Col md={4}>
                    <Card>
                    <Card.Header className='text-center'>Tch Availability</Card.Header>
                    <Card.Body>
                        
                        <Card.Text>
                        <p className='text-center'>Degradations: {props.context.state.tchavailabilityDegraded}</p>
                        <p className='text-center'>Improvements: {props.context.state.tchavailabilityImproved}</p>
                        <p className='text-center'>Cells Detected: {props.context.state.cellCounts['TchAvailability']}</p>
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Col>


                    <Col md={4}>
                    <Card>
                    <Card.Header className='text-center'>Sdcch Blocking</Card.Header>
                    <Card.Body>
                        
                        <Card.Text>
                        <p className='text-center'>Degradations: {props.context.state.sdcchDegraded}</p>
                        <p className='text-center'>Improvements: {props.context.state.sdcchImproved}</p>
                        <p className='text-center'>Cells Detected: {props.context.state.cellCounts['SdcchBlocking']}</p>
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Col>


                    <Col md={4}>
                    <Card>
                    <Card.Header className='text-center'>Tch Raw Blocking</Card.Header>
                    <Card.Body>
                        
                        <Card.Text>
                        <p className='text-center'>Degradations: {props.context.state.tchrawDegraded}</p>
                        <p className='text-center'>Improvements: {props.context.state.tchrawImproved}</p>
                        <p className='text-center'>Cells Detected: {props.context.state.cellCounts['TchRawBlocking']}</p>
                        </Card.Text>
                    </Card.Body>
                    </Card>
                    </Col>

                    </Row>

            </div>
        )
    }
    return ''
}

export default class Dashboard2 extends Component {


    componentDidUpdate(){
        console.log('Component Dashboard.js got updated!')
    }

    render() {
        return (
            <Context.Consumer>
                {(context) => (
                    <div>
                        <Container>
                            <Measures context={context}/>
                            <Kpis context={context}/>
                        </Container>
                    </div>
                )}
            </Context.Consumer>
        )
    }
}
