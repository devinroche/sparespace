import React from "react"
import { Image } from "cloudinary-react"
import { Link } from "react-router-dom"
import EditListing from "./EditListing"
import DeleteListing from './DeleteListing'
import CloseListing from './CloseListing'
import {MessageName, MessageCard} from "../Styles";

class UserListings extends React.Component {
    constructor() {
        super()
        this.state = {
            showEdit: false,
            showDelete: false,
            showClose: false
        }

        this.toggleEdit = this.toggleEdit.bind(this)
        this.toggleDelete = this.toggleDelete.bind(this)
        this.toggleClose = this.toggleClose.bind(this)
    }

    toggleEdit(lid) {
        this.setState({
            list_id: lid,
        }, () => {
            this.setState({
                showEdit: !this.state.showEdit,
                showDelete: false,
                showClose: false
            })
        })
    }
    handler(e) {
        e.preventDefault()
        this.setState({
            showDelete: false,
            showClose: false
        })
    }

    toggleDelete(lid) {
        this.setState({
            list_id: lid,
        }, () => {
            this.setState({
                showDelete: !this.state.showDelete,
                showClose: false,
                showEdit: false
            })
        })
    }
    toggleClose(lid) {
        this.setState({
            list_id: lid,
        }, () => {
            this.setState({
                showClose: !this.state.showClose,
                showDelete: false,
                showEdit: false
            })
        })
    }

    handleDelete(event) {
        this.setState({showDelete: false})
    }
    handleClose(event) {
        this.setState({ showClose: false })
    }

    
    render() {

        const editStyle = {
                color: '#fff',
                width: 100,
                height: 25,
                marginBottom: 5,
                background: "linear-gradient(to right, #FE947B, #FC5B45)",
                border: "linear-gradient(to right, #FE947B, #FC5B45)",
                borderRadius: 5
        };

        const deleteStyle =  {
                color: "#FFF",
                width: 100,
                height: 25,
                background: "linear-gradient(to right, #FE947B, #FC5B45)",
                border: "none",
                borderRadius: 5
        };
        const closeStyle = {
            color: "#FFF",
            width: 100,
            height: 25,
            marginBottom: 5,
            background: "linear-gradient(to right, #FE947B, #FC5B45)",
            border: "none",
            borderRadius: 5
        };

        let activeListings = this.props.listings && this.props.listings.length !== 0 ? this.props.listings.map((listing) => {
            return (
                <MessageCard key={listing._id} className="row">
                        <div className='row' style={{paddingBottom:10}}>
                        <Link to={`/listing/${listing._id}`}>
                            <div className="col-sm-4"><Image cloudName="dopxmkhbr" publicId={listing.images[0]} style={styles.imageSize} /></div>
                            <div className="col-sm-4">{listing.status === 0 ? 'Closed Listing' : 'Active Listing'}<MessageName>{listing.title}</MessageName></div>
                            </Link>
                            <div className="col-sm-4">
                                <div className='row'>
                                <button className='col-sm-12' style={closeStyle} onClick={(e) => { this.toggleClose(listing._id, e) }} >Close</button>
                                </div>
                                <div className='row'>
                                <button className='col-sm-12'  onClick={(e) => { this.toggleEdit(listing._id, e) }} style={editStyle}>Edit</button>
                                </div>
                                <div className='row'>
                                <button className='col-sm-12'  style={deleteStyle} onClick={(e) => { this.toggleDelete(listing._id, e) }} >Delete</button>
                                </div>
                            </div>
                            </div>
                    {/* <div className="row">
                        <button className='col-sm-2 col-sm-offset-2' style={closeStyle} onClick={(e) => { this.toggleClose(listing._id, e) }} >Close</button>
                        &nbsp; &nbsp; &nbsp;
                        <button className='col-sm-2 col-sm-offset-1' onClick={(e) => { this.toggleEdit(listing._id, e) }} style={editStyle}>Edit</button>
                        &nbsp; &nbsp; &nbsp;
                        <button className='col-sm-2 col-sm-offset-1' style={deleteStyle} onClick={(e) => { this.toggleDelete(listing._id, e) }} >Delete</button>
                    </div> */}
                </MessageCard>
            )
        }) :
            <MessageCard>
                <MessageName>
                    No Listings :(
                </MessageName>
            </MessageCard>

        activeListings = activeListings.length !== 0 ? activeListings : "no listings :("
        return (
            <div className='row'>
                <div className='col-sm-6 col-sm-offset-3'>
                    <MessageName style={{fontSize: "24", fontWeight: "300", marginTop: "15"}}>Your Listings</MessageName>
                    {activeListings}
                </div>
                <div className='col-sm-3'>
                    {this.state.showClose && <CloseListing list_id={this.state.list_id} toggle={this.handleClose()} />}
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
