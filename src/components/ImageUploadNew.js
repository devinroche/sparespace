import React, { Component } from 'react';
import Dotenv from 'dotenv';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import axios from 'axios';
import { Switch, Link, Route, Redirect } from "react-router-dom"
import Cookies from '../Cookies';
import swal from 'sweetalert';

const CLOUDINARY_UPLOAD_PRESET = 'apqnswzs';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dopxmkhbr/image/upload';

const fileUrls = [];
class ImageUploadNew extends Component {

    constructor(props) {
        // no idea just stole this from crypto chart to demo axios.
        super(props);
        this.state = {
            fileDropped: false,
            filePaths: [],
            fileUrls: []
        }


    }

    componentDidMount() {
        const _this = this;
        axios.post('http://localhost:3001/cordinates', {address: this.props.location})
            .then(function(response) {
                _this.setState({
                    latlng: response.data
                });

            })
            .catch(function(response) {

            });
    }

    handleImageUpload() {

        if (this.state.fileDropped === false) {
            swal({
                title: "Please add a picture",
                text: "Please add a picture",
                icon: "warning",
                dangerMode: true
            });
            return;
        }
        const uploaders = this.state.filePaths.map((file) => {
            let upload = request.post(CLOUDINARY_UPLOAD_URL)
                .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                .field('file', file); //changed
            upload.end((err, response) => {

                var newArray = this.state.fileUrls.slice();
                newArray.push(response.body.secure_url);
                this.setState({fileUrls:newArray})
                console.log('SUPER BEFORE');

            })


        });


    }

    pushUpload() {

            console.log('BEFORE');

            
            axios.post('http://localhost:3001/listings', {
                _host: Cookies.getId(),
                title: this.props.title,
                price: this.props.price,
                description: this.props.description,
                location: this.props.location,
                lat: this.state.latlng.lat,
                lng: this.state.latlng.lng,
                images: this.state.fileUrls
            });
            console.log('AFTER');

            swal("Congrats you posted your space!" ,{buttons: {
                    return: {
                        text: "See your listing!",
                        value: "listing",
                    }
                }
            }).then((value) => {
                window.location.href = "/listings"
                return <Redirect to="/listings" />
            });


    }

    onImageDrop(files) {
        this.setState({
            filePaths: files,
            fileDropped:true

        });
    }



    render() {
        return <div className='container'>
            <h1 class="text-center"> Lets Add some photos </h1>
            <div className="FileUpload">
                <Dropzone
                    multiple={true} // only allow one image
                    accept="image/*" // must be image
                    onDrop={this.onImageDrop.bind(this)}
                >
                    <p class="text-center">Drop an image or click to select a file to upload.</p>
                </Dropzone>
                {
                    this.state.fileDropped === false ? null :
                        <div>

                            {
                                this.state.filePaths.map((item,index) => (
                                    <div class = 'border'>

                                    </div>
                                ))
                            }
                        </div>

                }
            </div>
            <button type="button" className="btn btn-primary" onClick = {this.handleImageUpload.bind(this)} >Lock in Images</button>
            <button type="button" className="btn btn-primary" onClick = {this.pushUpload.bind(this)} >Submit</button>


        </div>
    }
}

export default ImageUploadNew;
