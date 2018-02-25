import React from 'react';
import { Route, Redirect } from "react-router-dom"
import Login from "../Login"
import Home from "../Home"
import SignUp from "../SignUp"
import ListingDetails from '../Listing/ListingDetails'
import CreateListingPage from "../CreateListing/CreateListingPage"
import Chat from "../Profile/Chat/Chat"
import Faq from "../Faq"
import Tos from "../Tos"
import Contact from "../Contact"
import About from "../About"
import Privacy from "../Privacy"
import { Listings } from "../Listing/Listings"
import Profile from "../Profile/Profile"
import ImageUploadNew from "../CreateListing/ImageUpload"

const Routes = () => {

    return (
        <div>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/create_listing" component={CreateListingPage} />
            <Route path="/listings" component={Listings}/>
            <Route path="/users/:id" component={Profile}/>
            <Route path="/listing/:id" component={ListingDetails} />
            <Route path="/sign_up" component={SignUp}/>
            <Route path="/chat/:host/:renter" component={Chat}/>
            <Route path="/faq" component={Faq}/>
            <Route path="/tos" component={Tos}/>
            <Route path="/privacy" component={Privacy}/>
            <Route path="/about" component={About}/>
            <Route path="/contact" component={Contact}/>
        </div>
    )
};

export default Routes;