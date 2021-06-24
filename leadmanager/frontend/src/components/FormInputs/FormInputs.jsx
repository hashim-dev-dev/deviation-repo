import React, { Component } from "react";
import { FormGroup, FormLabel, FormControl, Row } from "react-bootstrap";
import {Form} from 'react-bootstrap'

function FieldGroup({ label, ...props }) {
  return (
    <FormGroup>
      <FormLabel>{label}</FormLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}
 
function FieldGroupAdd({ label, options}) {
  console.log(options)
  // return (
  //   <FormGroup>
  //     <ControlLabel>{label}</ControlLabel>
  //     {/* <FormControl {...props}/> */}
  //     <Form.Control>

  //     </Form.Control>
  //     {/* <RenderOptions options={options} /> */}
  //   </FormGroup>
  // );
    return (
      <div className ="form-group">
    <label for="exampleFormControlSelect1">{label}</label>
    <select className="form-control" id="exampleFormControlSelect1" >
      {renderOptions(options)}
    </select>
  </div>
    )


  // I can access options here, the only problem here is to embed these options in the form control
  // console.log(options)
  // return (
  //   <FormGroup>
  //     <ControlLabel>{label}</ControlLabel>
  //     <FormControl as='select'>
  //     </FormControl>
  //   </FormGroup>
  // )
}
const renderOptions = options => {
  const my_array = []
  for (var option of options){
    my_array.push(
      <option>{option}</option>
    )
  }
  return my_array
}

export class FormInputs extends Component {
  render() {
    var row = [];
    for (var i = 0; i < this.props.ncols.length; i++) {
      if (this.props.options){
        row.push(
          <div key={i} className={this.props.ncols[i]}>
          <FieldGroupAdd label={this.props.properties[i].label} options={this.props.options} />
          </div>
        );
      }
      else{
        row.push(
          <div key={i} className={this.props.ncols[i]}>
          <FieldGroup {...this.props.properties[i]} />
          </div>
        );
      }
      // row.push(
      //   <div key={i} className={this.props.ncols[i]}>
      //     <FieldGroup {...this.props.properties[i]} />
      //   </div>
      // );
    }
    return <Row>{row}</Row>;
  }
}

export default FormInputs;
