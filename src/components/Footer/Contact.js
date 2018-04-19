import React, { Component } from "react";
import { Row,LoginHeader,
    FormFormat,
    FormInput,
    SignUpButton } from "../Styles";
import { Formik, Field } from "formik";
import axios from "axios";
import swal from "sweetalert2";
import "./Contact.css";

class Tos extends Component {
  render() {
    return (
      <div className="container">
        <Row className="row">
          <div className="col-sm-8 col-sm-offset-2">
            <LoginHeader>Contact sparespace</LoginHeader>
          </div>
        </Row>

        <div>
          <Formik
            initialValues={{
              first: "",
              last: "",
              email: "",
              category: "",
              message: ""
            }}
            validate={values => {
              let errors = {};
              if (!values.first) {
                errors.first = "Required";
              } else if (!values.last) {
                errors.last = "Required";
              } else if (!values.email) {
                errors.email = "Required";
              } else if (!values.category) {
                errors.category = "Required";
              } else if (!values.message) {
                errors.message = "Required";
              }
              return errors;
            }}
            onSubmit={values => {
              axios
                .post("http://localhost:3001/send-enquiry-mail", {
                  first: values.first,
                  last: values.last,
                  email: values.email,
                  category: values.category,
                  message: values.message
                })
                .then(res => {
                  if (res.data.success) {
                    swal({
                      title: "Thanks for making Enquiry",
                      content:
                        "Thanks for making Enquiry, our Customer Care agent will get back to you soon",
                      icon: "success"
                    }).then(() => {
                      window.location.href = "/home";
                    });
                  } else {
                    swal({
                      title: "Error sending Enquiry mail",
                      content:
                        "There was en error while sending your enquiry email, Please contact Customer Care",
                      icon: "warning"
                    });
                  }
                })
                .catch(err => {
                  swal({
                    title: "Error sending Enquiry mail",
                    content:
                      "There was en error while sending your enquiry email, Please contact Customer Care",
                    icon: "warning"
                  });
                });
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
                <div className="row col-sm-12 custom-form-field">
                  <div className="col-sm-4 col-sm-offset-2">
                    <FormInput
                      id="first"
                      className="form-control"
                      type="text"
                      name="first"
                      placeholder="First Name"
                      onChange={handleChange}
                      value={values.first}
                    />
                    {touched.first && errors.first && <div>{errors.first}</div>}
                  </div>

                  <div className="col-sm-4">
                    <FormInput
                      id="last"
                      className="form-control"
                      type="text"
                      name="last"
                      placeholder="Last Name"
                      onChange={handleChange}
                      value={values.last}
                    />
                    {touched.last && errors.last && <div>{errors.last}</div>}
                  </div>
                </div>

                <div className="row col-sm-12">
                  <div className="col-sm-4 col-sm-offset-2 custom-form-field">
                    <Field
                      id="email"
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                      value={values.email}
                    />
                    {touched.email && errors.email && <div>{errors.email}</div>}
                  </div>
                </div>

                <div className="row col-sm-12">
                  <div className="col-sm-4 col-sm-offset-2 custom-form-field">
                    <Field
                      id="category"
                      className="form-control"
                      component="select"
                      name="category"
                      placeholder="Category"
                      onChange={handleChange}
                      value={values.category}
                    >
                      <option value="support">Support</option>
                      <option value="general">General</option>
                      <option value="other">Other</option>
                    </Field>
                    {touched.category &&
                      errors.category && <div>{errors.category}</div>}
                  </div>
                </div>

                <div className="row col-sm-12">
                  <div className="col-sm-8 col-sm-offset-2 custom-form-field">
                    <Field
                      id="message"
                      className="form-control"
                      component="textarea"
                      name="message"
                      rows="8"
                      placeholder="Message"
                      onChange={handleChange}
                      value={values.message}
                    />
                    {touched.message &&
                      errors.message && <div>{errors.message}</div>}
                  </div>
                </div>

                <div className="row col-sm-12">
                  <div className="col-sm-2 col-sm-offset-5">
                    <SignUpButton className="btn" type="submit">
                      Confirm
                    </SignUpButton>
                  </div>
                </div>
              </FormFormat>
            )}
          />
        </div>
      </div>
    );
  }
}

export default Tos;
