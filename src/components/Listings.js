import React from "react";
import axios from 'axios';

class Listings extends React.Component {
    constructor() {
        super();
        this.state = {
            listings: {
                title: [],
                duration: [],
                description: []
            }
        };
    }

    componentDidMount(){
        axios.get("http://localhost:3001/listings")
            .then(response => {
                console.log(response.data)
                let titles = []
                let durations = []
                let descriptions = []
                for(let listing of response.data){
                    titles.push(listing.title)
                    durations.push(listing.duration)
                    descriptions.push(listing.description)


                }
                console.log(titles, durations, descriptions)

                this.setState({
                    listings:{
                        title:  titles,
                        duration: durations,
                        description: descriptions
                    }
                })
            })
            .catch(function (error) {
                console.log("bad");
            });
    }

    render() {


        console.log(this.state.listings)
        // const listItems = this.state.listings.map((d) => <li key={this.state.listing.title}>{this.state.listing.duration}</li>);


        return (
            <div>
                <div className="container" style={{background: "transparent"}}>
                    <div className="card" style={{marginTop: "250px", width: "20rem"}}>
                        <img className="card-img-top" src="" alt="Card image cap"/>
                        <div className="card-block">
                                <h4 className="card-title">{this.state.listings.title}</h4>
                                <p className="card-text">{this.state.listings.description}</p>
                                <p className="card-text">{this.state.listings.duration}</p>
                            <a className="btn btn-primary">Go somewhere</a>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Listings;
