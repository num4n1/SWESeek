import {
  Container,
  Form,
  Row,
  Button,
  Card,
  FormLabel,
  Badge,
  Modal,
  Col,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import Axios from 'axios';
import "../Styles/SalariesPageStyles.css";
import "../Styles/LearningPageStyles.css";

const exampleLearningResources = [
  {
    rId: "1",
    tags: ["Trees"],
    topic: ["Learn Tree structures and their algorithms"],
    link: "https://www.youtube.com",
  }
];

const exampleQuestionResources = [
  {
    pId: "5",
    tags: ["Trees", "Strings"],
    qPrompt:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    questionNum: "#1 Two Sum",
    solutionVideo: {
      link: "https://www.youtube.com",
      description: "Learn to Solve Two Sum",
    },
  }
];

export default function LearningPage() {
  const [learningResources, setLearningResources] = useState(
    exampleLearningResources
  );
  const [questionResources, setQuestionResources] = useState(
    exampleQuestionResources
  );
  const [starredResources, setStarredResources] = useState([]);

  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(questionResources[0]);

  useEffect(() => {
    // Checks for token in storage, indicating signed in.
    if(localStorage.getItem("token") == null){
      window.location.href = "http://localhost:3000/login";
    }

    Axios.get("http://127.0.0.1:5000/api/learningResources", {})
    .then((res) => {
      console.log(res.data)
      setLearningResources(res.data);
    })

    Axios.get("http://127.0.0.1:5000/api/exampleQuestionResources", {})
    .then((res) => {
      setQuestionResources(res.data);
    })

    let temp = [];
    Axios.get("http://127.0.0.1:5000/api/savedResources", {
      params: {
        token: localStorage.getItem("token"),
      }
    })
    .then((res) => {
      temp = res.data;
    })

    Axios.get("http://127.0.0.1:5000/api/savedPracticeResources", {
      params: {
        token: localStorage.getItem("token"),
      }
    })
    .then((res) => {
      temp.push(...res.data);
      console.log(temp)
      setStarredResources(temp);
    })
    .catch((res) => {
      setStarredResources(temp);
    })
  }, [])

  function openCard(example) {
    setModalData(example);
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }

  function addToFavorite(rId, qId) {
    let a;
    console.log(qId)
    if(rId !== undefined){
      if (!(starredResources.filter((element) => element.rId === rId).length > 0)) {
        let res = learningResources.filter((item) => {
          if (item.rId === rId) return true;
          else return false;
        });
        Axios.post("http://127.0.0.1:5000/api/setSavedLearningResources", {
          token: localStorage.getItem("token"),
          id: res[0].rId,
        })
        
        res = res[0];
        setStarredResources([...starredResources, res]);
      }else{
        let res = starredResources.filter((element) => {
          if(element.rId !== rId) return true;
          else return false;
        })
        a = starredResources.filter((element) => {
          if(element.rId === rId) return true;
          else return false;
        })
        setStarredResources(res);
        Axios.delete("http://127.0.0.1:5000/api/deleteSavedResources", {
          params: {
            token: localStorage.getItem("token"),
            id: a[0].rId,
          }
        })
      }
    }
    else{
      if (!(starredResources.filter((element) => element.qId === qId).length > 0)) {
        let res = questionResources.filter((item) => {
          if (item.qId === qId) return true;
          else return false;
        });
        Axios.post("http://127.0.0.1:5000/api/setSavedPracticeResources", {
          token: localStorage.getItem("token"),
          id: res[0].qId,
        })
        
        res = res[0];
        setStarredResources([...starredResources, res]);
      }else{
        let res = starredResources.filter((element) => {
          if(element.qId !== qId) return true;
          else return false;
        })
        a = starredResources.filter((element) => {
          if(element.qId === qId){
            console.log(element);
            return true;
          } 
          else return false;
        })
        setStarredResources(res);
        console.log(a[0])
        Axios.delete("http://127.0.0.1:5000/api/deleteSavedPracticeResources", {
          params: {
            token: localStorage.getItem("token"),
            id: a[0].qId,
          }
        })
        }
      }
    

    /*if (!(starredResources.filter((element) => element.id === id).length > 0)) {
      let res = learningResources.filter((item) => {
        if (item.id === id) return true;
        else return false;
      });
      if (res.length === 0) {
        res = questionResources.filter((item) => {
          if (item.id === id) return true;
          else return false;
        });
        a = questionResources.filter((element) => {
          if(element.id !== id) return true;
          else return false;
        })
        setQuestionResources(a);
        Axios.post("http://127.0.0.1:5000/api/setSavedPracticeResources", {
          token: localStorage.getItem("token"),
          id: res[0].id
        })
      }else{
        a = learningResources.filter((element) => {
          if(element.id !== id) return true;
          else return false;
        })
        setLearningResources(a);
        Axios.post("http://127.0.0.1:5000/api/setSavedLearningResources", {
          token: localStorage.getItem("token"),
          id: res[0].id,
        })
      }
      res = res[0];
      setStarredResources([...starredResources, res]);
    }else{
      let res = starredResources.filter((element) => {
        if(element.id !== id) return true;
        else return false;
      })
      a = starredResources.filter((element) => {
        if(element.id === id) return true;
        else return false;
      })
      setStarredResources(res);
      if("qPrompt" in a[0]){
        setQuestionResources([...questionResources, a[0]]);
        Axios.delete("http://127.0.0.1:5000/api/deleteSavedPracticeResources", {
          params: {
            token: localStorage.getItem("token"),
            id: a[0].qId,
          }
        })
      }else{
        Axios.delete("http://127.0.0.1:5000/api/deleteSavedResources", {
          params: {
            token: localStorage.getItem("token"),
            id: a[0].rId,
          }
        })
        setLearningResources([...learningResources, a[0]]);
      }
    } */
  }

  return (
    <Container style={{ minHeight: `77vh`, textAlign: `left` }}>
      <h1 className="SalaryHeader">Learn how to ace the interview</h1>
      {starredResources.length !== 0 ? (
        <h2 className="SubHeader">Starred Resources</h2>
      ) : (
        <div></div>
      )}
      <Row style={{ justifyContent: `space-between` }}>
        {starredResources.map((example) => {
          if ("qPrompt" in example) {
            return (
              <Card className="resourceCard">
                <Card.Header>
                  <Card.Title style={{ fontSize: `22px` }}>
                    <Row>
                      <Col onClick={() => openCard(example)}>
                        {example.questionNum}
                      </Col>
                      <Col>
                        <h1
                          onClick={() => addToFavorite(undefined, example.qId)}
                          style={{ marginLeft: `95%` }}
                          class="star filled"
                        >
                          &#9733;
                        </h1>
                      </Col>
                    </Row>
                  </Card.Title>
                  <Card.Subtitle
                    style={{ fontSize: `12px`, color: `rgb(100, 100, 100)` }}
                  >
                    {example.tags.map((tag) => {
                      return (
                        <Badge style={{ margin: `1%` }} bg="primary">
                          {tag}
                        </Badge>
                      );
                    })}
                  </Card.Subtitle>
                </Card.Header>
              </Card>
            );
          } else {
            return (
              <Card className="resourceCard">
                <Card.Header>
                  <Card.Title>
                    <Row>
                      <Col
                        onClick={() =>
                          window.open(example.link, "_blank").focus()
                        }
                      >
                        {example.tags.map((tag) => {
                          return (
                            <Badge
                              style={{ margin: `1%`, width: `auto` }}
                              bg="primary"
                            >
                              {tag}
                            </Badge>
                          );
                        })}
                      </Col>
                      <Col style={{ width: `20%` }}>
                        <h1
                          onClick={() => addToFavorite(example.rId, undefined)}
                          style={{ marginLeft: `95%` }}
                          class="star filled"
                        >
                          &#9733;
                        </h1>
                      </Col>
                    </Row>
                  </Card.Title>
                  <Card.Subtitle
                    style={{ fontSize: `14px`, color: `rgb(100, 100, 100)` }}
                  >
                    {example.topic}
                  </Card.Subtitle>
                </Card.Header>
              </Card>
            );
          }
        })}
      </Row>
      <h2 className="SubHeader">Learn data structures and algo's</h2>
      <Row style={{ justifyContent: `space-between` }}>
        {learningResources.map((example) => {
          return (
            <Card className="resourceCard">
              <Card.Header>
                <Card.Title>
                  <Row>
                    <Col
                      onClick={() =>
                        window.open(example.link, "_blank").focus()
                      }
                    >
                      {example.tags.map((tag) => {
                        return (
                          <Badge
                            style={{ margin: `1%`, width: `auto` }}
                            bg="primary"
                          >
                            {tag}
                          </Badge>
                        );
                      })}
                    </Col>
                    <Col style={{ width: `20%` }}>
                      <h1
                        onClick={() => {
                          addToFavorite(example.rId, undefined)
                        } }
                        style={{ marginLeft: `95%` }}
                        class="star"
                      >
                        &#9733;
                      </h1>
                    </Col>
                  </Row>
                </Card.Title>
                <Card.Subtitle
                  style={{ fontSize: `14px`, color: `rgb(100, 100, 100)` }}
                >
                  {example.topic}
                </Card.Subtitle>
              </Card.Header>
            </Card>
          );
        })}
      </Row>
      <h2 className="SubHeader">Practice your skills</h2>
      <Row style={{ justifyContent: `space-between`, marginBottom: `4%` }}>
        {questionResources.map((example) => {
          return (
            <Card className="resourceCard">
              <Card.Header>
                <Card.Title style={{ fontSize: `22px` }}>
                  <Row>
                    <Col onClick={() => openCard(example)}>
                      {example.questionNum}
                    </Col>
                    <Col>
                      <h1
                        onClick={() => addToFavorite(undefined, example.qId)}
                        style={{ marginLeft: `95%` }}
                        class="star"
                      >
                        &#9733;
                      </h1>
                    </Col>
                  </Row>
                </Card.Title>
                <Card.Subtitle
                  style={{ fontSize: `12px`, color: `rgb(100, 100, 100)` }}
                >
                  {example.tags.map((tag) => {
                    return (
                      <Badge style={{ margin: `1%` }} bg="primary">
                        {tag}
                      </Badge>
                    );
                  })}
                </Card.Subtitle>
              </Card.Header>
            </Card>
          );
        })}
      </Row>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.questionNum}</Modal.Title>
          {modalData.tags.map((tag) => {
            return (
              <Badge style={{ margin: `1%` }} bg="primary">
                {tag}
              </Badge>
            );
          })}
        </Modal.Header>
        <Modal.Body>
          <p style={{ textAlign: `left` }}>{modalData.qPrompt}</p>
          <Card.Title style={{ textAlign: `left` }}>Solution</Card.Title>
          <Card.Link href={modalData.solutionVideo.link}>
            {modalData.solutionVideo.description}
          </Card.Link>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
