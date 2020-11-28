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
  Row,
  Col,
  Alert,
  Modal,
} from "reactstrap";

import * as firebase from "firebase/app";
import "firebase/auth";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalid_credentials: false,
      loggedIn: false,
      email: '',
      password: '',
      showSpinner: false,
    }
    this.authListener = () => {return;};
  }

  componentDidMount() {
    window.scrollTo(0,0);
    this.authListener = firebase.auth().onAuthStateChanged((user) => {
      this.onAuthHandler(user);
    });
  }

  onAuthHandler(user) {
    if (user) {
      // console.log(user)
      localStorage.setItem("uid", user.uid)
      this.setState({
        loggedIn: true,
      })
    }
  }

  tryLogInUser(email, password) {
    
    if (email == '' || password == '') {
      this.setState({
        invalid_credentials: true,
      })
    }
    
    else {
      this.setState({
        showSpinner: true,
      })

      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        localStorage.setItem('uid', user.user.uid)
        localStorage.setItem('loggedIn', true);
        
        this.setState({ 
          invalid_credentials: false,
          loggedIn: true,
          email: '',
          password: '',
          showSpinner: false
        });
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
  }

  tryGoogleSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      console.log("token =", token, "user =", user)
    })
    .catch((error) => {
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
    .then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      console.log("email =", user.email, "name =", user.displayName)
    })
    .catch((error) => {
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

  render() {
    if (this.state.loggedIn) {
      localStorage.setItem('loggedIn', true);
      return <Redirect push to="/admin/index"/>
    }

    return (
      <>
        <Modal style={{opacity: "0%"}} isOpen={this.state.showSpinner} />
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
              <div className="btn-wrapper text-center">
                <Button
                  className="btn-neutral btn-icon"
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
                <small>Or sign in with credentials</small>
              </div>
              <div className="text-center text-muted mb-4">
                <small>To view the model website, <Button style={{boxShadow: "none"}} className="px-0" onClick={() => this.tryLogInUser('paramshah09@gmail.com','123456789')}>click here</Button></small>
              </div>
              {
                this.state.invalid_credentials && 
                <div className="text-center text-muted mb-4">
                  <Alert color="danger">Please check your email and password and try again!</Alert>
                </div>
              }
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Email" type="email" value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Password" type="password" autoComplete="new-password" value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
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
                  {/* <Link
                  className="nav-link-icon"
                  to="/admin/index"
                  > */}
                    <Button className="my-4" color="primary" onClick={() => this.tryLogInUser(this.state.email, this.state.password)}>
                    Sign In</Button>
                  {/* </Link> */}
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <Link
                className="text-light"
                to="/auth/register"
              >
                <small>Create new account</small>
              </Link>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;
