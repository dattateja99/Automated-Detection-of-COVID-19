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

class login extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      message:''
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


    axios.post("http://127.0.0.1:5000/logindoctor", form_data).then((response) => {
      console.log(response);
      if(response.data.status)
      {
        this.setState({loggedIn:true, message:''});
      }
      else
      {
        this.setState({message:<div>Invalid username or password</div>});
      }
      // this.setState({detectedclass:response.data.class, perc:response.data.perc});
    });

  }

  render() {
    if(this.state.loggedIn)
    {
      return <Redirect to="/auth/dashboard" />
    }

    return (
    <div align="center">
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <big>Sign in </big>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Username" type="text" name="username" value={this.state.username}
                      onChange={this.handleInputChange} />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                      placeholder="Password"
                      type="password"
                      autoComplete="new-password"
                      name="password" value={this.state.password}
                      onChange={this.handleInputChange}
                    />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={() => this.uploadForm()}>
                  Sign in
                </Button>
                {this.state.message}
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col className="text-left" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <Link to="/auth/forgotpass">forgot password</Link>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <Link to="/auth/register">create new account</Link>
            </a>
          </Col>
        </Row>
      </Col>
    </div>
  );
};
}
export default login;
