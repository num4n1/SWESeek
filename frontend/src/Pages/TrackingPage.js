import { Col, Container, Dropdown, Row, ButtonGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import "../Styles/TrackingPageStyles.css";
import List from "../Components/List";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const finalSpaceCharacters = [
  {
    id: "gary",
    name: "Gary Goodspeed",
    thumb: "./Assets/leef.png",
  },
  {
    id: "steve",
    name: "Steve Goodspeed",
    thumb: "./Assets/leef.png",
  },
  {
    id: "Tim",
    name: "Tim Goodspeed",
    thumb: "./Assets/leef.png",
  },
];

export default function TrackingPage() {
  const [lists, setLists] = useState([{}]);
  const [currentList, setCurrentList] = useState(lists[0]);
  const [characters, setCharacters] = useState(finalSpaceCharacters);

  useEffect(() => {
    generateMockData();
  }, []);

  function generateMockData() {
    setLists([
      {
        name: "2019 Hunt",
        jobs: [{ company: "Google" }, { company: "Facebook" }],
      },
      { name: "2020 Hunt", jobs: [{ company: "" }, { company: "" }] },
      { name: "2021 Hunt", jobs: [{ company: "" }, { company: "" }] },
    ]);
  }

  function changeList(list) {
    setCurrentList(list);
  }

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCharacters(items);
  }

  return (
    <Container style={{ minHeight: `73vh` }}>
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
      <Row>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <div>
                  <Row>
                <Col>
                <ul
                  className="characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {characters.map(({ id, name, thumb }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="characters-thumb">
                              <img src={thumb} alt={`${name} Thumb`} />
                            </div>
                            <p>{name}</p>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
                </Col>
                <Col>
                <ul
                  className="characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {characters.map(({ id, name, thumb }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="characters-thumb">
                              <img src={thumb} alt={`${name} Thumb`} />
                            </div>
                            <p>{name}</p>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
                </Col>
                </Row>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {/*
                    <List list={currentList} />
                    */}
      </Row>
    </Container>
  );
}
/*
                        <Col>
                            <h2 className="TrackingSubHeader">WishList</h2>
                        </Col>
                        <Col>
                            <h2 className="TrackingSubHeader">Applied</h2>
                        </Col>
                        <Col>
                            <h2 className="TrackingSubHeader">Interviewing</h2>
                        </Col>
                        <Col>
                            <h2 className="TrackingSubHeader">Offer</h2>
                        </Col>
                        <Col>
                            <h2 className="TrackingSubHeader">Regected</h2>
                        </Col>
                    */
