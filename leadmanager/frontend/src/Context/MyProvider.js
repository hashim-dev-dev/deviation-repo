import React, { Component } from 'react'
import Dashboard from '../views/Dashboard.jsx'
import ManageFilesForm from '../views/ManageFilesForm.jsx'
import Form2 from '../views/Form2'
import Mpd from '../views/Mpd'
import axios from 'axios'
import {Switch, Route, withRouter} from 'react-router-dom'

export const MContext = React.createContext()

class MyProvider extends Component {

    state = {
        dataRegion: null,
        dataStatus: null, 
        dataAffectedItem: null,
        dataDuration: null,
        dataErrorResponse: null,
        predictions: null,
        sites: null,
        showspinner: false
    }

    handle = e => {
        e.preventDefault()
        this.setState({
          showspinner: true
        })

        // get data for visualizations
        axios.get('/files/data').then(
            response => {
                this.setState({
                    dataRegion: response.data.DataRegion,
                    dataStatus: response.data.DataStatus,
                    dataAffectedItem: response.data.DataAffectedItem,
                    dataDuration: response.data.DataDuration,
                    dataErrorResponse: response.data.DataErrorResponse 
                })
                console.log(this.state)
            }
        ).catch(
            err => {
                console.log(err => {
                    console.log(err)
                })
            }
        )

        // run model and get its response
        const options = {
            headers: {
              "Content-Type": "application/json"
            }
          }
          axios.get('/files/model', {
            params: {
              datefrom: e.target[0].value,
              dateto: e.target[1].value
              //region: e.target[2].value,
              //city: e.target[3].value
            }
          }, options).then(
            response => {
              console.log('passed through here...')
                this.setState({
                  predictions: response.data.Predictions,
                  sites: response.data.Sites
                })
                this.props.history.push('/admin/dashboard')
            }
          ).catch(
            err => {
              console.log(err => {
                console.log(err)
              })
            }
          )

        console.log(this.state)
        
    }

    render() {
        return (
            <MContext.Provider value={
                {
                    state: this.state,
                    handleForm: this.handle
                }
            }>
                
            <Switch>
              <Route path="/admin/dashboard" component={Dashboard} />
              <Route path="/admin/files" component={ManageFilesForm} />
            </Switch>
            </MContext.Provider>
        )
    }
}

export default withRouter(MyProvider)