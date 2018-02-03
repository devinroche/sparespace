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
                border: '1px solid black'
            },
            nameStyle: {
                marginBottom: 0,
                fontWeight: 'bold',
            },
            imageSize: {
                width: '20%'
            }
        }
      
        const activeListings = this.props.listings ? this.props.listings.map((listing) => {
            return (
            <Link to={`/listing/${listing._id}`}>
                <div style={styles.msgCard} className='row'>
                    <Image cloudName="dopxmkhbr" publicId={listing.images[0]} style={styles.imageSize}/>
                    <p style={styles.nameStyle}>{listing.title}</p>
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
