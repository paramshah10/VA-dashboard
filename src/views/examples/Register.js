import React from "react";
import { Link, Redirect } from "react-router-dom";

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
  Modal,
  Alert,
  Row,
  Col
} from "reactstrap";

import * as firebase from "firebase/app";
import Axios from "axios";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalid_credentials: false,
      account_created: false,
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      showSpinner: false,
      email_already_in_use: false,
    }

    this.tryGoogleSignIn = this.tryGoogleSignIn.bind(this)
    this.authListener = () => {return;};
  }

  componentDidMount() {
    window.scrollTo(0,0);
    this.authListener = firebase.auth().onAuthStateChanged(async (user) => {
      await this.onAuthHandler(user);
    });
  }

  onAuthHandler(user) {
    if (user) {
      // console.log(user)
      localStorage.setItem("uid", user.uid);
      this.setState({
        account_created: true,
      });
    }
  }

  tryCreateAccount(email, password, first_name, last_name) {
    if( !email|| !password || !first_name || !last_name ) {
      this.setState({
        invalid_credentials: true
      });
    }

    else {
      this.setState({
        showSpinner: true
      });

      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async (user) => {
        const uid = user.user.uid;
        
        const response = await Axios.post('https://us-central1-veterans-affairs-78bd2.cloudfunctions.net/createNewAccountTemplate',
          { uid: uid, firstName: this.state.first_name, lastName: this.state.last_name, email: this.state.email }
        );

        if (response.code === 200 || response.message === 'Success') {
          localStorage.setItem('loggedIn', true);
          console.log('User Created!');
          this.setState({
            invalid_credentials: false,
            account_created: true,
            showSpinner: false
          });
        }
      })
      .catch((error) => {
        // Handle Errors here.
        if (error.code === "auth/email-already-in-use") {
          this.setState({
            email_already_in_use: true,
            showSpinner: false
          });
        }

        else {
          this.setState({
            invalid_credentials: true,
            showSpinner: false,
          });
        }
        console.error(`Error code: ${error.code}. Error message: ${error.message}`)
      });
    }
  }

  tryGoogleSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      console.log("token =", token, "user =", user)
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log("Error with error code =", errorCode, "and error message =", errorMessage)
    });
  }

  tryFacebookSignIn() {
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      console.log("email =", user.email, "name =", user.displayName)
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      this.setState({
        invalid_credentials: true,
      })
      console.log("Error with error code =", errorCode, "and error message =", errorMessage)
    });
  }

  tryLogInUser(email, password) {
    this.setState({
      showSpinner: true,
    })

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      this.setState({ 
        invalid_credentials: false,
        account_created: true,
        email: '',
        password: '',
        showSpinner: false
      });
      localStorage.setItem('loggedIn', true);
      localStorage.setItem('email', email);
    })
    .catch((error) => {
      // Handle Errors here.
      this.setState({ 
        invalid_credentials: true,
        showSpinner: false,
      });
      console.error(`Error code: ${error.code}. Error message: ${error.message}`)
    });
  }

  render() {
    if (this.state.account_created) {
      localStorage.setItem('loggedIn', true)
      return <Redirect push to="/admin/index" />
    }

    return (
      <>
        <Modal style={{opacity: "0%"}} isOpen={this.state.showSpinner} />
        <Col lg="5" md="8">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-4">
                <small>Sign up with</small>
              </div>
              <div className="text-center">
                <Button
                  className="btn-neutral btn-icon mr-4"
                  color="default"
                  href="#pablo"
                  onClick={() => this.tryFacebookSignIn()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/facebook.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Facebook</span>
                </Button>
                <Button
                  className="btn-neutral btn-icon"
                  color="default"
                  href="#pablo"
                  onClick={() => this.tryGoogleSignIn()}
                >
                  <span className="btn-inner--icon">
                    <img
                      alt="..."
                      src={require("assets/img/icons/common/google.svg")}
                    />
                  </span>
                  <span className="btn-inner--text">Google</span>
                </Button>
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Or sign up with credentials</small>
              </div>
              <div className="text-center text-muted mb-4">
                <small>To view the model website, <Button style={{boxShadow: "none"}} className="px-0" onClick={() => this.tryLogInUser('model@model.com','123456789')}>click here</Button></small>
              </div>
              {
                this.state.invalid_credentials && 
                <div className="text-center text-muted mb-4">
                  <Alert color="danger">Please check your email and password and try again!</Alert>
                </div>
              }
              {
                this.state.email_already_in_use && 
                <div className="text-center text-muted mb-4">
                  <Alert color="danger">This email is already in use. Please login instead!</Alert>
                </div>
              }
              <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="First Name" type="text" value={this.state.first_name} onChange={(e) => this.setState({first_name: e.target.value})}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-hat-3" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Last Name" type="text" value={this.state.last_name} onChange={(e) => this.setState({last_name: e.target.value})}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" autoComplete="new-email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" autoComplete="new-password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
                  </InputGroup>
                </FormGroup>
                {/* <div className="text-muted font-italic">
                  <small>
                    password strength:{" "}
                    <span className="text-success font-weight-700">strong</span>
                  </small>
                </div> */}
                {/* <Row className="my-4">
                  <Col xs="12">
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheckRegister"
                      >
                        <span className="text-muted">
                          I agree with the{" "}
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                  </Col>
                </Row> */}
                <div className="text-center">
                  <Button className="mt-4" color="primary" type="button" onClick={() => {
                    this.tryCreateAccount(this.state.email, this.state.password, this.state.first_name, this.state.last_name)}}
                  >
                    Create account
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6" />
            <Col className="text-right" xs="6">
              <Link
                className="text-light"
                to="/auth/login"
              >
                <small>Login Instead</small>
              </Link>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Register;
