import { Form, Button, FloatingLabel, Container, Row, Col } from "react-bootstrap";
import "../Styles/LoginAndSignupStyles.css";

export default function LoginPage() {
  return (
    <div style={{minHeight:`73.3vh`, paddingTop:`8%`}}>
        <Container  style={{maxWidth:`900px`}}>
        <h1 className="SignupHeader">Login</h1>
        <Form className="SignupForm">
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                <Form.Control type="email" placeholder="name@sweseek.com" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Password" className="mb-3">
                <Form.Control type="password" placeholder="password" />
            </FloatingLabel>
            <Button size="lg" className="SignupButton" type="submit">
                Submit
            </Button>
        </Form>
    </Container>
</div>
  );
}
