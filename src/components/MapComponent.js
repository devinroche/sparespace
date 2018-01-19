import React, { Component } from 'react';
import { Map, Popup, TileLayer, Circle} from 'react-leaflet';
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
   
    const allCordinates = this.state.data.map((review, idx) => {
       return (
         <Circle key={idx} center={[review.lat, review.lng]} color="red" radius={120}>
           <Popup>
             <span>Popup in CircleMarker</span>
           </Popup>
         </Circle>

       );
    })

    return (
        <div>
          <Map style={mapStyle} center={[47.6672354,-117.4013339]} zoom={14}>
          <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
          {allCordinates}

          <Circle center={[47.6672354, -117.4013339]} radius={120}>
            <Popup>
              <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
            </Popup>
          </Circle>
          </Map>
          
        </div>
        
    );
  }
}


export default MapComponent;
