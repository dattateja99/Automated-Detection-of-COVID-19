import React, { Component } from "react";
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';


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
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      dname: '',
      qualification: '',
      email: '',
      dob: '',
      gender: 'Male',
      mobile: '',
      q1: '',
      q2: '',
      answer1: '',
      answer2: '',
      validemail: true,
      validdname: true,
      validpassword: true,
      validmobile: true,
      validusername: true,
      validanswer1: true,
      validanswer2: true,
      regcomplete: false,
      usernameexists: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  ValidateEmail(inputText) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (inputText.match(mailformat)) {
      return true;
    }
    return false;
  }

  CheckPassword(inputtxt) {
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (inputtxt.match(decimal)) {
      return true;
    }
    return false;
  }

  CheckPhonenumber(inputtxt) {
    var phoneno = /^\d{10}$/;
    if (inputtxt.match(phoneno)) {
      return true;
    }
    return false;
  }

  CheckName(inputtxt) {
    var dname = /^([a-zA-Z ]){2,30}$/
    if (inputtxt.match(dname)) {
      return true;
    }
    return false;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value.trim();
    const name = target.name;

    console.log('handleInputChange', name, value);

    this.setState({
      [name]: value
    });

    console.log(this.state);
  }


  uploadForm() {
    console.log(this);
    console.log(this.state);

    let validform = true;
    this.setState({ validemail: true, validdname: true, validpassword: true, validmobile: true, validusername: true, usernameexists: false });
    //validate data
    if (!this.ValidateEmail(this.state.email)) {
      this.setState({ validemail: false });
      validform = false;
    }
    if (!this.CheckPassword(this.state.password)) {
      this.setState({ validpassword: false });
      validform = false;
    }
    if (!this.CheckPhonenumber(this.state.mobile)) {
      this.setState({ validmobile: false });
      validform = false;
    }
    if (!this.CheckName(this.state.dname)) {
      this.setState({ validdname: false });
      validform = false;
    }
    if (this.state.username.length === 0) {
      this.setState({ validusername: false });
      validform = false;
    }

    //add validation for q1 and q2

    if (!validform) {
      return;
    }

    // const formData = new FormData(); 
    var form_data = new FormData();

    for (var key in this.state) {
      form_data.append(key, this.state[key]);
    }


    axios.post("http://127.0.0.1:5000/adddoctor", form_data).then((response) => {
      console.log(response);

      if (response.data.status) {
        this.setState({ regcomplete: true });
      }
      else {
        this.setState({ usernameexists: true });
      }

      // this.setState({detectedclass:response.data.class, perc:response.data.perc});
    });

  }

  render() {
    if (this.state.regcomplete) {
      return <Redirect to="/auth/login" />
    }
    return (
      <div align="center">
        <Col lg="6" md="8">
          <Card className="bg-secondary shadow border-0">

            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <big>Registration</big>
              </div>
              <Form role="form">
                {/* //Username */}
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Username" type="text" name="username" value={this.state.username}
                      onChange={this.handleInputChange} />
                    <p style={{ color: 'red' }}>
                      *</p> {this.state.validusername ? '' : <div><p style={{ color: 'red' }}>Username must not be empty</p></div>}
                    {this.state.usernameexists ? <div>Username Already Exists. Try another.</div> : ''}
                  </InputGroup>
                </FormGroup>
                {/* //Password */}
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      autoComplete="new-password"
                      name="password" value={this.state.password}
                      onChange={this.handleInputChange}
                    /><p style={{ color: 'red' }}>
                      *</p>
                    {this.state.validpassword ? '' : <div><p style={{ color: 'red' }}>password must be between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character</p></div>}
                  </InputGroup>
                </FormGroup>
                {/* //Name */}
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Name" type="text" name="dname" value={this.state.dname}
                      onChange={this.handleInputChange} />
                    <p style={{ color: 'red' }}>
                      *</p>{this.state.validdname ? '' : <div><p style={{ color: 'red' }}>Enter Valid Name</p></div>}
                  </InputGroup>
                </FormGroup>
                {/* //Email */}
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      name="email" value={this.state.email}
                      onChange={this.handleInputChange}
                    /><p style={{ color: 'red' }}>
                      *</p>{this.state.validemail ? '' : <div><p style={{ color: 'red' }}>Invalid Email</p></div>}
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
                      placeholder="Date"
                      type="Date"
                      name="dob" value={this.state.dob}
                      onChange={this.handleInputChange}
                    />
                    <p style={{ color: 'red' }}>
                      *</p>
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
                      checked={this.state.gender === 'Male'}
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
                      checked={this.state.gender === 'Female'}
                    />FEMALE
                </InputGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      value="Other"
                      name="gender"
                      type="radio"
                      onChange={this.handleInputChange}
                      checked={this.state.gender === 'Other'}
                    />Other
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
                    <p style={{ color: 'red' }}>
                      *</p>{this.state.validmobile ? '' : <div><p style={{ color: 'red' }}>Invalid Mobile No</p></div>}
                  </InputGroup>
                </FormGroup>

                {/* Security Question 1*/}
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
                    <div>
                    <select className="dropdown-menu-sm" color="primary" value={this.state.q1} onChange={this.handleInputChange} name="q1" >
                      <option value="">Please choose a Question</option>
                      <option>What was your first pet name?</option>
                      <option>What was your favorite super-hero?</option>
                      <option>When is your parents wedding anniversary?</option>
                    </select>
                    </div>

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

                  
                    <select className="dropdown-menu-sm" color="primary" value={this.state.q2} onChange={this.handleInputChange} name="q2" >
                      <option value="">Please choose an Question</option>
                      <option>What primary school did you attend?</option>
                      <option>What are the last five digits of your driver's license number?</option>
                      <option>What year did you graduate from High School?</option>
                    </select>
                  

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

                <div className="text-center">
                  <Button className="mt-4" color="primary" type="button" onClick={() => this.uploadForm()} >
                    Create account
                </Button>
                </div>
                <div className="text-center">
                  <Link to="/auth/login">Sign In</Link>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default Register;
