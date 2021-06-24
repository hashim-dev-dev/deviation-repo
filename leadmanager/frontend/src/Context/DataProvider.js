// React imports
import React, { Component } from 'react'
import {Route, Switch, withRouter} from 'react-router-dom'

// Custom React component imports
import Dashboard3 from '../views/Dashboard3'
import FileForm from '../views/FileForm'

// Js Module imports
import axios from 'axios'

// creating context object
export const Context = React.createContext()


// creating class based component which passes context object into sibling components
class DataProvider extends Component {

    state = {
        currentExpansions: null,
        forecastedExpansions: null,
        cellsAnalyzed: null,
        current: null,
        first: null,
        cells: null,
        message: "One of the beutiful dashboards I've ever seen!"
    }

    handle = (e) => {
        e.preventDefault()

        // making a get request to '/forecast/api by axios'
        // the api at the backend will generate a output file
        // we will need certain measures from the output file
        // Simple and easy!

        const options = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        axios.get('/forecast/api', options).then(
            response => {
                this.setState({
                    cellsAnalyzed: response.data.Cells_Analyzed,
                    currentExpansions: response.data.Current_Expansions,
                    forecastedExpansions: response.data.Forecasted_Expansions,
                    current: response.data.Expansions_current,
                    first: response.data.Expansions_first,
                    cells: response.data.Cells
                })
                console.log(this.state)
                this.props.history.push('/admin/dashboard')
            }
        )

        console.log('Did this console log or not?')
    }

    render() {
        return (
            <Context.Provider value={{
                state: this.state,
                handleForm: this.handle
            }}>

                <Switch>
                    <Route path='/admin/dashboard' component={Dashboard3} />
                    <Route path='/admin/files' component ={FileForm} />
                </Switch>

            </Context.Provider>
        )
    }
}

export default withRouter(DataProvider)