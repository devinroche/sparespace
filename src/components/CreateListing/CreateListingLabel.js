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



class CreateListingLabel extends Component {

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
                        {
                            this.props.page_basics === false ? null  : // determine current page
                                <h2 className ="redLabel">Property Basics</h2>
                        }
                        {
                            this.props.page_basics === true ? null  :
                                <h2 className ="">Property Basics</h2>
                        }
                    </div>
                    <div>
                        {
                            this.props.page_details === false ? null  : // determine current page
                                <h2 className ="redLabel">Property Details</h2>
                        }
                        {
                            this.props.page_details === true ? null  :
                                <h2 className ="">Property Details</h2>
                        }
                    </div>
                    <div>
                    {
                            this.props.page_photos === false ? null  : // determine current page
                                <h2 className ="redLabel">Photos</h2>
                        }
                        {
                            this.props.page_photos === true ? null  :
                                <h2 className ="">Photos</h2>
                        }
                    </div>
                </div>
            
            </div>
        );
    }
}

export default CreateListingLabel;





