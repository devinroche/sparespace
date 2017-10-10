import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Route, Redirect } from "react-router-dom";
import Login from "./Login";
import LoggedIn from "./LoggedIn";
import Home from "./Home";
import SignUp from "./SignUp";

export default class AppNavbar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to="/">
              <a href="/home">sparespace</a>
            </LinkContainer>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          {/*here link container acts just like Link from react-router, but for react-router-bootstrap'*/}
          <LinkContainer to="/login" activeClassName="none">
            <NavItem eventKey={2}>Login</NavItem>
          </LinkContainer>
          <LinkContainer to="/sign_up">
            <NavItem eventKey={3}>Sign Up</NavItem>
          </LinkContainer>
        </Nav>
        {/*need to find a better way of storing these routes...*/}
        <Route exact path="/" render={() => <Redirect to="/home" />} />
        <Route path="/login" component={Login}>
          {" "}
        </Route>
        <Route path="/home" component={Home}>
          {" "}
        </Route>
        <Route path="/users/:id" component={LoggedIn} />
        <Route path="/sign_up" component={SignUp}>
          {" "}
        </Route>
      </Navbar>
    );
  }
}
