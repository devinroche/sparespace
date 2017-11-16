import React, { Component } from 'react';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer,Circle } from 'react-leaflet';
import axios from "axios"



class MapComponent extends Component {
	constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  getCordinates() {
    const _this = this;
    axios.get('http://localhost:3001/cordinates')
      .then(function(response) {
        _this.setState({
          data: response.data
        });
        
      })
      .catch(function(response) {
        console.log(response);
      });
  }

  componentDidMount() {
    this.getCordinates();
  }

  


  render() {
    /*
    <div>
           { 
            data.map((l, index) => (
              <div>
                <Circle center={[l.lat,l.lng]} radius={200} ></Circle>
                }
              </div>
            ))
            }
              
          </div>
    */
    
    const allCordinates = this.state.data.map((review) => {
       return (
        <Circle center={[review.lat,review.lng]} radius={200} ></Circle>
       );
    })

    return (
        <div>
          <Map center={[47.6062,-122.3321]} zoom={13}>
          <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
          {allCordinates}
          </Map>
          
        </div>
        
    );
  }
}


export default MapComponent;
