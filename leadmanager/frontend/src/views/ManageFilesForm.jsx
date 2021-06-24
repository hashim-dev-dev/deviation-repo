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
import { FormInputs } from "../components/FormInputs/FormInputs.jsx";
import { UserCard } from "../components/UserCard/UserCard.jsx";
import Button from "../components/CustomButton/CustomButton.jsx";
import axios from 'axios'
import { Redirect, useHistory } from "react-router-dom";
import {MContext} from '../Context/MyProvider'


//import avatar from "../assets/img/faces/face-3.jpg";

function ShowCard(props){
  var now =0
  if (props.showspinner == true){
    return (
      <Card
      title = "Please Wait...The Kpis might take a minute to load appropriately!"
      content = {
        <Spinner animation="grow" />
      }
    />
    )
  }
  else{
    return (
      <Card
        title = "No File Selected Yet."
        content = {
          <ProgressBar animated now={now} label={`${now}%`}/>
        }
      />
    )
  }
}

class ManageFilesForm extends Component {

  // you can easily get the values of which element called by (e.target.name)
  // date structure => (year/month/day)
  state = {
    datefrom: "",
    dateto: "",
    region: "select",
    city: "select",
    cell: "select",

    // arrays for populating
    regions: [],
    cities: [],
    cells: []
  }


  renderRegions = (regions) => {
    const regionItems = regions.map((region, index) =>
    <option key={index}>
    {region}
    </option>
    );
    return regionItems
  }

  renderCities = (cities) => {
    const cityItems = cities.map((city, index) =>
  // Only do this if items have no stable IDs
    <option key={index}>
      {city}
    </option>
    );
  return cityItems
  }

  renderCells = (cells) => {
    const cellItems = cells.map((cell, index) =>
    <option key={index}>
      {cell}
    </option>
    );
  return cellItems
  }


  on_submit = e => {
    //const params = new URLSearchParams([['dateto': this.state.dateto, ]])
    e.preventDefault()
    this.props.history.push('/admin/dashboard')
  }

  sendRequestDates = () => {
    const options = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    axios.get('/files/date', {
      params: {
        dateto: this.state.dateto[0],
        datefrom: this.state.datefrom[0]
      }
    }, options).then(
      response => {
        this.setState({
          regions: response.data.Regions
        })

      }
    ).catch(
      err => {
        console.log(err => {
          console.log(err)
        })
      }
    )
  }

  sendRequestRegions = () => {
    console.log('request to files/region')
      const options = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      axios.get('/files/region', {
        params: {
          dateto: this.state.dateto[0],
          datefrom: this.state.datefrom[0],
          region: this.state.region[0]
        }
      }, options).then(
        response => {
          this.setState({
            cities: response.data.Cities
          })
        }
      ).catch(
        err => {
          console.log(err => {
            console.log(err)
          })
        }
      )
  }

  sendRequestCities = () => {
    
  }

  changeState = (e) => {
    this.setState({
      [e.target.name]: [e.target.value]
    })
  }

  onChange = e => {

    // first the state should be changed if any field in the form changes
    this.changeState(e)
    
    // As soon as the user finished entering the dateto the regions are changed! 
    if (e.target.name == "dateto"){
      // if date to changes then get Regions from the backend
      this.sendRequestDates()
      console.log('target dateto')
    }
    else if (e.target.name == 'region'){
      // if region is selected then get cities from the backend
      this.sendRequestRegions()
      console.log('target region')
      console.log(this.state)
      console.log(this.state.region)
    }
    else if (e.target.name == 'city'){
      // if city is selected then get corresponding cell names from the backend
      this.sendRequestCities()
      console.log('target city')
    }
    else{
      console.log('else')
    }
    
  }

  render() {
    const now = 60;
    const {dateto, datefrom, region, city, cell} = this.state
    return (
      <div className="content">
        <MContext.Consumer>
        {(context) => (
          <Container >
          <Row>
            <Col md={8}>
              <Card
                title="File Selection Form"
                content={
                  <Form onSubmit={context.handleForm}>
                    {/* <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      properties={[
                        {
                          label: "From",
                          type: "date",
                          bsClass: "form-control"
                        }
                        {
                          label: "To",
                          type: "date",
                          bsClass: "form-control"
                        }
                      ]}
                    /> 
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Country",
                          type: "select",
                          bsClass: "form-control"
                        }
                      ]}

                      options = {['pakistan', 'india', 'China']}
                      
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Region",
                          as: "select",
                          bsClass: "form-control"
                        }
                      ]}

                      options = {['KP', 'Punjab', 'Sindh']}
                      
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "City",
                          as: "select",
                          bsClass: "form-control"
                        }
                      ]}

                      options = {['Islamabad', 'Lahore', 'Karachi']}
                      
                    />

                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Cells",
                          as: "select",
                          bsClass: "form-control"
                        }
                      ]}

                      options = {['Cell-01', 'Cell-02']}
                      
                    /> */}


                    {/* <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>About Me</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Here can be your description"
                            defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                          />
                        </FormGroup>
                      </Col>
                    </Row> */}
                    {/* <Button pullRight fill type="submit">
                      Import Files
                    </Button>
                    <div className="clearfix" /> */}
                    <Row>
                    <div className='col-md-6'>
                    <Form.Group controlId="formDateFrom">
                    <Form.Label>From</Form.Label>
                    <Form.Control type="date" onChange={this.onChange} name="datefrom" value={datefrom}/>
                  </Form.Group>
                    </div>
                    

                  <div className='col-md-6'>
                  <Form.Group controlId="formDateTo">
                    <Form.Label>To</Form.Label>
                    <Form.Control type="date" onChange={this.onChange} name="dateto" value={dateto} />
                  </Form.Group>
                  </div>
                    </Row>
                    
{/*                   
                  <Button variant="primary" type="submit">
                    Submit
                  </Button> */}

                  <Row>
                    <div className='col-md-12'>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Region</Form.Label>
                        <Form.Control as="select" onChange={this.onChange} name="region" value={region} >
                          
                          {this.renderRegions(this.state.regions)}

                          {/* <option>South</option>
                          <option>North</option>
                          <option>West I</option>
                          <option>North II</option> */}
                          </Form.Control>
                      </Form.Group>
                    </div>
                  </Row>

                  <Row>
                    <div className='col-md-12'>
                      <Form.Group controlId="exampleForm.ControlSelect2">
                        <Form.Label>City</Form.Label>
                        <Form.Control as="select" onChange={this.onChange} name="city" value={city} >
                          {this.renderCities(this.state.cities)}
                          {/* <option>Lahore</option>
                          <option>Islamabad</option>
                          <option>Sialkot</option>
                          <option>Karachi</option> */}
                        </Form.Control>
                      </Form.Group>
                    </div>
                  </Row>

                  <Row>
                    <div className='col-md-12'>
                      <Form.Group controlId="exampleForm.ControlSelect3">
                        <Form.Label>Cell</Form.Label>
                        <Form.Control as="select" onChange={this.onChange} name="cell" value={cell} >
                          {this.renderCells(this.state.cells)}
                          {/* <option>Cell 01</option>
                          <option>Cell 02</option>
                          <option>Cell 03</option> */}
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
            <Col md={4}>
              <ShowCard showspinner={context.state.showspinner} kpisloaded={context.state.kpisloaded} />
            </Col>
          </Row>
        </Container>
        )}
        </MContext.Consumer>
      </div>
    );
  }
}

export default ManageFilesForm;
