import {
  Container,
  Form,
  Row,
  Button,
  Card,
  FormLabel,
  Badge,
  Modal,
} from "react-bootstrap";
import { useState } from "react";
import "../Styles/SalariesPageStyles.css";
import "../Styles/LearningPageStyles.css";

const exampleLearningResources = [
  {
    tag: ["Trees"],
    topic: ["Learn Tree structures and their algorithms"],
    link: "https://www.youtube.com",
  },
  {
    tag: ["LinkList"],
    topic: ["Learn Linked List structures and their algorithms"],
    link: "https://www.youtube.com",
  },
  {
    tag: ["HashMaps"],
    topic: ["Learn HashMaps and how to use them"],
    link: "https://www.youtube.com",
  },
  {
    tag: ["Strings"],
    topic: ["Learn Strings and their algorithms"],
    link: "https://www.youtube.com",
  },
];

const exampleQuestionResources = [
  {
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
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(questionResources[0]);

  function openCard(example) {
    setModalData(example);
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }

  return (
    <Container style={{ minHeight: `77vh`, textAlign: `left` }}>
      <h1 className="SalaryHeader">Learn how to ace the interview</h1>
      <h2 className="SubHeader">Learn data structures and algo's</h2>
      <Row style={{ justifyContent: `space-between` }}>
        {learningResources.map((example) => {
          return (
            <Card
              onClick={() => window.open(example.link, "_blank").focus()}
              className="resourceCard"
            >
              <Card.Header>
                <Card.Title>
                  {example.tag.map((tag) => {
                    return (
                      <Badge style={{ margin: `1%` }} bg="primary">
                        {tag}
                      </Badge>
                    );
                  })}
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
            <Card onClick={() => openCard(example)} className="resourceCard">
              <Card.Header>
                <Card.Title style={{ fontSize: `22px` }}>
                  {example.questionNum}
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
            <p style={{textAlign:`left`}}>{modalData.qPrompt}</p>
            <Card.Title style={{textAlign:`left`}}>Solution</Card.Title>
            <Card.Link href={modalData.solutionVideo.link}>{modalData.solutionVideo.description}</Card.Link>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
