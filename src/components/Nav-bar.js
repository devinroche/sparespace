import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";

export default class AppNavbar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">SpareSpace</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav className={"pull-right"}>
          <NavItem eventKey={1} href="#">
            Link
          </NavItem>
          <NavItem eventKey={2} href="#">
            Link
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
