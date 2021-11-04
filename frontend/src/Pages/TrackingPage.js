import {
  Col,
  Container,
  Dropdown,
  Row,
  ButtonGroup,
  Card,
  Modal,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import "../Styles/TrackingPageStyles.css";
import List from "../Components/List";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const exampleWishList = [
  {
    id: "123",
    companyName: "Apple",
    position: "Software Engineer Intern",
    link: "https://www.google.com",
    applicationDate: "Today",
    applicationStatus: "Wish List",
    startDate: "May 2021",
    description:
      "fsefesghadaaaaaaaagiohaighiahegiohaegoihaeioghoigheiohgiosehgiohseighaigheiohegihgesoihgseohgosgehiosehg",
  },
  {
    id: "144",
    companyName: "FaceBook",
    position: "Software Engineer Intern",
    link: "https://www.google.com",
    applicationDate: "Today",
    applicationStatus: "Wish List",
    startDate: "May 2021",
    description:
      "fsefesghagiohaighiahegiohaegoihaeioghoigheiohgiosehgiohseighaigheiohegihgesoihgseohgosgehiosehg",
  },
  {
    id: "366",
    companyName: "Netflix",
    position: "Software Engineer Intern",
    link: "https://www.google.com",
    applicationDate: "Today",
    applicationStatus: "Wish List",
    startDate: "May 2021",
    description:
      "fsefesghagiohaighiahegiohaegoihaeioghoigheiohgiosehgiohseighaigheiohegihgesoihgseohgosgehiosehg",
  },
];
const exampleApplied = [
  {
    id: "2535",
    companyName: "Google",
    position: "Software Engineer Intern",
    link: "https://www.google.com",
    applicationDate: "Today",
    applicationStatus: "Applied",
    startDate: "May 2021",
    description:
      "fsefesghagiohaighiahegiohaegoihaeioghoigheiohgiosehgiohseighaigheiohegihgesoihgseohgosgehiosehg",
  },
  {
    id: "333",
    companyName: "Microsoft",
    position: "Software Engineer Intern",
    link: "https://www.google.com",
    applicationDate: "Today",
    applicationStatus: "Applied",
    startDate: "May 2021",
    description:
      "fsefesghagiohaighiahegiohaegoihaeioghoigheiohgiosehgiohseighaigheiohegihgesoihgseohgosgehiosehg",
  },
];
const exampleInterview = [
  {
    id: "1484",
    companyName: "Twitch",
    position: "Software ",
    link: "https://www.google.com",
    applicationDate: "Today",
    applicationStatus: "Interview",
    startDate: "May 2021",
    description:
      "fsefesghagiohaighiahegiohaegoihaeioghoigheiohgiosehgiohseighaigheiohegihgesoihgseohgosgehiosehg",
  },
];
const exampleOffer = [
  {
    id: "111",
    companyName: "Amazon",
    position: "Software Engineer Intern fsef sfese",
    link: "https://www.google.com",
    applicationDate: "Today",
    applicationStatus: "Offer",
    startDate: "May 2021",
    description:
      "fsefesghagiohaighiahegiohaegoihaeioghoigheiohgiosehgiohseighaigheiohegihgesoihgseohgosgehiosehg",
  },
];
const exampleRegected = [
  {
    id: "34637",
    companyName: "Tesla",
    position: "Software Engineer Intern",
    link: "https://www.google.com",
    applicationDate: "Today",
    applicationStatus: "Regected",
    startDate: "May 2021",
    description:
      "fsefesghagiohaighiahegiohaegoihaeioghoigheiohgiosehgiohseighaigheiohegihgesoihgseohgosgehiosehg",
  },
];

export default function TrackingPage() {
  const [lists, setLists] = useState([
    {
      name: "2019 Hunt",
      jobs: [{ company: "Google" }, { company: "Facebook" }],
    },
    { name: "2020 Hunt", jobs: [{ company: "" }, { company: "" }] },
    { name: "2021 Hunt", jobs: [{ company: "" }, { company: "" }] },
  ]);
  const [currentList, setCurrentList] = useState(lists[0]);

  const [wishListItems, setWishListItems] = useState(exampleWishList);
  const [appliedItems, setAppliedItems] = useState(exampleApplied);
  const [interviewItems, setInterviewItems] = useState(exampleInterview);
  const [offerItems, setOfferItems] = useState(exampleOffer);
  const [regectedItems, setRegectedItems] = useState(exampleRegected);

  const [show, setShow] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setModalInfo(item);
    setShow(true);
  };

  const [columns, setColumns] = useState({
    1: {
      name: "Wishlist",
      items: wishListItems,
      count: wishListItems.length,
    },
    2: {
      name: "Applied",
      items: appliedItems,
      count: appliedItems.length,
    },
    3: {
      name: "Interview",
      items: interviewItems,
      count: interviewItems.length,
    },
    4: {
      name: "Offer",
      items: offerItems,
      count: offerItems.length,
    },
    5: {
      name: "Rejected",
      items: regectedItems,
      count: regectedItems.length,
    },
  });

  function changeList(list) {
    setCurrentList(list);
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
          count: sourceItems.length,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
          count: destItems.length,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  }

  function openStats(item) {}

  return (
    <Container fluid style={{ minHeight: `69.6vh`, xOverflow: `visible` }}>
      <Row style={{ marginTop: `2%` }}>
        <Col style={{ alignSelf: `center` }}>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle size="lg" className="ListSelectButton">
              Job List
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {lists.map((element) => {
                return (
                  <Dropdown.Item
                    onClick={() => {
                      changeList(element);
                    }}
                  >
                    {element.name}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>{" "}
        </Col>
        <Col>
          <h1 className="TrackingHeader">{currentList.name}</h1>
        </Col>
        <Col></Col>
      </Row>
      <Row style={{ minHeight: `60vh` }}>
        <div className="ListContainer">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div className="Column">
                  <h2 className="ColumnHeader">{column.name}</h2>
                  <h3 className="ColumnSubHeader">{column.count} Jobs</h3>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided) => (
                                <Card
                                  className="JobCard"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Card.Body>
                                    <Row>
                                      <Col xs={2}>
                                        <img
                                          style={{marginTop:`15%`}}
                                          className="JobCardImage"
                                          src="/Assets/facebookicon.png"
                                          alt=""
                                        />
                                      </Col>
                                      <Col xs={10}>
                                        <Card.Title
                                          style={{ textOverflow: `ellipsis` }}
                                        >
                                          {item.position.length > 24
                                            ? item.position.substring(0, 24) +
                                              "..."
                                            : item.position}
                                        </Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">
                                          {item.companyName}
                                        </Card.Subtitle>
                                        <Row>
                                          <Col style={{ alignSelf: `start` }}>
                                            <Card.Link href={item.link}>
                                              Posting
                                            </Card.Link>
                                          </Col>
                                          <Col
                                            style={{
                                              alignSelf: `start`,
                                              textAlign: `end`,
                                            }}
                                          >
                                            <img
                                              src="Assets/expand.png"
                                              alt=""
                                              onClick={() => handleShow(item)}
                                              style={{
                                                height: `18px`,
                                                paddingRight: `15%`,
                                                margin: `0`,
                                              }}
                                            />
                                          </Col>
                                        </Row>
                                      </Col>
                                    </Row>
                                  </Card.Body>
                                </Card>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      </Row>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Job Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card.Title style={{ textOverflow: `ellipsis` }}>
            {modalInfo.position}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            { modalInfo.companyName}
          </Card.Subtitle>
          <div style={{textAlign:`left`}}>
            <Card.Text style={{margin:`2% 0`}}><span style={{fontWeight:`bold`}}>Start Date:</span> {modalInfo.startDate}</Card.Text>
            <Card.Text style={{margin:`2% 0`}}><span style={{fontWeight:`bold`}}>Application Date:</span> {modalInfo.applicationDate}</Card.Text>
            <Card.Text style={{margin:`2% 0`, overflowWrap:`anywhere`}}><span style={{fontWeight:`bold`}}>Job Description:</span> {modalInfo.description}</Card.Text>
            <Card.Link href={modalInfo.link}>Posting</Card.Link>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
