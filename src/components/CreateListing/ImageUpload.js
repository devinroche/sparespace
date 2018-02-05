import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import axios from 'axios';
import {Redirect } from "react-router-dom"
import Cookies from '../../Cookies';
import swal from 'sweetalert';
import { postSpace} from '../../sock'

const CLOUDINARY_UPLOAD_PRESET = 'apqnswzs';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dopxmkhbr/image/upload';


class ImageUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileDropped: false, 
            imageLock: false, 
            filePaths: [],    
            fileUrls: []
        }


    }

    // grab address once component loads convert into cordinates
    componentDidMount() {
        const _this = this;
        axios.post('http://localhost:3001/cordinates', {address: this.props.location})
            .then(function(response) {
            	//CHECK TO MAKE SURE VALID ADDRESS W/CORDS
            	if (response.data == "bad") { 
            		console.log('BAD INPUT');
            		swal({
                		title: "Please choose a valid address",
                		text: "Please choose a valid address",
                		icon: "warning",
                		dangerMode: true
            		});
            		return;
            	}
                _this.setState({
                    latlng: response.data
                });

            })
            .catch(function(response) {

            });
    }
    // upload images to cloudinary once image lock button pressed
    // pass image urls into state
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
                this.setState({imageLock:true})

            })
        });


    }
    // upload posting details to db
    // once submit button is pressed
    pushUpload() {

        if (this.state.fileDropped === false) {
            swal({
                title: "Please add a picture",
                text: "Please add a picture",
                icon: "warning",
                dangerMode: true
            });
            return;
        }
            if (this.state.imageLock) {
                let storageObj = {
                    _host: Cookies.getId(),
                    title: this.props.title,
                    price: Number(this.props.price),
                    duration: Number(this.props.duration),
                    description: this.props.description,
                    duration: this.props.duration,
                    location: this.props.location,
                    lat: this.state.latlng.lat,
                    lng: this.state.latlng.lng,
                    timestamp: Date.now(),
                    features: this.props.features,
                    images: this.state.fileUrls
                };

                axios.post('http://localhost:3001/listings', storageObj).then(response => {
                    console.log(response);
                });
                swal("Congrats you posted your space!" ,{buttons: {
                        return: {
                            text: "See your listing!",
                            value: "listing",
                        }
                    }
                }).then((value) => {
                    postSpace(storageObj)
                    window.location.href = "/listings"
                    return <Redirect to="/listings" />
                });
            } else {
                swal({
                    title: "Error",
                    text: "Please Lock in your images",
                    icon: "warning",
                    dangerMode: true
                });
                return;
            }

    }
    // change state once images are dropped
    onImageDrop(files) {
        this.setState({
            filePaths: files,
            fileDropped:true

        });
    }
    
    render() {
        return <div className=''>
            <div className="FileUpload">
                <Dropzone
                    multiple={true} // only allow one image
                    accept="image/*" // must be image
                    onDrop={this.onImageDrop.bind(this)}

                >
                    <p className="text-center">Drop an image or click to select a file to upload.</p>
                </Dropzone>
                {
                    this.state.fileDropped === false ? null :
                        <div >
                            {
                                this.state.filePaths.map((item,index) => (
                                    <img width="400" src={item.preview} alt = "responsive image" />
                                ))
                            }
                        </div>
                }
            </div>
            <button type="button" className="btn btn-primary" onClick = {this.handleImageUpload.bind(this)} >Lock in Images</button>
            {
                this.state.imageLock === false ? null:
                    <button type="button" className="btn btn-primary" onClick = {this.pushUpload.bind(this)} >Submit</button>
            }



        </div>
    }
}

export default ImageUpload;
