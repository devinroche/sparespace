import React from "react";
import axios from 'axios';
import {Image} from 'cloudinary-react';

let publicId = ""

class Listings extends React.Component {
    constructor() {
        super();
        this.state = {
            listings: {
                title: [],
                price: [],
                description: [],
                images: []
            }
        };
    }

    componentDidMount(){
        axios.get("http://localhost:3001/listings")
            .then(response => {
                let titles = []
                let prices = []
                let descriptions = []
                let images = []
                for(let listing of response.data){
                    titles.push(listing.title)
                    prices.push(listing.price)
                    descriptions.push(listing.description)
                    images.push(listing.images)


                }
                this.setState({
                    listings:{
                        title:  titles,
                        price: prices,
                        description: descriptions,
                        images: images
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
            });




    }




    render() {

        console.log(this.state.listings)
        console.log(this.state.listings.images[this.state.listings.images.length - 1])
        publicId = this.state.listings.images[this.state.listings.images.length - 1]
        // console.log(publicId[0])


        // const listItems = this.state.listings.map((d) => <li key={this.state.listing.title}>{this.state.listing.price}</li>);


        return (
            <div>
                <div className="container" style={{background: "transparent"}}>
                    {/*{*/}
                        {/*this.state.listings.map((listing, index)) => (*/}
                        {/*<div className="card" style={{marginTop: "250px", width: "20rem", border: "solid"}}>*/}
                        {/*/!*<img className="card-img-top" src="" alt="Card image cap"/>*!/*/}
                            {/*<Image cloudName="dopxmkhbr" publicId="yvgbgwjsddazuoq7u09j" width="200"/>*/}
                                {/*<div className="card-block">*/}
                                {/*<h4 className="card-title">{this.state.listings.title}</h4>*/}
                                {/*<p className="card-text">{this.state.listings.description}</p>*/}
                                {/*<p className="card-text">{this.state.listings.price}</p>*/}
                                {/*<a className="btn btn-primary">Go somewhere</a>*/}
                                {/*</div>*/}
                        {/*</div>*/}
                        {/*)*/}
                    {/*}*/}
                    <div className="card" style={{marginTop: "250px", width: "20rem", border: "solid"}}>
                        {/*<img className="card-img-top" src="" alt="Card image cap"/>*/}
                        <Image cloudName="dopxmkhbr" publicId={publicId} width="200"/>
                        <div className="card-block">
                                <h4 className="card-title">{this.state.listings.title}</h4>
                                <p className="card-text">{this.state.listings.description}</p>
                                <p className="card-text">{this.state.listings.price}</p>
                            <a className="btn btn-primary">Go somewhere</a>
                            </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Listings;
