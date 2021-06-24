import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Link, Redirect, useParams} from 'react-router-dom'
import Dashboard3 from './Dashboard3'
import Admin from '../layouts/Admin.jsx'


function Home(props){
    return (<div>
        <p>Lets load {props.routes}</p>
    </div>)
}

function About(props){
    return (<div>
        <p>Lets load {props.routes}</p>
    </div>)
}

function Contact(props){
    return (
        <div>
            <p>Lets load {props.routes}</p>
        </div>
    )
}

function withProps(Component, props){
    return function(matchProps){
        return <Component {...props} {...matchProps} />
    }
}

export default class Navigator extends Component {

    renderHomeComponent = (props) => {
        return <Home name={props.name} />
    }

    render() {
        return (
            <Router>
                <div>
                    <nav className>
                        <ul>
                            <li>
                            <Link to='/admin/files' className='btn btn-success'>Customer Complaint Prediction Module</Link>
                            </li>
                            <li>
                            <Link to='/about' className='btn btn-danger' >Kpi Deviation Module</Link>
                            </li>
                            <li>
                            <Link to='/contact' className='btn btn-primary' >Forecasting Module</Link>
                            </li>
                        </ul>
                    </nav>
                    
                    
                    

                <Switch>
                {/* <Route path="/:id" children={<Child />} /> */}
                    <Route path='/admin/files' render={props=> <Admin {...props} />} />
                    <Route path='/about' component={withProps(About, {routes: 'routes for deviation Module'})} />
                    <Route path='/contact' component={withProps(Contact, {routes: 'routes for forecasting Module'})} />
                </Switch>
            </div>
            </Router>
        )
    }
}
