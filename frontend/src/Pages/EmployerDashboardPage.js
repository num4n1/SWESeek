import "../Styles/EmployerDashboardStyles.css";
import {
  Container,
  Button,
  Form,
  Modal,
  Row,
  Col,
  FormLabel,
  Card,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import Axios from "axios";



export default function EmployerDashboardPage() {
  const companyName = localStorage.getItem("token");
  const [showAddJob, setShowAddJob] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showApplicants, setShowApplicants] = useState(false);
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    Axios.get("http://127.0.0.1:5000/api/getCompanyJobs", {
      params:{
        token: localStorage.getItem("token"),
      }
    })
    .then((res) => {
      setJobs(res.data);
    })
    .catch((res) => {
      console.log(res);
    })
  }, []);

  function handleCloseAddJob() {
    setShowAddJob(false);
  }

  function addJob() {
    setShowAddJob(true);
  }

  function addNewJob() {
    setShowAddJob(false);
    if (validateFields()) {
      Axios.post("http://127.0.0.1:5000/api/addJobPosting", {
        token: localStorage.getItem("token"),
        startDate: document.getElementById("addJobStartDate").value,
        position: document.getElementById("addJobTitle").value,
        description: document.getElementById("addJobDescription").value,
        link: document.getElementById("addJobUrl").value,
      }).catch((res) => {
        console.log(res);
      });
    }
    window.location.href = "http://localhost:3000/employerdashboard";
  }

  function validateFields() {
    if(document.getElementById("addJobStartDate").value.length < 1){
      return false;
    }
    if(document.getElementById("addJobTitle").value.length < 1){
      return false;
    }
    if(document.getElementById("addJobDescription").value.length < 1){
      return false;
    }
    if(document.getElementById("addJobUrl").value.length < 1){
      return false;
    }
    return true;
  }

  function deleteJob(id, position) {
    let newJobs = jobs;
    newJobs = newJobs.filter((job) => {
      if (job.JobID !== id) return true;
      else return false;
    });
    setJobs(newJobs);
    Axios.delete("http://127.0.0.1:5000/api/deleteJob", {
      params: {
        token: localStorage.getItem("token"),
        position: position,
        jobId: id,
      }
    })
  }

  function downloadJobApplicants(jobId){
    Axios.get("http://127.0.0.1:5000/api/getUsersWhoApplied", {
      params: {
        token: localStorage.getItem("token"),
        JobID: jobId,
      }
    })
    .then((res) => {
      console.log(res)
      setApplicants(res.data);
    })
  }

  function openApplicants(id){
    downloadJobApplicants(id);
    setShowApplicants(true);
  }

  return (
    <div style={{ minHeight: `73.5vh` }}>
      <Container style={{ paddingTop: `4%`, textAlign: `left` }}>
        <h1 className="dashboardHeader">{companyName} Dashboard</h1>
        <Form.Group style={{ textAlign: `left` }}>
          <Button
            onClick={addJob}
            size="md"
            style={{ alignSelf: `left`, width: `130px` }}
          >
            Post new job
          </Button>
        </Form.Group>
        <h1 className="dashboardSubHeader">Your postings</h1>
        <Row style={{ justifyContent: `space-evenly` }}>
          {jobs.map((job) => {
            return (
              <Card style={{ width: "18rem", margin: `1% 0` }}>
                <Card.Body>
                  <Card.Title>{job.position}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {job.description}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    {job.startDate}
                  </Card.Subtitle>
                  <Card.Link style={{cursor:`pointer`}} href={job.link}>Posting Link</Card.Link>
                  <Row style={{ marginTop: `5%` }}>
                    <Row>
                      <Button
                        onClick={() => openApplicants(job.JobID)}
                        style={{ width: `90%`, margin: `auto auto 5% auto` }}
                      >
                        Download Applicants Resumes
                      </Button>
                    </Row>
                    <Button
                      onClick={() => deleteJob(job.JobID, job.position)}
                      style={{ width: `40%`, margin: `auto` }}
                    >
                      Delete
                    </Button>
                  </Row>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
        <Modal centered show={showApplicants} onHide={() => setShowApplicants(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Applicants</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              applicants.map((applicant) => {
                return(
                  <div>
                    <a href={"http://127.0.0.1:5000/api/getUserDocuments?token=" + applicant.user + ":" + "&fileName=" + applicant.fileName} >{applicant.type}: {applicant.fileName}</a>
                  </div>
                )
              })
            }
          </Modal.Body>
        </Modal>
        <Modal centered show={showAddJob} onHide={handleCloseAddJob}>
          <Modal.Header closeButton>
            <Modal.Title>Add Job</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <FormLabel className="SearchLabel">Title</FormLabel>
                <Form.Control
                  style={{ width: `100%` }}
                  placeholder="Software Engineer"
                  id="addJobTitle"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <FormLabel style={{ marginTop: `3%` }} className="SearchLabel">
                  Start date (m/d/y)
                </FormLabel>
                <Form.Control
                  style={{ width: `100%` }}
                  placeholder="1/30/2022"
                  id="addJobStartDate"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <FormLabel style={{ marginTop: `3%` }} className="SearchLabel">
                  Description
                </FormLabel>
                <Form.Control
                  style={{ width: `100%` }}
                  placeholder="Will be working with C++ and SQL"
                  id="addJobDescription"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <FormLabel style={{ marginTop: `3%` }} className="SearchLabel">
                  URL
                </FormLabel>
                <Form.Control
                  style={{ width: `100%` }}
                  placeholder="https:/www.sweseek.com/careers"
                  id="addJobUrl"
                />
              </Col>
            </Row>
            <Button
              onClick={addNewJob}
              id="submitButton"
              style={{ marginTop: `3%` }}
            >
              Submit
            </Button>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}
