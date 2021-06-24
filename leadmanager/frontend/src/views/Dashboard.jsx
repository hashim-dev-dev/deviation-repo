import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Container , Row, Col, Table, Button} from "react-bootstrap";

import ReactHtmlTableToExcel from 'react-html-table-to-excel'

import { Card } from "../components/Card/Card.jsx";
import { StatsCard } from "../components/StatsCard/StatsCard.jsx";
import { Tasks } from "../components/Tasks/Tasks.jsx";

import {MContext} from '../Context/MyProvider'

import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';

import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "../variables/Variables.jsx";


function ModelPredictions(props){
  if (props.predictions){
    const predictions = props.predictions
    const sites = props.sites
    var countComplaints = 0
    var countNoComplaints = 0
    const tableData = []
  for(var i = 0; i < predictions.length; i++){
      if(predictions[i] == 1.0)
          countComplaints++;
  }
  for(var i = 0; i < predictions.length; i++){
    if(predictions[i] == 0.0)
        countNoComplaints++;
}
  for (var i = 0; i< predictions.length; i++){
    tableData.push(
      <tr>
        <td>{sites[i]}</td>
        <td>{predictions[i]}</td>
      </tr>
    )
  }
    return (
 
      <div>
        <Row>
          <Col md={12} sm={12}>
          <h4 className="text-success text-center">Kpis Loaded!</h4>
          </Col>

          <Col md={12} sm={12}>
          <Table striped bordered hover variant="dark" responsive>
        <thead>
          <tr>
            <th>Complaints Predicted</th>
            <th>No Complaints Predicted</th>
            <th>Total Sites</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{countComplaints}</td>
            <td>{countNoComplaints}</td>
            <td>{predictions.length}</td>
          </tr>
        </tbody>
      </Table>
      <ReactHtmlTableToExcel 
      className='btn btn-info mx-0 my-0'
      table='table'
      filename='SitesExcel'
      sheet='Sheet'
      buttonText='Export Excel'
      style = {{margin: '5px'}}
      />
      <Table striped bordered hover variant="dark" id='table'>
        <thead style={{display: 'none'}}>
          <tr>
            <th>Site Name</th>
            <th>Prediction</th>
          </tr>
        </thead>
        <tbody style= {{display: 'none', overflow: 'auto', height: '200px', width: '200px'}}>
          {tableData}
        </tbody>
      </Table>
          </Col>
        </Row>
      </div>
    )
  }
  else{
    return (
      <div>
        <Row>
          <Col md={12} sm={12}>
          <h4 className="text-danger text-center">Kpis haven't been selected or perhaps not loaded yet!</h4>
          </Col>

          <Col md={12} sm={12}>
          <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Complaints Predicted</th>
            <th>No Complaints Predicted</th>
            <th>Total Sites</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Null</td>
            <td>Null</td>
            <td>Null</td>
          </tr>
        </tbody>
      </Table>
          </Col>
        </Row>
      </div>
    )
  }
}

function ComplaintAffectedItemBarPlot(props){
  if (props.context.state.dataAffectedItem){
    return (
      <div>
        <h3>Affected Item</h3>
        <BarChart
    width={750}
    height={300}
    data={props.context.state.dataAffectedItem}
    margin={{
      top: 5, right: 30, left: 20, bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="affected_item" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="count" fill="#808080" />
    {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
  </BarChart>
      </div>
    )
  }
  else{
    console.log('no data right now!')
    return ''
  }
}

function ComplaintDurationBarPlot(props){
  if (props.context.state.dataDuration){
    return (
      <div>
        <h3>Complaints Resolved within Duration</h3>
        <BarChart
    width={750}
    height={300}
    data={props.context.state.dataDuration}
    margin={{
      top: 5, right: 30, left: 20, bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="duration" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="count" fill="#808080" />
    {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
  </BarChart>
      </div>
    
    )
  }
  else{
    console.log('no data right now!')
    return ''
  }
}

function ComplaintErrorResponseBarPlot(props){
  if (props.context.state.dataErrorResponse){
    return (
    <div>
      <h3>Issue Type</h3>
      <BarChart 
    width={750}
    height={300}
    data={props.context.state.dataErrorResponse}
    margin={{
      top: 5, right: 30, left: 20, bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="error_response" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="count" fill="#808080" />
    {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
  </BarChart>
    )
    </div>
    )
  }
  else{
    console.log('no data right now!')
    return ''
  }
}

function ComplaintStatusBarPlot(props){
  if (props.context.state.dataStatus){
    return (
      <div>
        <h3>Complaint Status</h3>
        <BarChart
    title="Overall Complaint Status"
    width={750}
    height={300}
    data={props.context.state.dataStatus}
    margin={{
      top: 5, right: 30, left: 20, bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="status" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="count" fill="#808080" />
    {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
  </BarChart>
      </div>
    )
  }
  else{
    console.log('no data right now!')
    return ''
  }
}


function ComplaintRegionBarPlot(props){
  if (props.context.state.dataRegion){
    return (
      <div>
        <h3>Complaints On Regional Level</h3>
        <BarChart
    width={750}
    height={300}
    data={props.context.state.dataRegion}
    margin={{
      top: 5, right: 30, left: 20, bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="region" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="count" fill="#808080" />
  </BarChart>
      </div>
    )
  }
  else{
    console.log('no data right now!')
    return ''
  }
}

class Dashboard extends Component {

  state = {
    data: null
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
    return (
      <div className="content">
        <MContext.Consumer>
        {(context) => (
          <Container>       

            <Row>
            <Col md={12}>
              <ModelPredictions predictions={context.state.predictions} sites={context.state.sites} />
            </Col>
            </Row>     
            <Row>
              <Col md={6} sm={6}>
              <ComplaintRegionBarPlot context={context} />
              </Col>
              </Row>
              <Row>
              <Col md={6} sm={6}>
              <ComplaintStatusBarPlot context={context} />
              </Col>
              </Row>
              <Row>
              
              <Col md={6} sm={6}>
              <ComplaintDurationBarPlot context={context} />
              </Col>
              </Row>
              <Row>
              <Col md={6} sm={6}>
              <ComplaintErrorResponseBarPlot context={context} />
              </Col>
              </Row>
              <Row>
              <Col md={6} sm={6}>
              <ComplaintAffectedItemBarPlot context={context} />
              </Col>
            </Row>
          
            <Row>
            <Col md={12}>
              {/*  */}
              
            </Col>
          </Row>

          {/* Our tableau viz */}
          <Row>

            <Col md={12}>
              <div>
                <h2>Tableau Viz</h2>
                <iframe src="https://public.tableau.com/views/dummy_viz/Sheet1?:showVizHome=no&:embed=true"
 width="800" height="400"></iframe></div>
            </Col>
          </Row>

          
        </Container>
        )}
        </MContext.Consumer>
      </div>
    );
  }
}

export default Dashboard;
