import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  ProgressBar,
  Form,
  Spinner
} from "react-bootstrap";
import { Card } from "../components/Card/Card.jsx";
import Button from "../components/CustomButton/CustomButton.jsx";
import { Context } from '../Context/MpdProvider'
import axios from 'axios'


//import avatar from "../assets/img/faces/face-3.jpg";

// function ShowCard(props){
//   var now =0
//   if (props.showspinner == true){
//     return (
//       <Card
//       title = "Please Wait...The Kpis might take a minute to load appropriately!"
//       content = {
//         <Spinner animation="grow" />
//       }
//     />
//     )
//   }
//   else{
//     return (
//       <Card
//         title = "No File Selected Yet."
//         content = {
//           <ProgressBar animated now={now} label={`${now}%`}/>
//         }
//       />
//     )
//   }
// }

class Form2 extends Component {

  // you can easily get the values of which element called by (e.target.name)
  // date structure => (year/month/day)
  state = {
    datefrom: "",
    dateto: "",
    bsc: "",
    baseStationControllers: []
  }

  renderBaseControllers = (controllers) => {
    var controllersArray = []
    if (controllers) {
      for (var controller of controllers) {
        controllersArray.push(
          <option>{controller}</option>
        )
      }
    }
    else {
      controllersArray.push(
        <option>Select date intervals!</option>
      )
    }
    return controllersArray
  }

  getBaseStationControllers = () => {
    console.log('sending request fro bscs....')
    // headers of axios http get request
    const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    axios.get('/performance/bsc', {
      params: {
        datefrom: this.state.datefrom,
        dateto: this.state.dateto
      }
    }, options).then(
      response => {
        console.log(response.data.Controllers)
        this.setState({
          baseStationControllers: response.data.Controllers
        })
      }
    )
  }


  // changing state based on form fields, simple and easy!
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })

    // render Base Station Controllers on dates
    if (e.target.name == 'dateto') {
      this.getBaseStationControllers()
      console.log('got bscs...')
    }
  }


  render() {
    return (
      <div className="content">
        <Context.Consumer>
          {(context) => (
            <Container >
              <Row>
                <Col md={8}>
                  <Card
                    title="File Selection Form"
                    content={
                      <Form onSubmit={context.handleForm}>

                        <Row>
                          <div className='col-md-6'>
                            <Form.Group controlId="formDateFrom">
                              <Form.Label>From</Form.Label>
                              <Form.Control type="date" onChange={this.onChange} name='datefrom' value={this.state.datefrom} />
                            </Form.Group>
                          </div>


                          <div className='col-md-6'>
                            <Form.Group controlId="formDateTo">
                              <Form.Label>To</Form.Label>
                              <Form.Control type="date" onChange={this.onChange} name='dateto' value={this.state.dateto} />
                            </Form.Group>
                          </div>
                        </Row>

                        <Row>
                          <div className='col-md-12'>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                              <Form.Label>Bsc (Sub-Network)</Form.Label>
                              <Form.Control as="select" onChange={this.onChange} name='bsc' value={this.state.bsc} >
                                {this.renderBaseControllers(this.state.baseStationControllers)}
                              </Form.Control>
                            </Form.Group>
                          </div>
                        </Row>

                        <Button pullRight fill type="submit" variant="primary">
                          Import Files
                        </Button>

                      </Form >
                    }
                  />
                </Col>
              </Row>
            </Container>
          )}
        </Context.Consumer>
      </div>
    );
  }
}

export default Form2;
