/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Constants from '../constants';

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

class Forgotpass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      message: '',
      status: null,
      q1: null,
      q2: null,
      answer1:'',
      answer2:'',
      validpassword: true
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  CheckPassword(inputtxt) {
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (inputtxt.match(decimal)) {
      return true;
    }
    return false;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  getSecurityQuestions() {
    console.log(this);
    console.log(this.state);
    // const formData = new FormData(); 
    var form_data = new FormData();

    for (var key in this.state) {
      form_data.append(key, this.state[key]);
    }


    axios.post("http://127.0.0.1:5000/getsecurityquestions", form_data).then((response) => {
      console.log(response);
      this.setState(response.data);
      // this.setState({detectedclass:response.data.class, perc:response.data.perc});
    });

  }

  updatePassword() {
    console.log(this);
    console.log(this.state);
    // const formData = new FormData(); 

    let validform = true;
    this.setState({validpassword: true});
    if (!this.CheckPassword(this.state.password)) {
      this.setState({ validpassword: false });
      validform = false;
    }

    if (!validform) {
      return;
    }


    var form_data = new FormData();

    for (var key in this.state) {
      form_data.append(key, this.state[key]);
    }


    axios.post("http://127.0.0.1:5000/updatepassword", form_data).then((response) => {
      console.log(response);
      if(response.data.status)
      {
        this.setState({message:<div>'Password Chnaged'</div>});
      }
      else
      {
        this.setState({message:<div>'AUTHENTICATION Unsucessful'</div>});
        
      }
      // this.setState({detectedclass:response.data.class, perc:response.data.perc});
    });

  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/auth/dashboard" />
    }

    return (
      <div align="center">
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <big>Forgot Password </big>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Enetr your username" type="text" name="username" value={this.state.username}
                      onChange={this.handleInputChange} />
                  </InputGroup>
                </FormGroup>

                <div className="text-center">
                  <Button className="my-4" color="primary" type="button" onClick={() => this.getSecurityQuestions()}>
                    Forgot Password
                </Button>
                  {this.state.message}
                </div>
                {this.state.status == null ? '' :
                  <div>
                    {(this.state.status == false) ? <div>Username not Found</div> :
                      <div>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="" />
                              </InputGroupText>
                              <label>
                                Security Question 1:
                    </label>
                            </InputGroupAddon>


                            {this.state.q1}

                          </InputGroup>
                        </FormGroup>
                        {/* Answer 1 */}
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="type answer" type="text" name="answer1" value={this.state.answer1}
                              onChange={this.handleInputChange} />
                          </InputGroup>
                        </FormGroup>

                        {/* Security Question 2*/}
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="" />
                              </InputGroupText>
                              <label>
                                Security Question 2:
                    </label>
                            </InputGroupAddon>

                            {this.state.q2}

                          </InputGroup>
                        </FormGroup>
                        {/* Answer 2 */}
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="type answer" type="text" name="answer2" value={this.state.answer2}
                              onChange={this.handleInputChange} />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="password" type="password" name="password" value={this.state.password}
                              onChange={this.handleInputChange} />
                              <p style={{ color: 'red' }}>
                      *</p>
                    {this.state.validpassword ? '' : <div><p style={{ color: 'red' }}>password must be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character</p></div>}
                          </InputGroup>
                        </FormGroup>
                        <Button className="my-4" color="primary" type="button" onClick={() => this.updatePassword()}>
                          Update Password
                </Button>
                        <div className="text-center">
                          <Link to="/auth/login">Sign In</Link>
                        </div>
                      </div>}
                  </div>}
              </Form>
            </CardBody>
          </Card>

        </Col>
      </div>
    );
  };
}
export default Forgotpass;
