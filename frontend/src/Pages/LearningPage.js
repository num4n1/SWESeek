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
    id: "1",
    tag: ["Trees"],
    topic: ["Learn Tree structures and their algorithms"],
    link: "https://www.youtube.com",
  },
  {
    id: "2",
    tag: ["LinkList"],
    topic: ["Learn Linked List structures and their algorithms"],
    link: "https://www.youtube.com",
  },
  {
    id: "3",
    tag: ["HashMaps"],
    topic: ["Learn HashMaps and how to use them"],
    link: "https://www.youtube.com",
  },
  {
    id: "4",
    tag: ["Strings"],
    topic: ["Learn Strings and their algorithms"],
    link: "https://www.youtube.com",
  },
];

const exampleQuestionResources = [
  {
    id: "5",
    tag: ["Trees", "Strings"],
    qPrompt:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    questionNum: "#1 Two Sum",
    solutionVideo: {
      link: "https://www.youtube.com",
      description: "Learn to Solve Two Sum",
    },
  },
  {
    id: "6",
    tag: ["Trees", "Strings"],
    qPrompt:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    questionNum: "#1 Two Sum",
    solutionVideo: {
      link: "https://www.youtube.com",
      description: "Learn to Solve Two Sum",
    },
  },
  {
    id: "7",
    tag: ["Trees", "Strings"],
    qPrompt:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    questionNum: "#1 Two Sum",
    solutionVideo: {
      link: "https://www.youtube.com",
      description: "Learn to Solve Two Sum",
    },
  },
  {
    id: "8",
    tag: ["Trees", "Strings"],
    qPrompt:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    questionNum: "#1 Two Sum",
    solutionVideo: {
      link: "https://www.youtube.com",
      description: "Learn to Solve Two Sum",
    },
  },
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
    Axios.get("http://localhost:3000/api/learningResources", {})
    .then((res) => {
      setLearningResources(res.data);
    })

    Axios.get("http://localhost:3000/api/exampleQuestionResources", {})
    .then((res) => {
      setQuestionResources(res.data);
    })

    let temp;
    Axios.get("http://localhost:3000/api/savedResources", {
      token: localStorage.getItem("token"),
    })
    .then((res) => {
      temp = res.data;
    })

    Axios.get("http://localhost:3000/api/savedPracticeResources", {
      token: localStorage.getItem("token"),
    })
    .then((res) => {
      temp.push(...res.data);
    })

    setStarredResources(temp);
  }, [])

  function openCard(example) {
    setModalData(example);
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }

  function addToFavorite(id) {
    let a;
    if (!(starredResources.filter((element) => element.id === id).length > 0)) {
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
      }else{
        a = learningResources.filter((element) => {
          if(element.id !== id) return true;
          else return false;
        })
        setLearningResources(a);
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
      }else{
        setLearningResources([...learningResources, a[0]]);
      }
    }
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
                          onClick={() => addToFavorite(example.id)}
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
                    {example.tag.map((tag) => {
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
                        {example.tag.map((tag) => {
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
                          onClick={() => addToFavorite(example.id)}
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
                      {example.tag.map((tag) => {
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
                        onClick={() => addToFavorite(example.id)}
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
                        onClick={() => addToFavorite(example.id)}
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
                  {example.tag.map((tag) => {
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
          {modalData.tag.map((tag) => {
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
