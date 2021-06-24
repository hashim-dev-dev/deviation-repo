import React, { Component } from "react";
import { Container } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Container>
          <nav className="pull-left">
            <ul>
              <li>
                <a href="http://www.quartez.com.au/contact">Contact Us</a>
              </li>
            </ul>
          </nav>
          <p className="copyright pull-right">
            &copy; {new Date().getFullYear()}{" "}
            <a href="http://www.quartez.com.au">
              Quartez Business Solutions
            </a>
            
          </p>
        </Container>
      </footer>
    );
  }
}

export default Footer;
