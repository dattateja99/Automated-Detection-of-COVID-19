import React, { Component } from "react";
import axios from 'axios';


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

class PRegister extends Component {

  constructor(props) {
    super(props);
    this.state = {  
      pname: '',
      mobile: '',
      gender: '',
      dob: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  uploadForm() {
    console.log(this);
    console.log(this.state);
    // const formData = new FormData(); 
    var form_data = new FormData();

    for (var key in this.state) {
      form_data.append(key, this.state[key]);
    }


    axios.post("http://127.0.0.1:5000/addpatient", form_data).then((response) => {
      console.log(response);
      // this.setState({detectedclass:response.data.class, perc:response.data.perc});
    });

  }

  render() {
    return (
      <>
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">

            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <big>Patient Registration</big>
              </div>
              <Form role="form">
                {/* //Name */}
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Name" type="text" name="pname" value={this.state.pname}
                      onChange={this.handleInputChange} />
                  </InputGroup>
                </FormGroup>
                 {/* MobileNO */}
                 <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Mobile"
                      type="tel"
                      name="mobile" value={this.state.mobile}
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                </FormGroup>
                   {/*Gender*/}
                   <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <label>
                      Enter Gender  :
                    </label>
                  </InputGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value="Male"
                      name="gender"
                      type="radio"
                      onChange={this.handleInputChange}
                    />MALE
                </InputGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value="Female"
                      name="gender"
                      type="radio"
                      onChange={this.handleInputChange}
                    />FEMALE
                </InputGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value="other"
                      name="gender"
                      type="radio"
                      onChange={this.handleInputChange}
                    />Other
                </InputGroup>
                </FormGroup>
                {/* DOB */}
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Date Of Birth"
                      type="Date"
                      name="dob" value={this.state.dob}
                      onChange={this.handleInputChange}
                    />
                  </InputGroup>
                </FormGroup>
             
               
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="button" onClick={() => this.uploadForm()} >
                    Register
                </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </>
    );
  }
}

export default PRegister;
