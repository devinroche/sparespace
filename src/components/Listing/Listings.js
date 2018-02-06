import React from "react"
import axios from "axios"
import { Image } from "cloudinary-react"
import {Link} from "react-router-dom"
import Mapo from '../Map'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3001');

export class Listings extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
            listings: [],
        }

        socket.on('refresh listings', ()=>{
            axios.get("http://localhost:3001/listings")
                .then(response => {
                    this.setState({
                        listings: response.data
                    })
                })
        });
	}

    componentDidMount(){
        this.getListings()
    }

    getListings(){
        axios.get("http://localhost:3001/listings")
            .then(response => {
                this.setState({
                    listings: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const styles = {
            cardStyle : {
                width: 300,
                height: 300,
                marginTop: 25,
                marginBottom: 15,
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
            },

            imageSize : {
                width: 250,
                height: 200
            },

            mainStyle : {
                fontFamily: "Roboto",
                color: "#333",
            },

            secondStyle : {
                fontFamily: "Roboto",
                color: "#7F7F7F"
            },

            priceStyle : {
                fontFamily : "Roboto",
                color: "#333",
                fontWeight: "bold"
            },
            containerStyle: {
                overflowY: 'scroll',
                height: '90vh'
            }
        }

        return (
            <div className = "row">
                <div className="col-sm-7 col-sm-offset-1" style={styles.containerStyle}>
                        {this.state.listings.map((l, index) => (
                            <Link to={`/listing/${l._id}`}>
                                <div className= "card col-sm-2 col-sm-offset-1" style={styles.cardStyle}>
                                    <Image cloudName="dopxmkhbr" publicId={l.images[0]} style={styles.imageSize}/>
                                    <div className="card-block">
                                        <h4 style={styles.mainStyle} className="card-title text-left">{l.title}</h4>
                                        <h6 style={styles.secondStyle} className="card-text text-left">{l._host.first}</h6>
                                        <h4 style={styles.priceStyle} className="card-text text-right">${l.price}</h4>
                                    </div>
                                </div>
                            </Link>
                            ))
                        }
                    </div>

                <div className = "col-sm-4" >
                    <Mapo />
                </div>
            </div>
        )
    }
}

export default Listings;
