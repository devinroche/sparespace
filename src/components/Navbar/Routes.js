import React from 'react';
import { Route, Redirect } from "react-router-dom"
import Login from "../Login"
import Home from "../Home"
import SignUp from "../SignUp"
import ListingDetails from '../Listing/ListingDetails'
import CreateListing from "../CreateListing/CreateListing"
import Chat from "../Profile/Chat/Chat"
import { Listings } from "../Listing/Listings"
import Profile from "../Profile/Profile"
import ImageUploadNew from "../CreateListing/ImageUpload"

const Routes = () => {

    return (
        <div>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/create_listing" component={CreateListing} />
            <Route path="/add_photos" component={ImageUploadNew} />
            <Route path="/listings" component={Listings}/>
            <Route path="/users/:id" component={Profile}/>
            <Route path="/listing/:id" component={ListingDetails} />
            <Route path="/sign_up" component={SignUp}/>
            <Route path="/chat/:host/:renter" component={Chat}/>
        </div>
    )
};

export default Routes;