import { useState } from "react";
import {
  Container,
  Form,
  FormLabel,
  Col,
  Row,
  Card,
  Modal,
} from "react-bootstrap";
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
  },
  {
    companyName: "FaceBook",
    industry: "Tech",
    size: "10000+",
    payInfo: [
      { position: "SDE1", totalComp: "130000" },
      { position: "SDE2", totalComp: "250000" },
      { position: "SDE3", totalComp: "340000" },
    ],
  },
  {
    companyName: "Amazon",
    industry: "Tech",
    size: "10000+",
    payInfo: [
      { position: "SDE1", totalComp: "140000" },
      { position: "SDE2", totalComp: "220000" },
      { position: "SDE3", totalComp: "320000" },
    ],
  },
  {
    companyName: "Apple",
    industry: "Tech",
    size: "10000+",
    payInfo: [
      { position: "SDE1", totalComp: "120000" },
      { position: "SDE2", totalComp: "170000" },
      { position: "SDE3", totalComp: "240000" },
    ],
  },
  {
    companyName: "MicroSoft",
    industry: "Tech",
    size: "10000+",
    payInfo: [
      { position: "SDE1", totalComp: "160000" },
      { position: "SDE2", totalComp: "200000" },
      { position: "SDE3", totalComp: "300000" },
    ],
  },
  {
    companyName: "Samsung",
    industry: "Electronics",
    size: "10000+",
    payInfo: [
      { position: "SDE1", totalComp: "160000" },
      { position: "SDE2", totalComp: "200000" },
      { position: "SDE3", totalComp: "300000" },
    ],
  },
  {
    companyName: "JaneStreet",
    industry: "Finance",
    size: "10000+",
    payInfo: [
      { position: "SDE1", totalComp: "160000" },
      { position: "SDE2", totalComp: "200000" },
      { position: "SDE3", totalComp: "300000" },
    ],
  },
];
const exampleDataNotPopular = [
  {
    companyName: "Google",
    industry: "Tech",
    size: "10000+",
    payInfo: [
      { position: "SDE1", totalComp: "160000" },
      { position: "SDE2", totalComp: "200000" },
      { position: "SDE3", totalComp: "300000" },
    ],
  },
  {
    companyName: "FaceBook",
    industry: "Tech",
    size: "10000+",
    payInfo: [
      { position: "SDE1", totalComp: "130000" },
      { position: "SDE2", totalComp: "250000" },
      { position: "SDE3", totalComp: "340000" },
    ],
  },
  {
    companyName: "Amazon",
    industry: "Tech",
    size: "10000+",
    payInfo: [
      { position: "SDE1", totalComp: "140000" },
      { position: "SDE2", totalComp: "220000" },
      { position: "SDE3", totalComp: "320000" },
    ],
  },
  {
    companyName: "Apple",
    industry: "Tech",
    size: "10000+",
    payInfo: [
      { position: "SDE1", totalComp: "120000" },
      { position: "SDE2", totalComp: "170000" },
      { position: "SDE3", totalComp: "240000" },
    ],
  },
  {
    companyName: "MicroSoft",
    industry: "Tech",
    size: "10000+",
    payInfo: [
      { position: "SDE1", totalComp: "160000" },
      { position: "SDE2", totalComp: "200000" },
      { position: "SDE3", totalComp: "300000" },
    ],
  },
  {
    companyName: "Samsung",
    industry: "Electronics",
    size: "10000+",
    payInfo: [
      { position: "SDE1", totalComp: "160000" },
      { position: "SDE2", totalComp: "200000" },
      { position: "SDE3", totalComp: "300000" },
    ],
  },
  {
    companyName: "JaneStreet",
    industry: "Finance",
    size: "10000+",
    payInfo: [
      { position: "SDE1", totalComp: "160000" },
      { position: "SDE2", totalComp: "200000" },
      { position: "SDE3", totalComp: "300000" },
    ],
  },
];

export default function SalariesPage() {
  const popularCompanys = exampleDataPopular;
  const allCompanys = exampleDataNotPopular;

  const [modalInfo, setModalInfo] = useState(exampleDataPopular[0]);
  const [show, setShow] = useState(false);

  function openCard(company) {
    setModalInfo(company);
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  function handleSearch(e){
      if(e === "Enter"){
        let query = document.getElementById("searchBar").value;
        let result = allCompanys.find(({ companyName }) => companyName.toLowerCase() === query.toLowerCase());
        if(result !== undefined){
            document.getElementById("errorMessage").classList.remove("ShowError");
            openCard(result)
        }
        else{
            document.getElementById("errorMessage").classList.add("ShowError");
        }
      }
  }

  return (
    <Container style={{ minHeight: `77vh`, textAlign: `left` }}>
      <h1 className="SalaryHeader">Discover salaries, get negotiation power</h1>
      <Form.Group style={{ textAlign: `left` }}>
        <FormLabel className="SearchLabel">Search Companys</FormLabel>
        <Form.Control
          id="searchBar"
          style={{ width: `16%` }}
          type="text"
          placeholder="Google"
          onKeyPress={(e) => handleSearch(e.code) }
        />
        <Form.Text id="errorMessage" className="txt-muted NoError">Sorry we couldnt find that company.</Form.Text>
      </Form.Group>
      <h2 className="SubHeader">Popular</h2>
      <Row style={{ justifyContent: `space-between` }}>
        {popularCompanys.map((company) => {
          return (
            <Card onClick={() => openCard(company)} className="CompanyCard">
              <Card.Header>
                <Card.Title style={{ fontSize: `22px` }}>
                  {company.companyName}
                </Card.Title>
                <Card.Subtitle
                  style={{ fontSize: `12px`, color: `rgb(100, 100, 100)` }}
                >
                  Size: {company.size}
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
                  {company.companyName}
                </Card.Title>
                <Card.Subtitle
                  style={{ fontSize: `12px`, color: `rgb(100, 100, 100)` }}
                >
                  Size: {company.size}
                </Card.Subtitle>
              </Card.Header>
            </Card>
          );
        })}
      </Row>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalInfo.companyName}</Modal.Title>
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
            {modalInfo.size}
          </Card.Title>
          <Row style={{ justifyContent: `space-between`, marginTop:`5%` ,marginBottom: `4%` }}>
          {
          modalInfo.payInfo.map((val) => {
            return (
              <div style={{width:`auto`}}>
                <h1 className="SalaryCardHeader" style={{textAlign:`left`}}>{val.position}:</h1>
                <h2 className="SalaryCardSubHeader" style={{textAlign:`left`}}>Total Comp: ~${val.totalComp} USD</h2>
              </div>
            );
          })}
          </Row>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
