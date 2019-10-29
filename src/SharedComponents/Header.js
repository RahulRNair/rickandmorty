import React from 'react';
import {Container, Row, Navbar, Nav, Button, NavDropdown, Form, FormControl } from 'react-bootstrap';


export default class Header extends React.Component {

  render(){
    return(

      <Container fluid="true" className="nopadding">

        <Navbar bg="dark" expand="lg">
        <Navbar.Brand href="#home" className="header_title">THE RICK AND MORTY</Navbar.Brand>
        </Navbar>

      </Container>

    )
  }
}
