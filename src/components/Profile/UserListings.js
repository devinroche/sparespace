import React from "react"
import axios from "axios"
import { Image } from "cloudinary-react"
import { Link } from "react-router-dom"
import EditListing from "./EditListing"

class UserListings extends React.Component {
    constructor() {
        super()
        this.state = {
            showEdit: false
        }

        this.toggleEditForm = this.toggleEditForm.bind(this)
    }

    toggleEditForm(lid){
        this.setState({
            list_id: lid,
        }, () => {
            console.log(this.state)
            this.setState({showEdit: true})
        })
    }
    render() {
        const styles = {
            msgCard: {
                marginTop: 25,
                marginBottom: 25,
                padding: 15,
                textAlign: 'left',
                border: '1px solid rgba(0, 0, 0, .2)',
                boxShadow: "0 4px 12px 0 rgba(0,0,0,0.2)",
                borderRadius: 5
            },
            nameStyle: {
                marginBottom: 0,
                fontWeight: 'bold',
                fontSize: 18,
                color: '#2f3542',
            },
            imageSize: {
                width: '80%',
                height: 90
            }
        }

        const activeListings = this.props.listings ? this.props.listings.map((listing) => {
            return (
                <div key={listing._id} style={styles.msgCard}>
                    <Link to={`/listing/${listing._id}`}>
                        <div className='row'>
                            <div className="col-sm-4"><Image cloudName="dopxmkhbr" publicId={listing.images[0]} style={styles.imageSize} /></div>
                            <div className="col-sm-8"><p style={styles.nameStyle}>{listing.title}</p></div>
                        </div>
                    </Link>
                    <button onClick={(e)=>{this.toggleEditForm(listing._id, e)}} >Edit</button>
                </div>
            )
        }) : ''
        return (
            <div className='row'>
                <div className='col-sm-6 col-sm-offset-3'>
                    <hr />
                    <h3>Your Listings</h3>
                    {activeListings}
                </div>
                <div className='col-sm-3'>
                    {this.state.showEdit && <EditListing list_id={this.state.list_id}/>}
                </div>
            </div>
        )
    }
}

export default UserListings
