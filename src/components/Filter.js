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
            valuePrice:0,
            valueDuration:0

        };
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);

    }

    handleChangeComplete() {
        this.props.onFilterChange(this.state.valuePrice,this.state.valueDuration)
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
                        
                        
                        <div className = 'form-group border' style ={{marginLeft:'10px', width:'150px'}}>
                            Pricing $ :
                            <div className='slider'>
                                <Slider
                                min={0}
                                max={300}
                                value={this.state.valuePrice}
                                onChange={ e => this.setState({ valuePrice : e }) }
                                onChangeComplete={this.handleChangeComplete}
                                />
                            </div>
                        </div>
                        <div className = 'form-group border' style ={{marginLeft:'10px', width:'150px'}}>
                            Duration (Months) :
                            <div className='slider'>
                                <Slider
                                min={0}
                                max={4}
                                value={this.state.valueDuration}
                                onChange={ e => this.setState({ valueDuration : e }) }
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