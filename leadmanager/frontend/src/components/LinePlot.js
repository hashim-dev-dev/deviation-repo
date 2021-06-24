import React from 'react'
import {DateTime} from 'luxon'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer, ReferenceLine
  } from 'recharts';

function timeFormatter(unixTimeStamp){
    return DateTime.fromMillis(unixTimeStamp).toISODate()
  }

export default function LinePlot(props) {
    const Length = props.data.length
    const changePoint = props.changePoint
    const percentage = 100 - ((Length-changePoint-1)/ (Length-1)) * 100

    // Calculate exact percentages for offsets implying appropriate partition of line segment
    
    // const percentage2 = 100 - ((Length-props.changePoint[1]-1)/ (Length-1)) * 100
    // const percentage3 = 100 - ((Length-props.changePoint[2]-1)/ (Length-1)) * 100
    // const percentage4 = 100 - ((Length-props.changePoint[3]-1)/ (Length-1)) * 100

    const CustomToolTip = ({active, payload, label}) => {
        if (active){
            return (
                <div className='custom-tooltip'>
                    <p>Date: {DateTime.fromMillis(label).toISODate()}</p>
                    <p>Value: {payload[0].value}</p>
                </div>
            )
        }
    }
    
    return (
        <div>
            <h4 className='text-center'>Cell Name: <b>{props.title}</b></h4>
            <p className="text-center">Change Point Detection at date: <b>{props.date}</b></p>
            <ResponsiveContainer width={'100%'} height={400}>
            <LineChart
                data={props.data}
                margin={{
                top: 5, right: 30, left: 20, bottom: 20,
                }}
            >
                {/* <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
                        <stop offset="0%" stopColor="red" />
                        <stop offset={`${percentage}%`} stopColor="red" />
                        <stop offset={`${percentage}%`} stopColor="blue" />
                        <stop offset="100%" stopColor="blue" />
                    </linearGradient>
                </defs> */}
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                {/* The below also works for giving a range of maximum and minimum time */}
                {/* domain={plotData[0].time, plotData[plotData.length-1].time} */}
                <XAxis dataKey="date" type='number' domain={["dataMin", "dataMax"]} tickFormatter={timeFormatter} >
                    <Label 
                    value={"Time"}
                    position="bottom"
                    style={{ textAnchor: "middle" }}
                    />
                </XAxis>
                <YAxis>
                    <Label
                    value={props.label}
                    position="left"
                    angle={-90}
                    style={{ textAnchor: "middle" }}
                    />
                </YAxis>
                <Tooltip content={CustomToolTip} />
                {/* you can add information for tool here, like the unit and name */}
                <Line type="monotone" dataKey="mpd" name={props.label} type={'natural'} /> 
                {/* stroke='url(#gradient)'  */}
                <ReferenceLine x={props.data[props.changePoint].date} stroke='black' label='Change Point' style={{color: 'black'}}/>
            </LineChart>
        </ResponsiveContainer>
        </div>
    )
}
