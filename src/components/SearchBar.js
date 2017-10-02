import React, { Component } from "react";
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

//this is now Home class

export default class SearchBar extends Component {
  render() {
    return (
      <Row style={{ marginTop: "25%" }}>
        <Col sm={8} smdOffset={2} className={"text-center col-sm-offset-2"}>
          <FormGroup controlId="formBasicText">
            <ControlLabel style={{ fontSize: "22px", marginBottom: "20px" }}>
              Save up to 50% in storage cost by using SpareSpace.
            </ControlLabel>
            <FormControl type="text" placeholder="Zip code" />
          </FormGroup>
        </Col>
      </Row>
    );
  }
}
