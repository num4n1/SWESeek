import Axios from "axios";
import { useEffect, useState } from "react";
import {
  Container,
  DropdownButton,
  Dropdown,
  Row,
  Form,
  FormLabel,
  Button,
  Card,
  Modal,
  Col,
} from "react-bootstrap";
import "../Styles/JobsPageStyles.css";

const exampleJobs = [
  {
    id: "1",
    companyName: "Google",
    industry: "Tech",
    size: "10000+",
    Title: "SWE",
    Description:
      "ageeeeeeeeeeeeeeeeeeaggggggggggggggggggggggggggggggsgkeosekgopjsegopjesopgjopsegjopjgpjsegpojseg",
    url: "https://www.google.com",
  },
  {
    id: "2",
    companyName: "Amazon",
    industry: "Tech",
    size: "10000+",
    Title: "SWE",
    Description:
      "ageeeeeeeeeeeeeeeeeeaggggggggggggggggggggggggggggggsgkeosekgopjsegopjesopgjopsegjopjgpjsegpojseg",
    url: "https://www.google.com",
  },
  {
    id: "3",
    companyName: "GM",
    industry: "Automotive",
    size: "10000+",
    Title: "SWE",
    Description:
      "ageeeeeeeeeeeeeeeeeeaggggggggggggggggggggggggggggggsgkeosekgopjsegopjesopgjopsegjopjgpjsegpojseg",
    url: "https://www.google.com",
  },
  {
    id: "4",
    companyName: "Health Company",
    industry: "Health",
    size: "10000+",
    Title: "SWE",
    Description:
      "ageeeeeeeeeeeeeeeeeeaggggggggggggggggggggggggggggggsgkeosekgopjsegopjesopgjopsegjopjgpjsegpojseg",
    url: "https://www.google.com",
  },
  {
    id: "5",
    companyName: "JP Morgan",
    industry: "Banking",
    size: "10000+",
    Title: "SWE",
    Description:
      "ageeeeeeeeeeeeeeeeeeaggggggggggggggggggggggggggggggsgkeosekgopjsegopjesopgjopsegjopjgpjsegpojseg",
    url: "https://www.google.com",
  },
  {
    id: "6",
    companyName: "Netflix",
    industry: "Tech",
    size: "10000+",
    Title: "SWE",
    Description:
      "ageeeeeeeeeeeeeeeeeeaggggggggggggggggggggggggggggggsgkeosekgopjsegopjesopgjopsegjopjgpjsegpojseg",
    url: "https://www.google.com",
  },
];

const exampleDocuments = [
  {
    fileName: "file1",
    dNo: "1",
    dateUploaded: "10/2/5",
    file: "filehere",
    type: "resume",
  },
  {
    fileName: "file2",
    dNo: "2",
    dateUploaded: "10/2/5",
    file: "filehere",
    type: "resume",
  },
  {
    fileName: "file3",
    dNo: "3",
    dateUploaded: "10/2/5",
    file: "filehere",
    type: "coverLetter",
  },
  {
    fileName: "file4",
    dNo: "4",
    dateUploaded: "10/2/5",
    file: "filehere",
    type: "coverLetter",
  },
];

export default function JobsPage() {
  const [jobs, setJobsToShow] = useState(exampleJobs);
  const [resultsToShow, setResultsToShow] = useState(jobs);
  const [showApplyJob, setShowApplyJob] = useState(false);
  const [currJob, setCurrJob] = useState({});
  const [documents, setDocuments] = useState(exampleDocuments);
  const [showAddDoc, setShowAddDoc] = useState(false);
  const [resume, setResume] = useState();
  const [coverLetter, setCoverLetter] = useState();


  useEffect(() => {
    // Checks for token in storage, indicating signed in.
    if(localStorage.getItem("token") == null){
      window.location.href = "http://localhost:3000/login";
    }

    Axios.get("http://127.0.0.1:5000/api/jobPostings", {})
    .then((res) => {
      setJobsToShow(res);
    })

    Axios.get("http://127.0.0.1:5000/api/getUserDocuments", {
      params: {
        token: localStorage.getItem("token"),
      }
    })
    .then((res) => {
      setDocuments(res.data);
    })
  }, [])

  function handleCloseAddDoc() {
    setShowAddDoc(false);
  }

  function handleCloseApplyJob() {
    setShowApplyJob(false);
  }

  function handleSearch(e) {
    if (e === "Enter") {
      let query = document.getElementById("searchBar").value.toLowerCase();
      if (query === "") {
        setResultsToShow(jobs);
      } else {
        let res = jobs.filter((job) => {
          if (
            job.companyName.toLowerCase() === query ||
            job.industry.toLowerCase() === query ||
            job.Title.toLowerCase() === query
          ) {
            return true;
          } else {
            return false;
          }
        });

        if (res.length === 0) {
          document.getElementById("errorMessage").classList.add("ShowError");
        } else {
          document.getElementById("errorMessage").classList.remove("ShowError");
          setResultsToShow(res);
        }
      }
    }
  }

  function apply(id) {
    setCurrJob(jobs.find((job) => (job.id = id)));
    setShowApplyJob(true);
  }

  function applyForJob(id, resumeDNo, coverDno) {
    let temp = [resumeDNo];
    if(coverDno !== undefined){
      temp.push(coverDno);
    }
    Axios.post("http://127.0.0.1:5000/api/apply", {
      token: localStorage.getItem("token"),
      JobID: id,
      dNo:  temp,
    })
  }
  
  function submitDocuments(resume, coverLetter){
    console.log(resume, coverLetter)
    Axios.post("http://127.0.0.1:5000/api/addUserDocument", {
      token: localStorage.getItem("token"),
      file: resume,
      type: "resume",
    })
    Axios.post("http://127.0.0.1:5000/api/addUserDocument", {
      token: localStorage.getItem("token"),
      file: coverLetter,
      type: "coverLetter",
    })
  }

  return (
    <Container style={{ minHeight: `69.5vh` }}>
      <h1 className="JobsHeader">Discover oportunities</h1>
      <Form.Group style={{ textAlign: `left` }}>
        <FormLabel className="SearchLabel">
          Search Companys, Industrys and Job Titles
        </FormLabel>
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
          <Button onClick={() => setShowAddDoc(true)} style={{width:`15%`, marginLeft:`1%`}}>Upload Documents</Button>
        </Row>
      </Form.Group>
      <Row style={{ justifyContent: `space-evenly` }}>
        {resultsToShow.map((job) => {
          return (
            <Card style={{ width: "18rem", margin: `1% 0` }}>
              <Card.Body>
                <Card.Title>{job.companyName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {job.Title}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  {job.industry}, {job.size}
                </Card.Subtitle>
                <Card.Text>{job.Description}</Card.Text>
                <Card.Link
                  style={{ cursor: `pointer` }}
                  onClick={() => apply(job.id)}
                >
                  Apply
                </Card.Link>
              </Card.Body>
            </Card>
          );
        })}
      </Row>

      <Modal centered show={showApplyJob} onHide={handleCloseApplyJob}>
        <Modal.Header closeButton>
          <Modal.Title>Apply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <FormLabel className="SearchLabel">Resume</FormLabel>
              <Form.Select style={{ width: `100%` }} id="addResume">
                {documents.length === 0 ? (
                  <option>Upload a resume first</option>
                ) : (
                  documents.map((doc) => {
                    if (doc.type === "resume") {
                      return <option value={doc.dNo}>{doc.fileName}</option>;
                    }
                  })
                )}
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormLabel className="SearchLabel" style={{ marginTop: `3%` }}>
                Cover Letter (optional)
              </FormLabel>
              <Form.Select style={{ width: `100%` }} id="addCover">
                {documents.length === 0 ? (
                  <option>Upload a resume first</option>
                ) : (
                  documents.map((doc) => {
                    if (doc.type === "coverLetter") {
                      return <option value={doc.dNo}>{doc.fileName}</option>;
                    }
                  })
                )}
              </Form.Select>
            </Col>
          </Row>
          <Button
            onClick={() => applyForJob(currJob.id, document.getElementById("addResume").value, document.getElementById("addCover").value)}
            id="submitButton"
            style={{ marginTop: `3%` }}
          >
            Submit
          </Button>
        </Modal.Body>
      </Modal>
      <Modal centered show={showAddDoc} onHide={handleCloseAddDoc}>
        <Modal.Header closeButton>
          <Modal.Title>Add Documents</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{textAlign:`left`}}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Resume</Form.Label>
            <Form.Control style={{ width: `60%` }} type="file" onChange={(e) => setResume(e.target.files)}/>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Uploaded Cover Letter</Form.Label>
            <Form.Control style={{ width: `60%` }} type="file" onChange={(e) => setCoverLetter(e.target.files)}/>
          </Form.Group>
          <Button onClick={() => submitDocuments(resume, coverLetter)}>Submit</Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
