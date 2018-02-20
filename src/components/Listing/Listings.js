import React from "react"
import axios from "axios"
import moment from 'moment'
import Mapo from '../Map'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { DateRange } from 'react-date-range';
import { ListingCard } from "./ListingCard";
import {FilterContainer, OrangeButton, SearchInput} from "../Styles";
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');


export class Listings extends React.Component {
    constructor() {
        super();
        this.state = {
            listings: [],
            value: { min: 0, max: 100 },
            range: { start: moment(), end: moment().add(1, 'Y') },
            search: '',
            max: 100,
            showCalendar: false
        };

        this.getListings = this.getListings.bind(this) 
    }

    componentDidMount() {
        this.getListings()
        socket.on('refresh listings', this.getListings);
    }

    getListings() {
        axios.get("http://localhost:3001/listings")
            .then(response => {
                let datesArr = response.data.map(l => moment(l.dates[0])).sort((a, b) => {return b - a});
                let findMax = Math.max.apply(Math, response.data.map(o => { return o.price }));
                let calcMax = findMax === Number.NEGATIVE_INFINITY ? 100 : findMax;
                this.setState({
                    listings: response.data,
                    value: { max: calcMax, min: 0 },
                    max: calcMax,
                    range: {start: datesArr[0]}
                })
            })
    }

    updateSearch(e) {
        this.setState({ search: e.target.value })
    }
    handleSelect(range) {
        this.setState({
            range: {
                start: range.startDate,
                end: range.endDate._d
            }
        })
    }
    toggleCalendar() {
        this.setState({
            showCalendar: !this.state.showCalendar
        })
    }
    render() {
        let filteredListings = this.state.listings.filter((listing) => {
            return (
                (listing.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
                    || listing.description.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
                && (listing.price >= this.state.value.min && listing.price <= this.state.value.max)
                && (moment(listing.dates[0]).isSameOrBefore(this.state.range.start))
            )
        });
        return (
            <div className="container-fluid">
                <FilterContainer className="col-sm-7 col-sm-offset-1">
                    <div className="row">
                            <div className='col-sm-4'>
                                <SearchInput className="searchBar" type='text' value={this.state.search} onChange={this.updateSearch.bind(this)} style={styles.formStyle} placeholder="Search Listings" />
                            </div>
                            <div className='col-sm-4'>
                                <InputRange
                                    maxValue={this.state.max}
                                    minValue={0}
                                    value={this.state.value}
                                    onChange={value => {this.setState({ value })}}
                                    />
                            </div>
                            <div className="col-sm-4">
                                <OrangeButton style={{padding: 7}} onClick={this.toggleCalendar.bind(this)}>Date Range</OrangeButton>
                            </div>
                    </div>


                    <div className="row">
                        {this.state.showCalendar ? <DateRange
                            onInit={this.handleSelect.bind(this)}
                            onChange={this.handleSelect.bind(this)}
                        /> : null}
                    </div>
                </FilterContainer>

                    <div className="col-sm-8">
                        {filteredListings.map((l, index) => (<ListingCard key={index} listing={l} />))}
                    </div>
                <div className="col-sm-4"><Mapo/></div>
            </div>
        )
    }
}

export default Listings;
