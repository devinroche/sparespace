import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import Cookies from '../../Cookies'
import Modal from 'react-modal';
import { FormFormat, FormInput, FormLabel, SignUpButton, CloseBtn } from "../Styles";
import { Formik } from "formik"
import { Redirect } from "react-router-dom"

class EditListing extends Component {
    constructor() {
        super()

        this.state = {
            show: false,
            modalIsOpen: false,
            value: ''
        }

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        this.subtitle.style.color = '#FC5B45';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    render() {

        const editStyle = {
            color: '#fff',
            width: 100,
            height: 25,
            marginBottom: 5,
            background: "linear-gradient(to right, #FE947B, #FC5B45)",
            border: "none",
            borderRadius: 5
    };
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
        console.log(this.props.listing._id)
        return (
            <div>
                <div onClick={this.openModal}>
                    <button style={editStyle} className='col-sm-12'>Edit</button>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal"
                    style={customStyles}

                >
                    <div className="row">
                        <div className="col-sm-10">
                            <h2 ref={subtitle => this.subtitle = subtitle}>Edit Listing</h2>
                        </div>
                        <div className="col-sm-2">
                            <CloseBtn onClick={this.closeModal}>x</CloseBtn>
                        </div>
                    </div>
                    <Formik
                        initialValues={{
                            title: "",
                            description: "",
                            price: ""
                        }}
                        onSubmit={values => {
                            Object.keys(values).forEach((key) => (values[key] === '') && delete values[key]);
                            delete values['confirm'];
                            values._id = this.props.listing._id
                            axios.post(`http://localhost:3001/updateListing`, values)         
                            window.location.href = `/users/${Cookies.getId()}`
                            return <Redirect to={`/users/${Cookies.getId()}`} />                   
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
                                    <FormLabel className="pull-left">Title</FormLabel>
                                    <FormInput
                                        id="first"
                                        className="form-control"
                                        type="text"
                                        name="title"
                                        onChange={handleChange}
                                        value={values.title}
                                    />
                                    <FormLabel className="pull-left">Description</FormLabel>
                                    <FormInput
                                        id="description"
                                        className="form-control"
                                        type="text"
                                        name="description"
                                        onChange={handleChange}
                                        value={values.description}
                                    />
                                    <FormLabel className="pull-left">Price</FormLabel>
                                    <FormInput
                                        id="price"
                                        className="form-control"
                                        type="text"
                                        name="price"
                                        onChange={handleChange}
                                        value={values.price}
                                    />
                                    <SignUpButton className="btn" type="submit">Confirm</SignUpButton>
                                </FormFormat>
                            )}
                    />
                </Modal>

            </div>
        );
    }
}

export default EditListing;