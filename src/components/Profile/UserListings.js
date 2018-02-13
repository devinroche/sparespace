import React from "react"
import axios from "axios"
import Cookies from '../../Cookies';
import swal from 'sweetalert2';
import { Image } from "cloudinary-react"
import { Link, Redirect } from "react-router-dom"
import EditListing from "./EditListing"
import DeleteListing from './DeleteListing'
import {MessageName, MessageCard} from "../Styles";

class UserListings extends React.Component {
    constructor() {
        super()
        this.state = {
            showEdit: false,
            showDelete: false
        }

        this.toggleEdit = this.toggleEdit.bind(this)
        this.toggleDelete = this.toggleDelete.bind(this)
    }

    toggleEdit(lid) {
        this.setState({
            list_id: lid,
        }, () => {
            this.setState({
                showEdit: !this.state.showEdit,
                showDelete: false
            })
        })
    }
    handler(e) {
        e.preventDefault()
        this.setState({
            showDelete: false
        })
    }

    toggleDelete(lid) {
        this.setState({
            list_id: lid,
        }, () => {
            this.setState({
                showDelete: !this.state.showDelete,
                showEdit: false
            })
        })
    }

    handleDelete(event) {
        this.setState({showDelete: false})
    }


    render() {

        let activeListings = this.props.listings ? this.props.listings.map((listing) => {
            return (
                <MessageCard key={listing._id}>
                    <Link to={`/listing/${listing._id}`}>
                        <div className='row'>
                            <div className="col-sm-4"><Image cloudName="dopxmkhbr" publicId={listing.images[0]} style={styles.imageSize} /></div>
                            <div className="col-sm-8"><MessageName>{listing.title}</MessageName></div>
                        </div>
                    </Link>
                    <button onClick={(e) => { this.toggleEdit(listing._id, e) }} >Edit</button>
                    <button onClick={(e) => { this.toggleDelete(listing._id, e) }} >Delete</button>
                </MessageCard>
            )
        }) : "";

        activeListings = activeListings.length !== 0 ? activeListings : "no listings :("
        return (
            <div className='row'>
                <div className='col-sm-6 col-sm-offset-3'>
                    <MessageName style={{fontSize: "24", fontWeight: "300", marginTop: "15"}}>Your Listings</MessageName>
                    {activeListings}
                </div>
                <div className='col-sm-3'>
                    {this.state.showEdit && <EditListing list_id={this.state.list_id} />}
                    {this.state.showDelete && <DeleteListing list_id={this.state.list_id} toggle={this.handleDelete()}/> }
                </div>
            </div>
        )
    }
}

export default UserListings

const styles = {

    imageSize: {
        maxWidth: '100%',
    }
};
