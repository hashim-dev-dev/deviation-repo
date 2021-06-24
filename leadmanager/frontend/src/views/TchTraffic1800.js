import React, { Component, useState } from 'react'
import {Container, Tabs, Tab, Row, Col, Form, Nav} from 'react-bootstrap'

import LinePlot from '../components/LinePlot'
import BarPlot from '../components/BarPlot'

// luxon for converting Dates into appropriate format
import {DateTime} from 'luxon'

// importing context object in order to consume data in the component from (MpdProvider.js)
import {Context} from '../Context/MpdProvider'
// import context from 'react-bootstrap/esm/AccordionContext'


// calculating average of a cell values before and after the change point
function calculateAverage(changePoint, data){
  var sumBefore = 0
  var sumAfter = 0
  var count = 0
  var averageBefore = 0
  var averageAfter = 0
  // loop through values before the detected change point
  for (var i=0; i < changePoint; i++){
      sumBefore = data[i].mpd + sumBefore
      count = count + 1
  }
  averageBefore = sumBefore/count
  count = 0
  // loop through values after the detected change point
  for (var i=changePoint; i < data.length ; i++){
      sumAfter = data[i].mpd + sumAfter
      count = count + 1
  }
  averageAfter = sumAfter/count
  return [averageBefore, averageAfter]
}

// merges dates and values, called in functional Component, ShowPlot
function formatData(dates, cellValues){
  const dataArray = [];
  for (var values of cellValues) {
    const data_ = [];
    for (var i = 0; i < values.length; i++) {
      const myObject = {
        date: DateTime.fromISO(dates[i]).ts,
        mpd: values[i],
      };
      data_.push(myObject);
    }
    dataArray.push(data_);
      }
  return dataArray
}

function ShowPlots(props){
  const plots = []
  const modifiedDataset = []
  const modifiedChangePoints = []
  const modifiedTitles = []
  const dates = props.context.state.dates

  
  
  
  if (props.context.state.data){

    // context object declarations
    const cellNames = props.context.state.data['TCH_TRAFFIC_1800']['Cell_Names']
    const cellValues = props.context.state.data['TCH_TRAFFIC_1800']['Cell_Values']
    const changePoints = props.context.state.data['TCH_TRAFFIC_1800']['Change_Points']

    // merge dates with evey kpi cell level values, i.e dates = [...], values = [[...], [...]]
    const dataset = formatData(dates, cellValues)
    if (props.type == 'improved'){
      // extract arrays which average more after change points index
      for (var i=0; i<dataset.length; i++){
        const averages = calculateAverage(changePoints[i] ,dataset[i])
        if (averages[0] < averages[1]){
          modifiedDataset.push(dataset[i])
          modifiedChangePoints.push(changePoints[i])
          modifiedTitles.push(cellNames[i])
        }
      }
    }
    else if (props.type == 'degraded'){
      // extract arrays which average less after change point index
      for (var i=0; i<dataset.length; i++){
        const averages = calculateAverage(changePoints[i] ,dataset[i])
        if (averages[0] > averages[1]){
          modifiedDataset.push(dataset[i])
          modifiedChangePoints.push(changePoints[i])
          modifiedTitles.push(cellNames[i])
        }
      }
    }
    



    // be careful with this.... just modified it now...
    for (var i = 0; i < modifiedDataset.length; i++){
      plots.push(
        <div className='my-4'>
          <Row>
            <Col md={9}>
              <LinePlot title={modifiedTitles[i]} date={props.context.state.dates[modifiedChangePoints[i]]} data={modifiedDataset[i]} changePoint={modifiedChangePoints[i]} label={'Tch Traffic 1800'} />
            </Col>
            <Col md={3}>
              <BarPlot title={modifiedTitles[i]} data={modifiedDataset[i]} changePoint={modifiedChangePoints[i]} />
            </Col>
          </Row>
          
        </div>
      )
    }
  }
  else{
    console.log('No data yet!')
  }
  return plots
}

function ControlledTabs(props) {
  const [key, setKey] = useState('improved');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="improved" title="Improved Cells">
        <ShowPlots context={props.context} type='improved' />
      </Tab>
      <Tab eventKey="degraded" title="Degraded Cells">
        <ShowPlots context={props.context} type='degraded' />
      </Tab>
    </Tabs>
  );
}


// class based component which is rendered in (MpdProvider.js) through route in (Admin.jsx)
export default class Mpd extends Component {
    render() {

        return (
          <Context.Consumer>
            {(context) => (
              <Container>
                <h2 className='text-center'>Cells detected with Change Points</h2>
                {/* <ShowPlots context={context} /> */}
                <ControlledTabs context={context} />
              </Container>
            )}
          </Context.Consumer>
        )
    }
}
