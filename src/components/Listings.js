import React from "react"
import axios from "axios"
import { Image } from "cloudinary-react"


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
                            <div className="card" style={{marginTop: "250px", width: "20rem", border: "solid"}}>
                            {/*<img className="card-img-top" src="" alt="Card image cap"/>*/}
                            <Image cloudName="dopxmkhbr" publicId={l.images[0]} width="200"/>
                                <div className="card-block">
                                    <h4 className="card-title">{l.title}</h4>
                                    <p className="card-text">{l.price}</p>
                                    <p className="card-text">{l.description}</p>
                                    <a className="btn btn-primary">Go somewhere</a>
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
