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
import axios from 'axios'
import {Context} from '../Context/DataProvider'



class FileForm extends Component {
  state = {

  }


  render() {
    return (
      <div className="content">
        <Context.Consumer>
          {(context)=> (
            <Container >
            <Row>
              <Col md={8}>
                <Card
                  title="File Selection Form"
                  content={
                    <Form onSubmit={context.handleForm}>
  
                      {/* <Row>
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
                      </Row> */}
  
                    {/* <Row>
                      <div className='col-md-12'>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                          <Form.Label>Bsc (Sub-Network)</Form.Label>
                          <Form.Control as="select" onChange={this.onChange} name='bsc' value={this.state.bsc} >
                            {}
                            </Form.Control>
                        </Form.Group>
                      </div>
                    </Row> */}
  
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

export default FileForm;
