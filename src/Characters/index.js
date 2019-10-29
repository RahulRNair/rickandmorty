import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser , faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";

import React from 'react';
import axios from 'axios'

import { Card, Button, Container, Row, Col, Form, ButtonToolbar, ButtonGroup, Modal } from 'react-bootstrap';

import '../App.css';
import {getCharcters,getEpisodes} from '../Services/Characters'

import Header from '../SharedComponents/Header'

library.add(faUser, faMapMarkerAlt);
export default class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      show:false,
      episodes:[]
    }
  }
  next(){
    getCharcters(this.state.data.info.next)
    .then((response) =>  {
        this.setState({data:response});
      }
     )
  }
  prev(){
    getCharcters(this.state.data.info.prev)
    .then((response) =>  {
        this.setState({data:response});
      }
     )
  }
  componentDidMount(){
    getCharcters()
    .then((response) =>  {
        this.setState({data:response});
      }
     )
  }
  handleClose() {
     this.setState({ show: false });
   }

   handleShow(episode_url) {
     getEpisodes(episode_url)
     .then((response) =>  {
         this.setState({episodes:response, show: true });
       }
      )
   }
  render(){
    let items_episode = null;
    let items = null;
    let prevButton = '';
    let nextButton = '';
    if(this.state.data.hasOwnProperty("info")){
      // prev and next button based on the character api response
      if(this.state.data.info.prev!=''){
        prevButton = (<ButtonGroup className="mr-3" aria-label="First group">
                          <Button onClick={this.prev.bind(this)}>Prev</Button>
                      </ButtonGroup>)
      }
      if(this.state.data.info.next!=''){
        nextButton = (<ButtonGroup className="mr-3" aria-label="Second group">
                        <Button onClick={this.next.bind(this)}>Next</Button>
                      </ButtonGroup>)
      }
    }
    // creating character element
    if(this.state.data.hasOwnProperty("results")){

      items = this.state.data.results.map((item, key) =>

              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                      <p><FontAwesomeIcon icon="user" /> {item.gender}</p>
                      <p><FontAwesomeIcon icon="map-marker-alt" /> {item.location.name}</p>
                      <Button variant="primary" onClick={this.handleShow.bind(this, item.episode)}>
                        Show Episodes
                      </Button>
                      </Card.Text>

                </Card.Body>
              </Card>
        );
    }
    // creating element for episode listing
    if(this.state.episodes.length>0){

      items_episode = this.state.episodes.map((item, key) =>

              <li>{JSON.parse(item).name}</li>
        );
    }

    return(
      <div>
      <Header/>
      <Container fluid="true" >
      <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Episodes</Modal.Title>
        </Modal.Header>
        <Modal.Body scrollable={this.state.show}>
        <ul>
        {items_episode}
        </ul>
        </Modal.Body>

      </Modal>
      <Row className="main">
      {items}

      </Row>
      <Row>

       <Col md={{ span: 5 , offset: 5 }}>
         <ButtonToolbar aria-label="Toolbar with button groups">
         {prevButton}
         {nextButton}
         </ButtonToolbar>
      </Col>
      </Row>
      <Row>
      <Col></Col>
      </Row>
      </Container>


      </div>
    )
  }
}
