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
                paddingBottom: 15,
                paddingTop: 15,
                textAlign: 'left',
                border: '1px solid #ddd',
                overflow: 'hidden',
                borderRadius: 3,
                boxShadow: "0 0 3px rgba(0,0,0,0.15)"
            },
            nameStyle: {
                marginBottom: 0,
                fontWeight: 'bold',
                color: '#000'
            },
            imageSize: {
                maxWidth: '100%'
            }
        }
      
        const activeListings = this.props.listings ? this.props.listings.map((listing) => {
            return (
            <Link to={`/listing/${listing._id}`}>
                <div style={styles.msgCard}>
                    <div className="col-sm-3">
                        <Image cloudName="dopxmkhbr" publicId={listing.images[0]} style={styles.imageSize}/>
                    </div>
                    <div className="col-sm-9">
                        <p style={styles.nameStyle}>{listing.title}</p>
                    </div>
                </div>
            </Link>)
        }) : ''
        return (
            <div className='row'>
                <div className='col-sm-6 col-sm-offset-3'>
                    <h3>Your Listings</h3>
                    {activeListings}
                </div>
            </div>
        )
    }
}

export default UserListings
