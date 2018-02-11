import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import axios from 'axios';
import { Redirect } from "react-router-dom"
import Cookies from '../../Cookies';
import swal from 'sweetalert2';
import { postSpace } from '../../sock'
import { relative } from 'path';

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
        //error handling for user attempting to direct to /add_photos page 
        if (this.props.location.query === undefined) {
            window.location.href = "/create_listing"
            return <Redirect to="/create_listing" />
        }
        // convert cordinates to address
        const _this = this;
        axios.post('http://localhost:3001/cordinates', { address: this.props.location.query.location.location })
            .then(function (response) {
                //address checked in previous component
                _this.setState({
                    latlng: response.data
                });

            })
            .catch(function (response) {

            });
    }
    // upload images to cloudinary once image lock button pressed
    // pass image urls into state
    handleImageUpload() {

        if (this.state.fileDropped === false) {
            swal(
                'No Pictures!',
                'Please add a picture',
                'warning'
            )
            return;
        }

        const uploaders = this.state.filePaths.map((file,index) => {
            let upload = request.post(CLOUDINARY_UPLOAD_URL)
                .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                .field('file', file); //changed
            upload.end((err, response) => {

                var newArray = this.state.fileUrls.slice();
                newArray.push(response.body.secure_url);
                this.setState({ fileUrls: newArray })
                this.setState({ imageLock: true })
                if (this.state.filePaths.length - 1 === index) {
                    this.pushUpload();
                }
            })
        });


    }
    //Function to handle back button for the user
    //should send user back to create listing form with original inputs in place
    handleBack() {
        window.location.href = "/create_listing"
        return <Redirect to="/create_listing" />
    }
    //Function to handle deleting of images when in upload process
    handleImageDelete(indexDelete) {
        //edit state array 
        var array = this.state.filePaths;
        //var index = array.indexOf(e.target.value)
        array.splice(indexDelete, 1);
        this.setState({filePaths: array });
        
    }
    // upload posting details to db
    // once submit button is pressed
    pushUpload() {

        if (this.state.fileDropped === false) {
            swal(
                'No Pictures!',
                'Please add a picture',
                'warning'
            )
            return;
        }
        if (this.state.imageLock) {
            let prevPage = this.props.location.query
            let storageObj = {
                _host: Cookies.getId(),
                title: prevPage.title.title,
                price: Number(prevPage.price.price),
                description: prevPage.description.description,
                dates: [prevPage.dates.dates.start, prevPage.dates.dates.end],
                location: prevPage.location.location,
                lat: this.state.latlng.lat,
                lng: this.state.latlng.lng,
                features: this.props.location.query.features.features,
                images: this.state.fileUrls
            };

            axios.post('http://localhost:3001/listings', storageObj)
            swal(
                'Good job!',
                'You clicked the button!',
                'success'
                  ).then((value) => {
                    postSpace(storageObj)
                    window.location.href = "/listings"
                    return <Redirect to="/listings" />
                });
        } else {
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                footer: '<a href>Why do I have this issue?</a>',
            })
            return;
        }

    }
    // change state once images are dropped
    onImageDrop(files) {
        if (this.state.fileDropped) { // if images were already dropped add new ones 
            var old = this.state.filePaths.slice()
            var old_new = old.concat(files)
            this.setState({ filePaths: old_new })
        } else { // else add add new set
            this.setState({
            filePaths: files,
            fileDropped: true
            });
        }
        
        
        
        
    }

    render() {

        const dropzoneStyle = {
            border: "none",
            height: 250,
            backgroundColor: "#E0E6ED",
            padding: "18px 35px",
            borderRadius: 5,
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            marginBottom: 25
        };

        const headerStyle = {
            fontFamily: "Rubik",
            fontWeight: "400",
            color: "#333",
            marginBottom: 25
        };

        const textStyle = {
            fontFamily: "Rubik",
            color: "#5E85B2",
            fontWeight: "400",
            marginTop: 100,
            fontSize: 18
        };

        const lockImagesStyle = {
            padding: "12px 35px",
            borderRadius: 5,
            backgroundColor: "#FFF",
            color: "#333",
            borderColor: "#333",
            borderWidth: "2",
            fontFamily: "Rubik",
        };

        const submitStyle = {
            padding: "12px 35px",
            borderRadius: 5,
            backgroundColor: "#FFF",
            color: "#FC5B45",
            borderColor: "#FC5B45",
            borderWidth: "2",
            fontFamily: "Rubik",
            marginLeft: 25
        };

        const imageButtonStyle = {
            position:'absolute'
        
        };

        return (
            <div className='container'>
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-2">
                        <h3 style={headerStyle}>Photos</h3>
                    </div>
                </div>

                <div className="container">
                    <div className="">
                        <Dropzone
                            multiple={true} // only allow one image
                            accept="image/*" // must be image
                            onDrop={this.onImageDrop.bind(this)}
                            style={dropzoneStyle}

                        >
                            <p className="text-center" style={textStyle}>Drag and drop here</p>
                        </Dropzone>
                    </div>
                    {
                        this.state.fileDropped === false ? null :
                            <div className = "row">
                                {
                                    this.state.filePaths.map((item, index) => (
                                        <div className="col-xs-3" style = {{position:relative}}>
                                            <img className = "img-responsive" src={item.preview} style={{}} />
                                            <button type="button" className="close text-center" aria-label="Close" onClick = {this.handleImageDelete.bind(this, index)} style = {imageButtonStyle}>
                                                <span className = 'text-danger' aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        
                                    ))
                                }
                            </div>
                    }
                </div>
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3" style={{ marginTop: 100 }}>
                        <button type="button" className="btn" style={lockImagesStyle} onClick={this.handleBack.bind(this)} >Back</button>
                        <button type="button" className="btn" style={lockImagesStyle} onClick={this.handleImageUpload.bind(this)} >Submit</button>
                    </div>
                </div>

            </div>
        )





    }
}

export default ImageUpload;