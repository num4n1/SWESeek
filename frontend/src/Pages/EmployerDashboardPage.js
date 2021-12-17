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

const exampleJobsPosted = [
  {
    JobID: "1",
    year: "2020",
    month: "January",
    day: "15",
    title: "Software Developer",
    description: "agjkagjegisoegjisgojeiojgseiogjseiogjeiojgsoiejgsegjio",
    jobURL: "https://www.google.com",
  },
  {
    JobID: "2",
    year: "2020",
    month: "January",
    day: "15",
    title: "Software Developer Intern",
    description: "agjkagjegisoegjisgojeiojgseiogjseiogjeiojgsoiejgsegjio",
    jobURL: "https://www.google.com",
  },
  {
    JobID: "3",
    year: "2020",
    month: "January",
    day: "15",
    title: "Software Developer Manager",
    description: "agjkagjegisoegjisgojeiojgseiogjseiogjeiojgsoiejgsegjio",
    jobURL: "https://www.google.com",
  },
];

export default function EmployerDashboardPage() {
  const companyName = "Google";
  const [showAddJob, setShowAddJob] = useState(false);
  const [jobs, setJobs] = useState(exampleJobsPosted);
  const [showApplicants, setShowApplicants] = useState(false);
  const [applicants, setApplicants] = useState();

  useEffect(() => {
    /*Axios.get("http://127.0.0.1:5000/api/getCompanyJobs", {
      token: localStorage.getItem("token"),
    })
    .then((res) => {
      setJobs(res.data);
    })
    .catch((res) => {
      console.log(res);
    })*/
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
      let date = document.getElementById("addJobStartDate");
      date = date.split("/");
      let month = date[0];
      let day = date[1];
      let year = date[2];

      Axios.post("http://127.0.0.1:5000/api/postJob", {
        token: localStorage.getItem("token"),
        year: year,
        month: month,
        day: day,
        title: document.getElementById("addJobTitle").value,
        description: document.getElementById("addJobDescription").value,
        jobURL: document.getElementById("addJobUrl").value,
      }).catch((res) => {
        console.log(res);
      });
    }
  }

  function validateFields() {}

  function deleteJob(id) {
    console.log("test");
    let newJobs = jobs;
    newJobs = newJobs.filter((job) => {
      if (job.JobID !== id) return true;
      else return false;
    });
    setJobs(newJobs);
    Axios.delete("http://127.0.0.1:5000/api/deleteJob", {
      token: localStorage.getItem("token"),
      jobId: id,
    })
  }

  function downloadJobApplicants(jobId){
    Axios.get("http://127.0.0.1:5000/api/getUsersWhoApplied", {
      token: localStorage.getItem("token"),
      JobID: jobId,
    })
    .then((res) => {
      //download files https://medium.com/yellowcode/download-api-files-with-react-fetch-393e4dae0d9e
    })
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
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {job.description}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    {job.month}/{job.day}/{job.year}
                  </Card.Subtitle>
                  <Card.Link href={job.jobURL}>Posting Link</Card.Link>
                  <Row style={{ marginTop: `5%` }}>
                    <Row>
                      <Button
                        onClick={() => downloadJobApplicants(job.JobID)}
                        style={{ width: `90%`, margin: `auto auto 5% auto` }}
                      >
                        Download Applicants Resumes
                      </Button>
                    </Row>
                    <Button
                      onClick={() => deleteJob(job.JobID)}
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
