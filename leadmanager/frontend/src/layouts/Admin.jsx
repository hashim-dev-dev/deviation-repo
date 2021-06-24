import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
//import NotificationSystem from "react-notification-system";

import AdminNavbar from '../components/Navbars/AdminNavbar.jsx'
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Footer from "../components/Footer/Footer.jsx"

//import { style } from ".variables/Variables.jsx";

import routes from '../routes'
import image from "../../../assets/sidebar-2.jpg"
//import {MyProvider} from '../Context/MyProvider'
//import MyProvider from "../Context/MyProvider.js";
import MpdProvider from '../Context/MpdProvider'
import MyProvider from '../Context/MyProvider'

import Dashboard3 from '../views/Dashboard3'
import FileForm from '../views/FileForm'

class Admin extends Component {
  constructor(props) {
    super(props);

    // State of this component
    this.state = {
      //_notificationSystem: null,
      image: image,
      color: "black",
      hasImage: true,
      fixedClasses: "dropdown show-dropdown open"
    };
  }

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
              //handleClick={this.handleNotificationClick}
              />
            )}
            //component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  //  this method is not being used
  handleImageClick = image => {
    this.setState({ image: image });
  };
  // this method is not being used
  handleColorClick = color => {
    this.setState({ color: color });
  };
  // this method is not being used
  handleHasImage = hasImage => {
    this.setState({ hasImage: hasImage });
  };
  // this method is not being used
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
    return (
      <div className="wrapper">
        {/* <NotificationSystem ref="notificationSystem" style={style} /> */}
        <Sidebar {...this.props} routes={routes}
          image={this.state.image}
          color={this.state.color}
          hasImage={this.state.hasImage}
        />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          {/* <MpdProvider>

          </MpdProvider> */}

          {/* <Switch>
              <Route path="/admin/dashboard" component={Dashboard3} />
              <Route path="/admin/files" component={FileForm} />
            </Switch>
             */}

          <MpdProvider>

          </MpdProvider>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Admin;
