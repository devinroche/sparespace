import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import openSocket from 'socket.io-client';
import Cookies from '../../Cookies'
import Modal from 'react-modal';
import { Message } from "../Styles";
import { LoginHeader, SupportText, FormFormat, FormInput, FormLabel, SignUpButton } from "../Styles";
import { Formik } from "formik"
import ReactTooltip from 'react-tooltip'
import { Redirect } from "react-router-dom"


const socket = openSocket('http://localhost:3001');

class EditUser extends Component {
    constructor() {
        super()

        this.state = {
            show: false,
            modalIsOpen: false,
            value: ''
        }

        socket.on('peer-msg', () => {
            this.getMsg()
        });

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    // handleChange(event) {
    //     this.setState({ value: event.target.value });
    // }
    // handleSubmit(e) {
    //     e.preventDefault();
    //     axios.post('http://localhost:3001/message', {
    //         host: this.props.host,
    //         renter: this.props.renter,
    //         author: this.props.renter,
    //         text: this.state.value
    //     })
    //     swal(
    //         'Message Sent',
    //         'Your message has been sent',
    //         'success'
    //     ).then((value) => {
    //         this.closeModal()
    //     });
    // }

    render() {
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
            }
        };
        return (
            <div>
                <Message className="btn btn-success" onClick={this.openModal}>Edit Account</Message>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    style={customStyles}

                >
                    <button onClick={this.closeModal}>x</button>
                    <h2 ref={subtitle => this.subtitle = subtitle}>Edit Account</h2>
                    {/* <form onSubmit={this.handleSubmit}>
                        <input value={this.state.value} onChange={this.handleChange} placeholder="first name" />
                        <br />
                        <input type="submit" value="Submit" />
                    </form> */}
                    <Formik
                        initialValues={{
                            first: "",
                            last: "",
                            password: "",
                            confirm: "",
                            email: "",
                            oldpass: ''
                        }}
                        validate={values => {
                            let errors = {};
                            if(values.confirm !== '' && values.password !=='' && values.oldpass !== ''){
                                if (values.confirm !== values.password) {
                                    errors.confirm = "Passwords do not match!!"
                                }
                                else if (values.password === values.oldpass) {
                                    errors.confirm = "Same Passwords!"
                                }
                            }
                            else if(values.email !== ''){
                                if (!/^[A-Z0-9._%+-]+@zagmail.gonzaga.edu$/i.test(values.email)) {
                                    errors.email =
                                        "Invalid email address (must end with zagmail.gonzaga.edu)"
                                }
                            }
                            return errors
                        }}
                        onSubmit={values => {
                            Object.keys(values).forEach((key) => (values[key] == '') && delete values[key]);
                            delete values['confirm'];

                            console.log(values)
                        axios.put(`http://localhost:3001/user/${Cookies.getId()}`, values);
                            swal(
                                "Email Verification Required",
                                "Please check your email to verify your account",
                                "warning"
                            ).then(() => {
                                window.location.href = "/login"
                                return <Redirect to="/login" />
                            })
                        }}
                        //render is actually rendering the form for the user to see
                        render={({
                            values,
                            touched,
                            errors,
                            handleChange,
                            handleSubmit
                        }) => (
                                <FormFormat onSubmit={handleSubmit}>
                                    <FormLabel className="pull-left">First Name</FormLabel>
                                    <FormInput
                                        id="first"
                                        className="form-control"
                                        type="text"
                                        name="first"
                                        onChange={handleChange}
                                        value={values.first}
                                    />
                                    {touched.first && errors.first && <div>{errors.first}</div>}
                                    <FormLabel className="pull-left">Last Name</FormLabel>
                                    <FormInput
                                        id="last"
                                        className="form-control"
                                        type="text"
                                        name="last"
                                        onChange={handleChange}
                                        value={values.last}
                                    />
                                    {touched.last && errors.last && <div>{errors.last}</div>}
                                    <FormLabel className="pull-left">Email</FormLabel>
                                    <FormInput
                                        id="email"
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        value={values.email}
                                    />
                                    {touched.email && errors.email && <div>{errors.email}</div>}
                                    <FormLabel className="pull-left">Old Password</FormLabel>
                                    <FormInput
                                        id="oldpass"
                                        className="form-control"
                                        type="password"
                                        name="oldpass"
                                        onChange={handleChange}
                                        value={values.oldpass}
                                    />
                                    {touched.oldpass && errors.oldpass && <div>{errors.oldpass}</div>}

                                    <FormLabel className="pull-left">New Password</FormLabel>
                                    <FormInput
                                        id="password"
                                        className="form-control"
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        value={values.password}
                                    />
                                    {touched.password && errors.password && <div>{errors.password}</div>}
                                    <FormLabel className="pull-left">Confirm New Password</FormLabel>
                                    <FormInput
                                        id="confirm"
                                        className="form-control"
                                        type="password"
                                        name="confirm"
                                        onChange={handleChange}
                                        value={values.confirm}
                                    />
                                    {touched.confirm && errors.confirm && <div>{errors.confirm}</div>}
                                    <SignUpButton className="btn" type="submit">Confirm</SignUpButton>
                                </FormFormat>
                            )}
                    />
                </Modal>

            </div>
        );
    }
}

export default EditUser;