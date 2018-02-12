import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import axios from 'axios';
import { Redirect } from "react-router-dom"
import Cookies from '../../Cookies';
import swal from 'sweetalert2';
import { postSpace } from '../../sock'
import {Label, ImageUploadText, BlackButton, OrangeButton} from "../Styles";

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
        console.log('ENTERING IMAGEUPLOAD')
        console.log(this.props.location.query)
        const _this = this;
        axios.post('http://localhost:3001/cordinates', { address: this.props.location.query.location.location })
            .then(function (response) {
                //CHECK TO MAKE SURE VALID ADDRESS W/CORDS
                if (response.data == "bad") {
                    swal(
                        'Invalid Address',
                        'Please choose a valid address',
                        'danger'
                    )
                    return;
                }
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

        const uploaders = this.state.filePaths.map((file) => {
            let upload = request.post(CLOUDINARY_UPLOAD_URL)
                .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                .field('file', file); //changed
            upload.end((err, response) => {

                var newArray = this.state.fileUrls.slice();
                newArray.push(response.body.secure_url);
                this.setState({ fileUrls: newArray })
                this.setState({ imageLock: true })

            })
        });


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
        this.setState({
            filePaths: files,
            fileDropped: true

        });
    }

    render() {

        return (
            <div className='container'>
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-2">
                        <Label>Photos</Label>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-6 col-sm-offset-2">
                        <Dropzone
                            multiple={true} // only allow one image
                            accept="image/*" // must be image
                            onDrop={this.onImageDrop.bind(this)}
                            style={dropzoneStyle}
                        >
                            <ImageUploadText className="text-center">Drag and drop here</ImageUploadText>
                        </Dropzone>
                    </div>
                    {
                        this.state.fileDropped === false ? null :
                            <div>
                                {
                                    this.state.filePaths.map((item, index) => (
                                        <img width="400" src={item.preview} alt="responsive image" />
                                    ))
                                }
                            </div>
                    }
                </div>
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3" style={{ marginTop: 100 }}>
                        <BlackButton onClick={this.handleImageUpload.bind(this)} >Lock in Images</BlackButton>
                        {
                            this.state.imageLock === false ? null :
                                <OrangeButton onClick={this.pushUpload.bind(this)} >Finish</OrangeButton>
                        }
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
