import { useEffect, useState } from "react";
import {
  Container,
  Form,
  FormLabel,
  Row,
  Card,
  Modal,
  Button,
  Col,
} from "react-bootstrap";
import Axios from 'axios';
import "../Styles/SalariesPageStyles.css";

const exampleDataPopular = [
  {
    companyName: "Google",
    industry: "Tech",
    size: "10000+",
    payInfo: [
      { position: "SDE1", totalComp: "160000" },
      { position: "SDE2", totalComp: "200000" },
      { position: "SDE3", totalComp: "300000" },
    ],
  }
];

export default function SalariesPage() {
  const [popularCompanys, setPopularCompanys] = useState([]);
  const [allCompanys, setAllCompanys] = useState([]);

  const [modalInfo, setModalInfo] = useState(exampleDataPopular[0]);
  const [show, setShow] = useState(false);
  const [showAddSalary, setShowAddSalary] = useState(false);

  useEffect(() => {
        // Checks for token in storage, indicating signed in.
    if(localStorage.getItem("token") == null){
      window.location.href = "http://127.0.0.1:5000/login";
    }

    Axios.get("http://127.0.0.1:5000/api/summerizedSalaryInfo", {})
    .then((res) => {
      setAllCompanys(res.data);
    });

    Axios.get("http://127.0.0.1:5000/api/summarizedPopularSalaryInfo", {})
    .then((res) => {
      setPopularCompanys(res.data);
      console.log(res);
    });
  }, []);

  function openCard(company) {
    setModalInfo(company);
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  function handleSearch(e) {
    if (e === "Enter") {
      let query = document.getElementById("searchBar").value;
      console.log(allCompanys)
      let result = allCompanys.find(
        ({ company }) => company.toLowerCase() === query.toLowerCase()
      );
      if (result !== undefined) {
        document.getElementById("errorMessage").classList.remove("ShowError");
        openCard(result);
      } else {
        document.getElementById("errorMessage").classList.add("ShowError");
      }
    }
  }

  function addSalary() {
    setShowAddSalary(true);
  }

  function handleCloseSalary() {
    setShowAddSalary(false);
  }

  function submitSalary(){
    let company = document.getElementById("addCompanyName").value;
    let size = document.getElementById("addCompanySize").value;
    let role = document.getElementById("addRole").value;
    let comp = document.getElementById("addComp").value;

    Axios.post("http://127.0.0.1:5000/api/addSalary", {
      company: company,
      companySize: size,
      role: role,
      totalComp: comp,
    })

    handleCloseSalary();
  }

  return (
    <Container style={{ minHeight: `77vh`, textAlign: `left` }}>
      <h1 className="SalaryHeader">Discover salaries, get negotiation power</h1>
      <Form.Group style={{ textAlign: `left` }}>
        <FormLabel className="SearchLabel">Search Companys</FormLabel>
        <Form.Control
          id="searchBar"
          style={{ width: `200px` }}
          type="text"
          placeholder="Google"
          onKeyPress={(e) => handleSearch(e.code)}
        />
        <Form.Text id="errorMessage" className="txt-muted NoError">
          Sorry we couldnt find that company.
        </Form.Text>
        <Row>
          <Button
            onClick={addSalary}
            size="md"
            style={{ width: `130px`, marginLeft: `1%` }}
          >
            Or add salary
          </Button>
        </Row>
      </Form.Group>
      <h2 className="SubHeader">Popular</h2>
      <Row style={{ justifyContent: `space-between` }}>
        {popularCompanys.map((company) => {
          return (
            <Card onClick={() => openCard(company)} className="CompanyCard">
              <Card.Header>
                <Card.Title style={{ fontSize: `22px` }}>
                  {company.company}
                </Card.Title>
                <Card.Subtitle
                  style={{ fontSize: `12px`, color: `rgb(100, 100, 100)` }}
                >
                  Size: {company.companySize}
                </Card.Subtitle>
              </Card.Header>
            </Card>
          );
        })}
      </Row>
      <h2 className="SubHeader">All Companys</h2>
      <Row style={{ justifyContent: `space-between`, marginBottom: `4%` }}>
        {allCompanys.map((company) => {
          return (
            <Card onClick={() => openCard(company)} className="CompanyCard">
              <Card.Header>
                <Card.Title style={{ fontSize: `22px` }}>
                  {company.company}
                </Card.Title>
                <Card.Subtitle
                  style={{ fontSize: `12px`, color: `rgb(100, 100, 100)` }}
                >
                  Size: {company.companySize}
                </Card.Subtitle>
              </Card.Header>
            </Card>
          );
        })}
      </Row>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalInfo.company}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card.Title style={{ fontSize: `18px`, textAlign: `start` }}>
            <span style={{ fontSize: `20px`, fontWeight: `bold` }}>
              Industry:{" "}
            </span>
            {modalInfo.industry}
          </Card.Title>
          <Card.Title style={{ fontSize: `18px`, textAlign: `start` }}>
            <span style={{ fontSize: `20px`, fontWeight: `bold` }}>Size: </span>
            {modalInfo.companySize}
          </Card.Title>
          <Row
            style={{
              justifyContent: `space-between`,
              marginTop: `5%`,
              marginBottom: `4%`,
            }}
          >
            {modalInfo.payInfo.map((val) => {
              return (
                <div style={{ width: `auto` }}>
                  <h1
                    className="SalaryCardHeader"
                    style={{ textAlign: `left` }}
                  >
                    {val.position}:
                  </h1>
                  <h2
                    className="SalaryCardSubHeader"
                    style={{ textAlign: `left` }}
                  >
                    Total Comp: ~${val.totalComp} USD
                  </h2>
                </div>
              );
            })}
          </Row>
        </Modal.Body>
      </Modal>
      <Modal centered show={showAddSalary} onHide={handleCloseSalary}>
        <Modal.Header closeButton>
          <Modal.Title>Add Salary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <FormLabel className="SearchLabel">Company: </FormLabel>
              <Form.Control style={{width:`100%`}} placeholder="Google" id="addCompanyName" />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormLabel style={{marginTop:`3%`}} className="SearchLabel">Rough Size: </FormLabel>
              <Form.Control style={{width:`100%`}} placeholder="Small/Medium/Large" id="addCompanySize" />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormLabel style={{marginTop:`3%`}} className="SearchLabel">Role: </FormLabel>
              <Form.Control style={{width:`100%`}} placeholder="Intern" id="addRole" />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormLabel style={{marginTop:`3%`}} className="SearchLabel">Total Compensation: </FormLabel>
              <Form.Control style={{width:`100%`}} placeholder="120000" id="addComp" />
            </Col>
          </Row>
          <Button onClick={submitSalary} style={{marginTop:`3%`}}>Submit</Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
