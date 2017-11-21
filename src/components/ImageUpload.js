import React, { Component } from 'react';
import Dotenv from 'dotenv';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import axios from 'axios';
import {Route, Redirect } from "react-router-dom"
import Cookies from '../Cookies';
import swal from 'sweetalert';
import { CLOUDINARY_UPLOAD_PRESETT, CLOUDINARY_UPLOAD_URLL } from 'react-native-dotenv'

const CLOUDINARY_UPLOAD_PRESET = "apqnswzs";
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dopxmkhbr/image/upload";


class ImageUpload extends Component {

 constructor(props) {
   super(props);
   this.state = {
     uploadedFileCloudinaryUrl: ["","","",""],
     file: false,
     latlng: {},
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
  if(!Cookies.isVerified()){
    swal("Uh Oh! You need to verify your account first!" ,{buttons: {
      return: {
        text: "Resend Verification Email",
        value: "resend",
      }
      }
    }).then((value) => {
			  switch (value) {
				case "resend":
					// axios.post('http://localhost:3001/resend', {id: Cookies.getId()})
					break;
			  }

  });
  }
  if (this.state.file === false) {
    swal({title: "Please add a picture",
          text: "Please add a picture",
          icon: "warning",
          dangerMode: true
        })
      }
  for (var i = 0; i < this.state.uploadedFiles.length; i ++) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                      .field('file', this.state.uploadedFiles[i]); //changed
  
  upload.end((err, response) => {
    if (err) {
      console.error(err);
    }
    let image = []
    image.push(response.body.public_id);
    
    axios.post('http://localhost:3001/listings', {
        _host: Cookies.getId(),
        title: this.props.title,
        price: this.props.price,
        description: this.props.description,
        interested: [],
        location: this.props.location,
        lat: this.state.latlng.lat,
        lng: this.state.latlng.lng,
        images: image
    })

    if (response.body.secure_url !== '') {
      let newIds = this.state.uploadedFileCloudinaryUrl.slice() //copy the array
      newIds[i] = response.body.secure_url //execute the manipulations
      this.setState(
          {uploadedFileCloudinaryUrl: newIds}) //set the new state


    }
    swal("Congrats you posted your space!" ,{buttons: {
      return: {
        text: "See your listing!",
        value: "listing",
      }
      }
    }).then((value) => {
			  switch (value) {
				case "listing":
					window.location.href = "/listings"
					return <Redirect to="/listings" />
					break;
			  }

  });
  })
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
        console.log(response);
      });
}

render() {
  return (
    <div className = "container">
    <h1 className = "text-center"> Lets Add some photos </h1>
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
                <img width="500" src={this.state.uploadedFiles[index].preview} alt = "responsive image" />
                </div>
              ))
            }
            </div>
          
          }
 
        </div>
 
      <button type="button" className="btn btn-primary" onClick = {this.handleImageUpload.bind(this)} >Submit</button>
 
    </div>
 
    
    );
  }
}
 
export default ImageUpload;