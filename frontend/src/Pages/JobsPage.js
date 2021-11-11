import { useState } from "react";
import {
  Container,
  DropdownButton,
  Dropdown,
  Row,
  Form,
  FormLabel,
  Button,
  Card,
} from "react-bootstrap";
import "../Styles/JobsPageStyles.css";

const exampleJobs = [
  {
    companyName: "Google",
    industry: "Tech",
    size: "10000+",
    Title: "SWE",
    Description:
      "ageeeeeeeeeeeeeeeeeeaggggggggggggggggggggggggggggggsgkeosekgopjsegopjesopgjopsegjopjgpjsegpojseg",
    url: "https://www.google.com",
  },
  {
    companyName: "Amazon",
    industry: "Tech",
    size: "10000+",
    Title: "SWE",
    Description:
      "ageeeeeeeeeeeeeeeeeeaggggggggggggggggggggggggggggggsgkeosekgopjsegopjesopgjopsegjopjgpjsegpojseg",
    url: "https://www.google.com",
  },
  {
    companyName: "GM",
    industry: "Automotive",
    size: "10000+",
    Title: "SWE",
    Description:
      "ageeeeeeeeeeeeeeeeeeaggggggggggggggggggggggggggggggsgkeosekgopjsegopjesopgjopsegjopjgpjsegpojseg",
    url: "https://www.google.com",
  },
  {
    companyName: "Health Company",
    industry: "Health",
    size: "10000+",
    Title: "SWE",
    Description:
      "ageeeeeeeeeeeeeeeeeeaggggggggggggggggggggggggggggggsgkeosekgopjsegopjesopgjopsegjopjgpjsegpojseg",
    url: "https://www.google.com",
  },
  {
    companyName: "JP Morgan",
    industry: "Banking",
    size: "10000+",
    Title: "SWE",
    Description:
      "ageeeeeeeeeeeeeeeeeeaggggggggggggggggggggggggggggggsgkeosekgopjsegopjesopgjopsegjopjgpjsegpojseg",
    url: "https://www.google.com",
  },
  {
    companyName: "Netflix",
    industry: "Tech",
    size: "10000+",
    Title: "SWE",
    Description:
      "ageeeeeeeeeeeeeeeeeeaggggggggggggggggggggggggggggggsgkeosekgopjsegopjesopgjopsegjopjgpjsegpojseg",
    url: "https://www.google.com",
  },
];

export default function JobsPage() {
  const [jobs, jobsToShow] = useState(exampleJobs);
  const [resultsToShow, setResultsToShow] = useState(jobs);

  function handleSearch(e) {
    if (e === "Enter") {
      let query = document.getElementById("searchBar").value.toLowerCase();
      if(query === ""){
        setResultsToShow(jobs);
      }else{
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

  return (
    <Container style={{ minHeight: `69.5vh` }}>
      <h1 className="JobsHeader">Discover oportunities</h1>
      <Form.Group style={{ textAlign: `left` }}>
        <FormLabel className="SearchLabel">Search Companys, Industrys and Job Titles</FormLabel>
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
                <Card.Link href={job.url}>Apply</Card.Link>
              </Card.Body>
            </Card>
          );
        })}
      </Row>
    </Container>
  );
}
