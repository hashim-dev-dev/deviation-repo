import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navigator from './views/Navigator'
//import { matchRoutes, renderRoutes } from "react-router-config";

//import {matchRoutes} from 'react-router-config'

// not using an ES6 transpiler
//matchRoutes = require("react-router-config").matchRoutes;


import "bootstrap/dist/css/bootstrap.min.css"; // done

import "../../assets/animate.min.css" // done
import "../../assets/pe-icon-7-stroke.css" // done
import "../../assets/light-bootstrap-dashboard-react.min.css" // done
import "../../assets/demo.css" // done
import "../../assets/light-bootstrap-dashboard-react.css" // done
import "../../assets/sass/light-bootstrap-dashboard-react.scss" // done

// if (process.env.BROWSER) {
//   require("./assets/css/animated.min.css");
// }


import Admin from './layouts/Admin.jsx'

ReactDOM.render(
    <BrowserRouter>
    <Switch>
      {/* <Route path="/admin/dashboard" render={props => <Admin {...props} />} /> */}
      <Route path="/admin" component={Admin}/>
      <Redirect from="/" to="/admin/files" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("app")
);