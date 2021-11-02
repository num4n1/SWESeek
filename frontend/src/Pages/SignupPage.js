import { Form, Button, FloatingLabel, Container, Row, Col } from "react-bootstrap";
import "../Styles/LoginAndSignupStyles.css";

export default function SignupPage(){
    return(
        <div style={{minHeight:`73.3vh`}}>
            <Container  style={{maxWidth:`900px`, paddingTop:`4%`}}>
                <h1 className="SignupHeader">Sign up for free.</h1>
                <Form className="SignupForm">
                    <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                        <Form.Control type="email" placeholder="name@sweseek.com" />
                    </FloatingLabel>
                    <Row>
                        <Col>
                            <FloatingLabel controlId="floatingInput" label="First Name" className="mb-3">
                                <Form.Control type="text" placeholder="Dirst Name" />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="floatingInput" label="Last Name" className="mb-3">
                                <Form.Control type="text" placeholder="Last Name" />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <FloatingLabel controlId="floatingInput" label="Phone Number" className="mb-3">
                            <Form.Control type="tel" placeholder="444-444-4444" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxlength="12" />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                            <Form.Control type="text" placeholder="username" />
                    </FloatingLabel>
                    <Row>
                        <Col>
                            <FloatingLabel controlId="floatingInput" label="Password" className="mb-3">
                                <Form.Control type="password" placeholder="password" />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel controlId="floatingInput" label="Confirm Password" className="mb-3">
                                <Form.Control type="password" placeholder="password" />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Button size="lg" className="SignupButton" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
    )
}