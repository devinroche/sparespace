import React, { Component } from "react"
import CreateListing from "../CreateListing/CreateListing"
import './create_listing.css';
import ImageUpload from "./ImageUpload";
import Cookies from '../../Cookies';
import axios from 'axios';
import swal from 'sweetalert2';
import { postSpace } from '../../sock'
import { Redirect } from "react-router-dom"
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'



class CreateListingSlide extends Component {

    constructor(props) {
        super(props);
        this.state = {
         
        };
     


    }   

    


    

    render() {
        return (
            <div className="container">
                <div className = "allSides">
                    <div>
                        <h2 className ="redLabel">Property Basics</h2>
                    </div>
                    <div>
                        <h2>Property Details</h2>
                    </div>
                    <div>
                        <h2>Photos</h2>
                    </div>
                </div>
            
            </div>
        );
    }
}

export default CreateListingSlide;





