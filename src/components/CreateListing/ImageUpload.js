import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { Redirect } from "react-router-dom"
import swal from 'sweetalert2';
import {Label, ImageUploadText, OrangeButton} from "../Styles";
import { relative } from 'path';
import { ClimbingBoxLoader } from 'react-spinners'

const CLOUDINARY_UPLOAD_PRESET = 'apqnswzs';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dopxmkhbr/image/upload';


class ImageUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileDropped: false,
            imageLock: false,
            filePaths: [],
            fileUrls: [],
            loading:false // loading icon state 
            
        }

    }

    handlePageChange() {
        this.props.onPageChange(1)
    }

    handleImageUpload() {

        if (this.state.fileDropped === false) {
            swal(
                'No Pictures!',
                'Please add a picture',
                'warning'
            )
            return;
        } else {
            if (this.state.fileDropped === false) { // no pictures
                swal(
                    'No Pictures!',
                    'Please add a picture',
                    'warning'
                )
                return;
            } else { // pictures
                // upload to cloudinary
                this.setState({loading:true}) // loading icon state 
                this.state.filePaths.map((file,index) => {
                    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file); //changed
                    upload.end((err, response) => {

                        var newArray = this.state.fileUrls.slice();
                        newArray.push(response.body.secure_url);
                        this.setState({ fileUrls: newArray })
                        this.setState({ imageLock: true })
                        if (this.state.filePaths.length === this.state.fileUrls.length) {
                            this.props.onListingCreate(newArray)
                        }
                    })
                });
            }
            
        }

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
    
    // change state once images are dropped
    onImageDrop(files) {
        
        if (this.state.fileDropped) { // if images were already dropped add new ones 
            if (files.length + this.state.filePaths.length > 4) {
                //tell person to only upload 4 
                swal(
                    'Pleae only 4 images!',
                    'Please add a picture',
                    'warning'
                )
                return;
            }
            var old = this.state.filePaths.slice()
            var old_new = old.concat(files)
            this.setState({ filePaths: old_new })
            this.props.onImageChange(old_new)
        } else { // else add add new set
            if (files.length > 4) { // if more than 4 photos
                // tell person to upload only 4
                swal(
                    'Pleae only 4 images!',
                    'Please add a picture',
                    'warning'
                )
                return;
            }
            this.setState({
            filePaths: files,
            fileDropped: true
            });
            this.props.onImageChange(files)
        }
    }

    render() {
        const { loading } = this.state; // variable for loading icon 
        if(loading) { // if component is loading add loader icon
            return (
                <div className = 'mx-auto' style={{width:'400px', margin:'0 auto'}} >
                        <ClimbingBoxLoader
                        color={'#123abc'} 
                        loading={this.state.loading} 
                        />
                    </div>
            ); // render null when app is not ready
        }
        return (
            <div className='container'>
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-2">
                        <Label>Photos</Label>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-2">
                            <Dropzone
                                multiple={true} // only multiple image
                                accept="image/*" // must be image
                                onDrop={this.onImageDrop.bind(this)}
                                style={dropzoneStyle}
                            >
                                <ImageUploadText className="text-center">Drag and drop here</ImageUploadText>
                        </Dropzone>
                        </div>
                    </div>
                    {
                        this.state.fileDropped === false ? null :
                            <div className = "row">
                                {
                                    this.state.filePaths.map((item, index) => (
                                        <div className="col-xs-3" style = {{position:relative}}>
                                            <img className = "img-responsive" src={item.preview}/>
                                            <button type="button" className="close text-center" aria-label="Close" onClick = {this.handleImageDelete.bind(this, index)}>
                                                <span className = 'text-danger' aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        
                                    ))
                                }
                            </div>
                    }
                </div>
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-5" style={{ marginTop: 100 }}>
                        <OrangeButton onClick={this.handlePageChange.bind(this)}>Back</OrangeButton>
                        <OrangeButton onClick={this.handleImageUpload.bind(this)}>Finish</OrangeButton>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageUpload;


const dropzoneStyle = {
    border: "none",
    height: "40vh",
    backgroundColor: "#E0E6ED",
    padding: "18px 35px",
    borderRadius: 5,
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    marginBottom: 25
};
