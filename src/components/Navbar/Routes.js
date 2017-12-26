import React from 'react';
import { Route, Redirect } from "react-router-dom"
import Login from "../Login"
import LoggedIn from "../LoggedIn"
import Home from "../Home"
import SignUp from "../SignUp"
import ListingDetails from '../Listing/ListingDetails'
import CreateListing from "../CreateListing/CreateListing"
import { Listings } from "../Listing/Listings"
import ImageUploadNew from "../CreateListing/ImageUpload"

const Routes = () => {
    return (
        <div>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/create_listing" component={CreateListing} />
            <Route path="/add_photos" component={ImageUploadNew} />
            <Route path="/listings" component={Listings}>{" "}</Route>
            <Route path="/users/:id" component={LoggedIn} />
            <Route path="/listing/:id" component={ListingDetails} />
            <Route path="/sign_up" component={SignUp}>{" "}</Route>
        </div>
    )
}

export default Routes;