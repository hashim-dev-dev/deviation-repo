// React imports
import React, { Component } from 'react'

// Context object imports
import {Context} from '../Context/DataProvider'

// React bootstrap imports
import {Table, Container, Row, Col} from 'react-bootstrap'


import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts'
import ReactHtmlTableToExcel from 'react-html-table-to-excel'


// respective colours for the pie chart in order to differentiate data
const COLORS = ['#0088FE', '#00C49F'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};








// function based component to render tabular information
function DataTable(props){
    //className='my-5'
    return (
        <Table striped bordered hover variant='dark' size='sm' >
            <thead> 
                <tr>
                    <th>Total Cells Analyzed</th>
                    <th>Expansions Current</th>
                    <th>Expansions Forecasted</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{props.context.state.cellsAnalyzed}</td>
                    <td>{props.context.state.currentExpansions}</td>
                    <td>{props.context.state.forecastedExpansions}</td>
                </tr>
            </tbody>
        </Table>
    )
}


// functional component for rendering Pie chart
function MyPieChart(props){
    if (props.context.state.cellsAnalyzed){
        const data = [
            { name: 'Current Expansions', value: props.context.state.currentExpansions },
            { name: 'Forecasted Expansions', value: props.context.state.forecastedExpansions }
        ]
        console.log('just before return of MyPieChart functional component!')
        return (
            <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        </PieChart>
                    </ResponsiveContainer>
        )
    }
    return 'Pie Chart Not loaded!'
    
}

function TabularExport(props){
    if (props.context.state.cells){
        const cells_ = props.context.state.cells
        const current_ = props.context.state.current
        const first_ = props.context.state.first
        const tableData = []
        for (var i=0; i<cells_.length; i++){
            tableData.push(
                <tr>
                <td>{cells_[i]}</td>
                <td>{current_[i]}</td>
                <td>{first_[i]}</td>
            </tr>
            )
        }
        console.log(tableData)
        return (
            <div>
                <Row>

                    {/* <Col md={12} sm={12}>
                        <h3>Data Loaded!</h3>
                    </Col> */}

                    <Col md={12} sm={12} >
                    <ReactHtmlTableToExcel 
                        className='btn btn-info mx-0 my-0'
                        table='table'
                        filename='Expansions'
                        sheet='Sheet'
                        buttonText='Export Excel'
                        //style = {{margin: '5px'}}
                        />
                    <Table striped bordered hover variant="dark" id='table'>
                        <thead style={{display: 'none'}}>
                            <tr>
                                <th>Cell Id</th>
                                <th>Current Expansions</th>
                                <th>Forecasted Expansions</th>
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
    return 'Cells Not Loaded Yet!'
}

export default class Dashboard3 extends Component {
    render() {
        return (
            <Context.Consumer>
                {(context) => (
                    <Container>
                        <h3 className='text-center'>Forecasting Expansions</h3>
                        <TabularExport context={context} />
                        <DataTable context={context} />
                        <MyPieChart context={context} />
                    </Container>
                )}
            </Context.Consumer>
        )
    }
}
