import React, { Component } from "react";
import axios from 'axios';
import {
    Row,
    Col,
    FormGroup,
    ControlLabel,
    FormControl
} from "react-bootstrap";

//this is Search Bar class, renamed to be home

class Home extends Component {
    constructor(props) {
        // no idea just stole this from crypto chart to demo axios.
        super(props);
        this.state = {
            dataArr: []
        };
        this.getData = this.getData.bind(this);
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        // This gets all the users in the database
        axios.get('http://localhost:3001/users')
        .then(response => {
            console.log(response.data)
            this.setState({
                dataArr: response.data
            })
        })
    }

    render() {
        return (
            <div>
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
                {/* This is a demo that gets all users name that are in the database and throws it on the screen */}
                <ul>
                    {this.state.dataArr.map(function(user) {
                        return <li key={user._id}>name: {user.fullname}, password: {user.password}, email: {user.contact.email}</li>
                    })}
                </ul> 
            </div>
        );
    }
}

export default Home