import React from "react"
import axios from "axios"
import { Image } from "cloudinary-react"
import { Link } from "react-router-dom"

class UserListings extends React.Component {
    constructor() {
        super()
        this.state = {
            user: "",
            data: [],
            msg: []
        }
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
            <Link to={`/listing/${listing._id}`}>
                <div style={styles.msgCard} className='row'>
                    <div className="col-sm-4"><Image cloudName="dopxmkhbr" publicId={listing.images[0]} style={styles.imageSize}/></div>
                    <div className="col-sm-8"><p style={styles.nameStyle}>{listing.title}</p></div>
                </div>
            </Link>)
        }) : ''
        return (
            <div className='row'>
                <div className='col-sm-6 col-sm-offset-3'>
                    <hr />
                    <h3>Your Listings</h3>
                    {activeListings}
                </div>
            </div>
        )
    }
}

export default UserListings
