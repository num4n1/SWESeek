import { Col, Container, Dropdown, Row, ButtonGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import '../Styles/TrackingPageStyles.css';
import List from '../Components/List';

export default function TrackingPage(){
    const [lists, setLists] = useState([{}]);
    const [currentList, setCurrentList] = useState({});

    useEffect(() => {
        generateMockData();
    }, [])

    function generateMockData(){
        setLists([{name:"2019 Hunt", jobs:[{company:"Google"}, {company: "Facebook"}]},
                 {name:"2020 Hunt", jobs:[{company:""}, {company: ""}]}, 
                 {name:"2021 Hunt", jobs:[{company:""}, {company: ""}]}]);
        setCurrentList(lists[0]);
    }

    function changeList(list){
        setCurrentList(list);
    }


    return(
        <Container style={{minHeight:`73vh`}}>
            <Row style={{marginTop:`2%`}}>
                <Col style={{alignSelf:`center`}}>
                    <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle size="lg" className="ListSelectButton" >Job List</Dropdown.Toggle>
                    <Dropdown.Menu>
                    {
                        lists.map(element => {
                           return <Dropdown.Item onClick={() => {changeList(element)}}>{element.name}</Dropdown.Item>
                        })
                    }
                    </Dropdown.Menu>
                    </Dropdown>{' '}
                </Col>
                <Col>
                    <h1 className="TrackingHeader">{currentList.name}</h1>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row>
                <List list={currentList} />
            </Row>
        </Container>
    )
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