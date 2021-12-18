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
  
  export default function EmployerSignupPage() {
      const [companyValidity, setCompanyValidity] = useState(false);
      const [industryValidity, setIndustryValidity] = useState(false);
      const [companySizeValidity, setCompanySizeValidity] = useState(false);
      const [usernameValidity, setUsernameValidity] = useState(false);
      const [passwordValidity, setPasswordValidity] = useState(false);
      const [confirmPasswordValidity, setConfirmPasswordValidity] = useState(false);
  
    function signup() {
      if (
        validateFields()
      ) {
        Axios.post("http://127.0.0.1:5000/api/signupcompany", {
          companyName: document.getElementById("companyName").value,
          username: document.getElementById("username").value,
          industry: document.getElementById("industry").value,
          size: document.getElementById("companySize").value,
          password: document.getElementById("password").value,
        })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            window.location.href = "http://localhost:3000/employerdashboard";
          })
          .catch((res) => {
            console.log(res);
          });
      }
    }
  
    function validateFields(){
      let returnVal = true;
      if(document.getElementById("companyName").value.length < 2){
          returnVal = false;
          setCompanyValidity(true);
      }
      if(document.getElementById("industry").value.length < 2){
          returnVal = false;
          setIndustryValidity(true);
      }
      if(document.getElementById("companySize").value.length < 1){
          returnVal = false;
          setCompanySizeValidity(true);
      }
      if(document.getElementById("username").value.length < 3){
          returnVal = false;
          setUsernameValidity(true);
      }
      if(document.getElementById("password").value !== document.getElementById("confirmPassword").value){
          returnVal = false;
          setConfirmPasswordValidity(true);
      }
      if(document.getElementById("password").value.length < 6){
          returnVal = false;
          setPasswordValidity(true);
      }
      return returnVal;
    }
  
    return (
      <div style={{ minHeight: `73.3vh` }}>
        <Container style={{ maxWidth: `800px`, paddingTop: `4%` }}>
          <h1 className="SignupHeader">Sign up your company</h1>
          <Form className="SignupForm" noValidate>
            <FloatingLabel
              controlId="floatingInput"
              label="Company Name"
              className="mb-3"
            >
              <Form.Control
                id="companyName"
                type="company"
                placeholder="name@sweseek.com"
                required
                isInvalid={companyValidity}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Username"
              className="mb-3"
            >
              <Form.Control id="username" type="text" placeholder="username" isInvalid={usernameValidity} />
            </FloatingLabel>
            <Row>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Industry"
                  className="mb-3"
                >
                  <Form.Control
                    id="industry"
                    type="text"
                    placeholder="Industry"
                    isInvalid={industryValidity}
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Aprox. Company Size"
                  className="mb-3"
                >
                  <Form.Control
                    id="companySize"
                    type="text"
                    placeholder="Aprox. Company Size"
                    isInvalid={companySizeValidity}
                  />
                </FloatingLabel>
              </Col>
            </Row>
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
            <Button size="lg" className="SignupButton" onClick={signup}>
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
  