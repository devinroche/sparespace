import React, { Component } from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import swal from "sweetalert";
import {Redirect } from "react-router-dom";
import Slider from 'react-rangeslider';



class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            valuePriceLow:0,
            valuePriceHigh:0,
            valueDurationLow:0,
            valueDurationHigh:0

        };
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);

    }

    handleChangeComplete() {
        this.props.onFilterChange(this.state.valuePriceLow,this.state.valuePriceHigh,this.state.valueDurationLow,this.state.valueDurationHigh,this.state.sort)
    }

    


    handleSortChange(e) {
        this.props.onSortChange(e.target.value)

    }

    

    


    render() {


        return (
            <div className = 'container' style={{marginTop: '50px'}}>
                <form>
                    <div className = 'form-inline'>
                        
                            <div className='form-group border' style = {{borderStyle:'rounded'}}>
                                
                                <select className="form-control"  onChange={this.handleSortChange} >
                                    <option value = 'Filters' selected>Sort By</option>
                                    <option value="most_recent" onClick = {this.handleSortChange} >Newest First</option>
                                    <option value="least_recent">Oldest First</option>
                                    <option value="cost_high">Price (high - low</option>
                                    <option value = "cost_low">Price (low - high)</option>
                                </select>
                                
                            </div>
                        
                        
                        <div className = 'form-group border' style ={{marginLeft:'10px'}}>
                            Pricing High:
                            <div className='slider'>
                                <Slider
                                min={0}
                                max={100}
                                value={this.state.valuePriceHigh}
                                onChange={ e => this.setState({ valuePriceHigh : e }) }
                                onChangeComplete={this.handleChangeComplete}
                                />
                            </div>
                        </div>
                        <div className = 'form-group border' style = {{marginLeft:'10px'}}>
                            Pricing Low:
                            <div className='slider'>
                                <Slider
                                min={0}
                                max={100}
                                value={this.state.valuePriceLow}
                                onChange={ e => this.setState({ valuePriceLow : e }) }
                                onChangeComplete={this.handleChangeComplete}

                                />
                            </div>
                        </div>
                        <div className = 'form-group border' style ={{marginLeft:'10px'}}>
                            Duration High:
                            <div className='slider'>
                                <Slider
                                min={0}
                                max={100}
                                value={this.state.valueDurationHigh}
                                onChange={ e => this.setState({ valueDurationHigh : e }) }
                                onChangeComplete={this.handleChangeComplete}
                                />
                            </div>
                        </div>
                        <div className = 'form-group border' style = {{marginLeft:'10px'}}>
                            Duration Low:
                            <div className='slider'>
                                <Slider
                                min={0}
                                max={100}
                                value={this.state.valueDurationLow}
                                onChange={ e => this.setState({ valueDurationLow : e }) }
                                onChangeComplete={this.handleChangeComplete}
                                />
                            </div>
                        </div>
                        
                    </div>
						
                </form>
            


            </div>
        );
    }
}

export default Filter;