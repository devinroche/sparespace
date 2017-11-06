import React, { Component } from 'react';
import './App.css';

import Dropzone from 'react-dropzone';
import request from 'superagent';


const CLOUDINARY_UPLOAD_PRESET = process.env.cloudinary_preset;
const CLOUDINARY_UPLOAD_URL = process.env.upload_url;


class ImageUpload extends Component {

  constructor(props) {
    super(props);

    this.state = {
      uploadedFileCloudinaryUrl: ["","","",""],
      file: false
    };
  }

  onImageDrop(files) {
    this.setState({
      uploadedFiles: files,
      file:true
    });

    
    //this.handleImageUpload(files[0]);
  }

  handleImageUpload() {
    for (var i = 0; i < this.state.uploadedFiles.length; i ++) {
      let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', this.state.uploadedFiles[i]); //changed

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }
      console.log(response);
      if (response.body.secure_url !== '') {
        let newIds = this.state.uploadedFileCloudinaryUrl.slice() //copy the array
        newIds[i] = response.body.secure_url //execute the manipulations
        this.setState({uploadedFileCloudinaryUrl: newIds}) //set the new state
        /*
        this.setState({
          uploadedFileCloudinaryUrl[i]: response.body.secure_url
        });
        */
      }
    });
    }
    
  }

  render() {
    
    return (
    <div class = "container">
      <h1 class = "text-center"> Lets Add some photos </h1>
      <div className="FileUpload"  >
        <Dropzone 
          multiple={true} // only allow one image
          accept="image/*" // must be image
          onDrop={this.onImageDrop.bind(this)}
        >
          <p class = "text-center">Drop an image or click to select a file to upload.</p>
        </Dropzone>
          
          
          {
            this.state.file === false ? null :

            <div>
              {
                this.state.uploadedFiles.map((item, index) => (
                  <div class = 'border'>
                  <img class = {'img-fluid max-width: 50%'} src={this.state.uploadedFiles[index].preview} alt = "responsive image" />
                  </div>
                ))
              }
              
              }
            </div>
          
          }
        
        </div>

      <button type="button" class="btn btn-primary" onClick = {this.handleImageUpload.bind(this)} >Add Photos</button>

    </div> 

    
    );
  }
}

export default ImageUpload;
