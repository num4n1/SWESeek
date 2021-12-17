import {
  Form,
  Button,
  FloatingLabel,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useState } from "react";
import "../Styles/LoginAndSignupStyles.css";
import Axios from "axios";

export default function SignupPage() {
  const [emailValidity, setEmailValidity] = useState(false);
  const [firstNameValidity, setFirstNameValidity] = useState(false);
  const [lastNameValidity, setLastNameValidity] = useState(false);
  const [phoneValidity, setPhoneValidity] = useState(false);
  const [usernameValidity, setUsernameValidity] = useState(false);
  const [passwordValidity, setPasswordValidity] = useState(false);
  const [confirmPasswordValidity, setConfirmPasswordValidity] = useState(false);

  function signup() {
    if (validateFields()) {
      Axios.post("http://127.0.0.1:5000/api/signup", {
        email: document.getElementById("email").value,
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        phoneNumber: document.getElementById("phone").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      }, {
        headers: {'Access-Control-Allow-Origin': '*'},
      })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          window.location.href = "http://localhost:3000/tracking";
        })
        .catch((res) => {
          console.log(res);
        });
    }
  }

  function validateFields() {
    let returnVal = true;
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById("email").value)
    ) {
      returnVal = false;
      setEmailValidity(true);
    }
    if (document.getElementById("firstName").value.length < 2) {
      returnVal = false;
      setFirstNameValidity(true);
    }
    if (document.getElementById("lastName").value.length < 2) {
      returnVal = false;
      setLastNameValidity(true);
    }
    if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
        document.getElementById("phone").value
      )
    ) {
      returnVal = false;
      setPhoneValidity(true);
    }
    if (document.getElementById("username").value.length < 3) {
      returnVal = false;
      setUsernameValidity(true);
    }
    if (
      document.getElementById("password").value !==
      document.getElementById("confirmPassword").value
    ) {
      console.log("test")
      returnVal = false;
      setConfirmPasswordValidity(true);
    }
    if (document.getElementById("password").value.length < 6) {
      returnVal = false;
      setPasswordValidity(true);
    }
    return returnVal;
  }

  return (
    <div style={{ minHeight: `73.3vh` }}>
      <Container style={{ maxWidth: `800px`, paddingTop: `4%` }}>
        <h1 className="SignupHeader">Sign up for free.</h1>
        <Form className="SignupForm" noValidate>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              id="email"
              type="email"
              placeholder="name@sweseek.com"
              required
              isInvalid={emailValidity}
            />
          </FloatingLabel>
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="First Name"
                className="mb-3"
              >
                <Form.Control
                  id="firstName"
                  type="text"
                  placeholder="First Name"
                  isInvalid={firstNameValidity}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Last Name"
                className="mb-3"
              >
                <Form.Control
                  id="lastName"
                  type="text"
                  placeholder="Last Name"
                  isInvalid={lastNameValidity}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <FloatingLabel
            controlId="floatingInput"
            label="Phone Number"
            className="mb-3"
          >
            <Form.Control
              id="phone"
              type="tel"
              placeholder="444-444-4444"
              pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
              maxlength="12"
              isInvalid={phoneValidity}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput"
            label="Username"
            className="mb-3"
          >
            <Form.Control
              id="username"
              type="text"
              placeholder="username"
              isInvalid={usernameValidity}
            />
          </FloatingLabel>
          <Row>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  id="password"
                  type="password"
                  placeholder="password"
                  isInvalid={passwordValidity}
                />
              </FloatingLabel>
            </Col>
            <Col>
              <FloatingLabel
                controlId="floatingInput"
                label="Confirm Password"
                className="mb-3"
              >
                <Form.Control
                  id="confirmPassword"
                  type="password"
                  placeholder="password"
                  isInvalid={confirmPasswordValidity}
                />
              </FloatingLabel>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button size="lg" className="SignupButton" onClick={signup}>
                Submit
              </Button>
            </Col>
          </Row>
          <Button size="lg" className="SignupButton" href="/employersignup">
            Or Sign up as an employer.
          </Button>
        </Form>
      </Container>
    </div>
  );
}
