import React from "react"
import axios from "axios"
import { Image } from "cloudinary-react"
import {Link} from "react-router-dom"


class Listings extends React.Component {
	constructor() {
		super()
		this.state = {
			listings: []
		}
	}

    componentDidMount(){
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

        console.log(this.state.listings)
        return (
            <div>
                <div className="container" style={{background: "transparent"}}>

                    {this.state.listings.map((l, index) => (
                        /*<div key={ index }></div>*/
                            <div className="card col-md-3 col-md-offset-1" style={{width: "20rem", padding:"15px"}}>
                                <Image cloudName="dopxmkhbr" publicId={l.images[0]} width="200"/>
                                <div className="card-block text-center">
                                    <h4 className="card-title">{l.title}</h4>
                                    <p className="card-text">{l.price}</p>
                                    <p className="card-text">{l.description}</p>
                                    <Link to={`/listing/${l._id}`}><button className="btn btn-primary">view me!</button></Link>
                                </div>
                        </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Listings
