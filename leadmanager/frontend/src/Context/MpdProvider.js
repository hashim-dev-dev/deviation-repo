// importing react
import React, { Component } from 'react'

// importing stuff necessary for handling routes in Provider
import {Switch, Route, withRouter} from 'react-router-dom'

// importing axios for requesting data from backend
import axios from 'axios'

// importing component which share data
import Form2 from '../views/Form2'
import Mpd from '../views/Mpd'
import TchTraffic from '../views/TchTraffic'
import TchTraffic1800 from '../views/TchTraffic1800'
import TchTraffic900 from '../views/TchTraffic900'
// import DropsBss from '../views/DropsBss'
import DropsHo from '../views/DropsHo'
import DropsRf from '../views/DropsRf'
import TchAvailability from '../views/TchAvailability'
import SdcchBlocking from '../views/SdcchBlocking'
import TchRawBlocking from '../views/TchRawBlocking'
import Dashboard2 from '../views/Dashboard2'

// creating the context api
export const Context = React.createContext()

function calculateAverage(changePoint, data){
    var sumBefore = 0
    var sumAfter = 0
    var count = 0
    var averageBefore = 0
    var averageAfter = 0
    // loop through values before the detected change point
    for (var i=0; i < changePoint; i++){
        sumBefore = data[i] + sumBefore
        count = count + 1
    }
    averageBefore = sumBefore/count
    count = 0
    // loop through values after the detected change point
    for (var i=changePoint; i < data.length ; i++){
        sumAfter = data[i] + sumAfter
        count = count + 1
    }
    averageAfter = sumAfter/count
    return [averageBefore, averageAfter]
  }

// creating a class based component which Provides data to other component using Context Api
class MpdProvider extends Component {

    // here you can save data that the apis respond with.. Basically kpi data to visualize
    state = {
        message: 'the message is to stop everything right now...',
        data: null,
        dates: null,
        totalCells: null,
        detectedCells: null, 
        cellCounts: null,
        
        // mpd counts
        mpdImproved: null,
        mpdDegraded: null,

        // tch traffic counts
        tchtrafficImproved: null,
        tchtrafficDegraded: null,

        // tch traffic 1800 counts
        tchtraffic1800Improved: null,
        tchtraffic1800Degraded: null,

        // tch traffic 900 counts
        tchtraffic900Improved: null,
        tchtraffic900Degraded: null,

        // drops bss counts
        // dropsbssImproved: null,
        // dropsbssDegraded: null,

        // drops ho counts
        dropshoImproved: null,
        dropshoDegraded: null,
 
        // drops rf counts
        dropsrfImproved: null,
        dropsrfDegraded: null,
        
        // tch availability counts
        tchavailabilityImproved: null,
        tchavailabilityDegraded: null,

        // sdcch blocking counts
        sdcchImproved: null,
        sdcchDegraded: null,

        // tch raw blocking counts
        tchrawImproved: null,
        tchrawDegraded: null
    }

    determineMeasures = (data) => {
        console.log('From determineMeasures method, object length:', Object.keys(data).length)

        for (var kpi in data){
            var improvedCounts = 0
            var degradedCounts = 0
            for (var i=0; i<data[kpi]['Cell_Values'].length; i++){
                const averages = calculateAverage(data[kpi]['Change_Points'][i], data[kpi]['Cell_Values'][i])
                if (averages[0] < averages[1]){
                    improvedCounts = improvedCounts + 1
                }
                else if (averages[0] > averages[1]){
                    degradedCounts = degradedCounts + 1
                }
                else{
                  improvedCounts = improvedCounts + 1
                }
            }
            if (kpi == 'MPD'){
                if (this.state.mpdImproved == null){
                  this.setState({
                    mpdImproved: improvedCounts,
                    mpdDegraded: degradedCounts
                  })
                }
              }

              else if (kpi == 'TCH_TRAFFIC'){
                if (this.state.tchtrafficImproved == null){
                  this.setState({
                    tchtrafficImproved: improvedCounts,
                    tchtrafficDegraded: degradedCounts
                  })
                }
              }

              else if (kpi == 'TCH_TRAFFIC_1800'){
                if (this.state.tchtraffic1800Improved == null){
                  this.setState({
                    tchtraffic1800Improved: improvedCounts,
                    tchtraffic1800Degraded: degradedCounts
                  })
                }
              }

              else if (kpi == 'TCH_TRAFFIC_900'){
                if (this.state.tchtraffic900Improved == null){
                  this.setState({
                    tchtraffic900Improved: improvedCounts,
                    tchtraffic900Degraded: degradedCounts
                  })
                }
              }

              // else if (kpi == 'DROPS_BSS'){
              //   if (this.state.dropsbssImproved == null){
              //     this.setState({
              //       dropsbssImproved: degradedCounts,
              //       dropsbssDegraded: improvedCounts
              //     })
              //   }
              // }

              else if (kpi == 'DROPS_HO'){
                if (this.state.dropshoImproved == null){
                  this.setState({
                    dropshoImproved: degradedCounts,
                    dropshoDegraded: improvedCounts
                  })
                }
              }

              else if (kpi == 'DROPS_RF'){
                if (this.state.dropsrfImproved == null){
                  this.setState({
                    dropsrfImproved: degradedCounts,
                    dropsrfDegraded: improvedCounts
                  })
                }
              }

              else if (kpi == 'TCH_AVAILABILITY'){
                if (this.state.tchavailabilityImproved == null){
                  this.setState({
                    tchavailabilityImproved: improvedCounts,
                    tchavailabilityDegraded: degradedCounts
                  })
                }
              }

              else if (kpi == 'SDCCH_BLOCKING'){
                if (this.state.sdcchImproved == null){
                  this.setState({
                    sdcchImproved: degradedCounts,
                    sdcchDegraded: improvedCounts
                  })
                }
              }

              else if (kpi == 'TCH_RAW_BLOCKING'){
                if (this.state.tchrawImproved == null){
                  this.setState({
                    tchrawImproved: degradedCounts,
                    tchrawDegraded: improvedCounts
                  })
                }
              }
          }
          console.log(this.state)
        }
    

    // handling submit request from the form
    handle = e => {
        e.preventDefault()
        console.log('Sending request for fetching data...')
        const datefrom = e.target[0].value
        const dateto = e.target[1].value
        const bsc = e.target[2].value

        // send get request to 'performance/data' to populate your plots at the frontend
        const options = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        axios.get('/performance/data', {
            params: {
                datefrom: datefrom,
                dateto: dateto,
                bsc: bsc
            }
        }, options).then(
            response => {
                this.setState({
                    data: response.data.Data,
                    dates: response.data.Dates,
                    totalCells: response.data.Total_Cells, 
                    detectedCells: response.data.CellsWithChangePoints,
                    cellCounts: response.data.detectedCellsCount
                })
                console.log(this.state)
                this.determineMeasures(this.state.data)
                this.props.history.push('/admin/mpd')
            }
        )
    }

    
    render() {
        return (
            <Context.Provider value={
                {
                    state: this.state,
                    handleForm: this.handle
                }
            }>
                <Switch>
                    <Route path="/admin/dashboard" component={Dashboard2} />
                    <Route path="/admin/files" component={Form2} />
                    <Route path="/admin/mpd" component={Mpd} />
                    <Route path="/admin/tchtraffic" component={TchTraffic} />
                    <Route path="/admin/tch_1800" component={TchTraffic1800} />
                    
                    <Route path="/admin/tch_900" component={TchTraffic900} />
                    {/* <Route path="/admin/bss" component={DropsBss} /> */}
                    <Route path="/admin/ho" component={DropsHo} />
                    <Route path="/admin/rf" component={DropsRf} />
                    <Route path="/admin/availability" component={TchAvailability} />
                    {/* <Route path="/admin/sdcch_blocking" component={SdcchBlocking} /> */}
                    <Route path="/admin/raw_blocking" component={TchRawBlocking} />
                </Switch>
            </Context.Provider>
        )
    }
}

export default withRouter(MpdProvider)
