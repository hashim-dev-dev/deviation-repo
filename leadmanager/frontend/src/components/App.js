import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class App extends Component {

    // getName(name) {
    //     return name.length
    // }

    displayName(name){
        return name.length
    }

    render() {
        return (
            <div>
                <h1>{12+'how are you doing'}</h1>
                <p>{displayName('hashim')}</p>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))
