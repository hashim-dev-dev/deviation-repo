import React from 'react'
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';


function getData(context){
  const data = [
    {
      kpi: 'Mpd',
      improved: context.state.mpdImproved,
      degraded: context.state.mpdDegraded
    },
    {
      kpi: 'Tch Traffic',
      improved: context.state.tchtrafficImproved,
      degraded: context.state.tchtrafficDegraded
    },
    {
      kpi: 'Tch Traffic 1800',
      improved: context.state.tchtraffic1800Improved,
      degraded: context.state.tchtraffic1800Degraded
    },
    {
      kpi: 'Tch Traffic 900',
      improved: context.state.tchtraffic900Improved,
      degraded: context.state.tchtraffic900Degraded
    },
    // {
    //   kpi: 'Drops Bss',
    //   improved: context.state.dropsbssImproved,
    //   degraded: context.state.dropsbssDegraded
    // },
    {
      kpi: 'Drops Ho',
      improved: context.state.dropshoImproved,
      degraded: context.state.dropshoDegraded
    },
    {
      kpi: 'Drops Rf',
      improved: context.state.dropsrfImproved,
      degraded: context.state.dropsrfDegraded
    },
    {
      kpi: 'Tch Availability',
      improved: context.state.tchavailabilityImproved,
      degraded: context.state.tchavailabilityDegraded
    },
    {
      kpi: 'Sdcch Blocking',
      improved: context.state.sdcchImproved,
      degraded: context.state.sdcchDegraded
    },
    {
      kpi: 'Tch Raw Blocking',
      improved: context.state.tchrawImproved,
      degraded: context.state.tchrawDegraded 
    }
  ]
  return data
}

export default function DashboardBarPlot(props) {

  const data = getData(props.context)

    return (
        <div>
            <ResponsiveContainer width={'100%'} height={400}>
                <BarChart
                    data={data}
                    margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="kpi" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="improved" stackId='a' fill="#493C3C" />
                    <Bar dataKey="degraded" stackId='a' fill="#3C2727" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
