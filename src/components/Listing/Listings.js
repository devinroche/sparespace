import React from "react"
import axios from "axios"
import { Image } from "cloudinary-react"
import { Link } from "react-router-dom"
import moment from 'moment'
import Mapo from '../Map'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { DateRange } from 'react-date-range';
import openSocket from 'socket.io-client';
import map from "react-mapbox-gl/lib/map";
const socket = openSocket('http://localhost:3001');

export class Listings extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listings: [],
            value: { min: 0, max: 100 },
            search: '',
            showCal: false,
            startDate: moment(),
            endDate: moment().add(1, 'years')
        }

        socket.on('refresh listings', () => {
            axios.get("http://localhost:3001/listings")
                .then(response => {
                    let calcMax = Math.max.apply(Math, response.data.map(function (o) { return o.price; }))
                    this.setState({
                        listings: response.data,
                        value: {
                            max: calcMax,
                        }
                    })
                })
        });
    }

    componentDidMount() {
        this.getListings()
    }

    getListings() {
        axios.get("http://localhost:3001/listings")
            .then(response => {
                let calcMax = Math.max.apply(Math, response.data.map(function (o) { return o.price; }))
                this.setState({
                    listings: response.data,
                    value: {
                        max: calcMax,
                        min: 0
                    }
                })
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    updateSearch(e) {
        this.setState({ search: e.target.value })
    }
    handleInit(date) {
        this.setState({
            startDate: date.startDate._d,
            endDate: date.endDate._d,
            
        })
    }
    handleSelect(date) {
        this.setState({
            startDate: date.startDate._d,
            endDate: date.endDate._d,
        })
    }
    toggleCal() {
        this.setState({ showCal: !this.state.showCal });
    }
    clearDates(){
        this.setState({
            startDate: moment(),
            endDate: moment().add(1, 'years')
        })
    }
    render() {
        let filteredListings = this.state.listings.filter((listing) => {
            return (
                (listing.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                || listing.description.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
                && (listing.price >= this.state.value.min && listing.price <= this.state.value.max)
                && (moment(listing.dateAvailable[0]).isSameOrAfter(this.state.startDate))
            )
        })

        return (
            <div className="row">
                <div className="col-sm-8 col-sm-offset-1" style={styles.containerStyle}>
                    <div className="row" >
                        <div className='row'>
                            <div className='col-sm-4'>
                                <input type='text' value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="Search" />
                            </div>
                            <div className='col-sm-4'>
                                <InputRange
                                    maxValue={Math.max.apply(Math, this.state.listings.map(function (o) { return o.price; }))}
                                    minValue={0}
                                    value={this.state.value}
                                    onChange={value => { this.setState({ value }) }} />
                            </div>
                            <div className='col-sm-4'>
                                <button onClick={this.toggleCal.bind(this)}>date range</button>
                                <button onClick={this.clearDates.bind(this)}>clear dates</button>
                                {this.state.showCal && <DateRange
                                    onInit={this.handleInit.bind(this)}
                                    onChange={this.handleSelect.bind(this)}
                                />}
                            </div>
                        </div>
                    </div>
                    {filteredListings.map((l, index) => (
                        <Link to={`/listing/${l._id}`}>
                            <div className="card col-sm-2 col-sm-offset-1" style={styles.cardStyle}>
                                <Image cloudName="dopxmkhbr" publicId={l.images[0]} style={styles.imageSize} />
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

                <div className="col-sm-3" >
                    <Mapo />
                </div>
            </div>
        )
    }
}

export default Listings;

const styles = {
    cardStyle: {
        width: 300,
        height: 300,
        marginTop: 25,
        marginBottom: 15,
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
    },

    imageSize: {
        width: 250,
        height: 200
    },

    mainStyle: {
        fontFamily: "Roboto",
        color: "#333",
    },

    secondStyle: {
        fontFamily: "Roboto",
        color: "#7F7F7F"
    },

    priceStyle: {
        fontFamily: "Roboto",
        color: "#333",
        fontWeight: "bold"
    },
    containerStyle: {
        overflowY: 'scroll',
        height: '90vh',
    }
}