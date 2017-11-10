/**
 * Creates CreateListing page
 *
 * @author George Kunthara
 * @version v0.0.1 10/23/17
 *
 * @ChangeLog
 * Initial 10/23/17 George Kunthara
 * Photos 11/6/17 George Kunthara
 */


import React, { Component } from "react";
import { Formik } from 'formik'
import ImageUpload from "./ImageUpload";



let title = ""
let description = ""
let price = ""

class CreateListing extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showAddPhotos : false,
        };

        this.enableAddPhotos  = this.enableAddPhotos.bind(this);
    }


    enableAddPhotos() {
        return (
        <ImageUpload title= {title}
                     description= {description}
                     price={price}
        />

        )
    }


    render() {

        //adjust login header to be more down the screen
        const loginStyle = {
            marginTop: 100
        }

        //adjust forms to have more space against login header
        const formStyle = {
            marginTop: 25
        }


        return (

            <div>
                <h1 style={loginStyle} className="text-center"> Create a Listing!</h1>
                <div className="container text-center">
                    <Formik initialValues={{
                        title: '',
                        price: '',
                        description: ''
                    }}
                        //formik is handling our forms. It will check for valid
                        //input, and then send info on click "Create Account" to our backend


                        //makes sure valid email is entered
                            validate={values => {

                                let errors = {}
                                if (!values.title) {
                                    errors.title = 'Required'
                                }
                                else if (!values.price) {
                                    errors.price = 'Required'
                                }
                                else if (!values.description) {
                                    errors.description = 'Required'
                                }
                                return errors
                            }}

                            //doesn't seem to work when we include Link
                            onSubmit={
                                (values) => {
                                    title = values.title
                                    description = values.description
                                    price = values.price
                                    this.setState({
                                        showAddPhotos : true,
                                    });

                            }}

                        //render is actually rendering the form for the user to see
                            render={({ values, touched, errors, handleChange, handleSubmit, isSubmitting }) =>
                                <form style={formStyle} onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="pull-left">Title</label>
                                        <input
                                            id="title"
                                            className="form-control"
                                            type="title"
                                            name="title"
                                            placeholder="Beautiful Basement"
                                            onChange={handleChange}
                                            value={values.title}
                                        />
                                        {touched.title && errors.title && <div>{errors.title}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label className="pull-left">price</label>
                                        <input
                                            id="price"
                                            className="form-control"
                                            type="price"
                                            name="price"
                                            placeholder="$25"
                                            onChange={handleChange}
                                            value={values.price}
                                        />
                                        {touched.price && errors.price && <div>{errors.price}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label className="pull-left">Description</label>
                                        <input
                                            id="description"
                                            className="form-control"
                                            type="description"
                                            name="description"
                                            placeholder="This place is awesome..."
                                            onChange={handleChange}
                                            value={values.description}
                                        />
                                        {touched.description && errors.description && <div>{errors.description}</div>}
                                    </div>
                                    {/*<Link to="/add_photos"><button className="btn btn-default" type="submit">Create Listing!</button></Link>*/}
                                    <button className="btn btn-default" type="submit">Add Photos</button>
                                </form>}
                    />
                </div>
                { this.state.showAddPhotos ? this.enableAddPhotos() : null }
            </div>

        );
    }
}

export default CreateListing;
