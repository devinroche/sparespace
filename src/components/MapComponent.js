import React, { Component } from 'react';
import L from 'leaflet';
import { Map,Marker, Popup, TileLayer, CircleMarker, Circle} from 'react-leaflet';
import {Icon} from 'leaflet'
import axios from "axios";



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
  }

  componentDidMount() {
    this.getCordinates();
  }

  render() {

    const mapStyle = {
        height: "100vh"
    }
   
    const allCordinates = this.state.data.map((review) => {
       return (
      //   <Circle center={[review.lat,review.lng]} radius={150} >
      //     <Popup>
      //       <span>{review.title}</span>
      //     </Popup> 
      //  </Circle>
         <CircleMarker center={[review.lat, review.lng]} color="red" radius={20}>
           <Popup>
             <span>Popup in CircleMarker</span>
           </Popup>
         </CircleMarker>

       );
    })

    return (
        <div>
          <Map style={mapStyle} center={[47.6672354,-117.4013339]} zoom={14}>
          <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
          {allCordinates}

          <CircleMarker center={[47.6672354, -117.4013339]} radius={20}>
            <Popup>
              <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
            </Popup>
          </CircleMarker>
          </Map>
          
        </div>
        
    );
  }
}


export default MapComponent;
