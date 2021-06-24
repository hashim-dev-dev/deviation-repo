import React from 'react'
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';


// calculates average before and after the change point was detection in the series
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


// Functional component that return the bar plot 
// It takes data array, change point index and title as properties
export default function BarPlot(props) {

    // calculate average before and after the detected change point
    const averages = calculateAverage(props.changePoint, props.data)
    const dataArray = [
        {
            name: 'Averages', before: averages[0], after: averages[1]
        }
    ]

    // customized tooltip information that must be rendered when hovered over bar plot
    const CustomToolTip = ({active, payload, label}) => {
        if (active){
            return (
                <div className='custom-tooltip'>
                    <p>{label}</p>
                    <p>Before: {Math.trunc(payload[0].value)}</p>
                    <p>After: {Math.trunc(payload[1].value)}</p>
                </div>
            )
        }
    }
    return (
        <div>
            <h4 style={averages[0]> averages[1] ? {color: 'red'}: {color: 'green'}}>{ averages[0] > averages[1] ? 'Recently Decreasing' : 'Recently Increasing' }</h4>
            <p>{props.title}</p>
            <ResponsiveContainer width={'100%'} height={400}>
                <BarChart
                    data={dataArray}
                    margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={CustomToolTip}/>
                    <Legend />
                    <Bar dataKey="before" fill="red" />
                    <Bar dataKey="after" fill="blue" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
