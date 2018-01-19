import React from 'react'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
    accessToken:'pk.eyJ1IjoiZGV2aW5yb2NoZSIsImEiOiJjamJvNjc1aTYzbWg3MzJxeTJ2ejBkcGE4In0.jYTHkOOzGtxzn8VcaZnN6w'
});

class Mapo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          geo: [],
        };
     }

    componentDidMount() {
        this.getCordinates()
        // this.map = new mapboxgl.Map({
        //     container: this.mapContainer,
        //     style: 'mapbox://styles/mapbox/streets-v9',
        //     center: [-117.4029896, 47.6698996],
        //     zoom: 13,
        // });
    }
    getCordinates = () => {
        var self = this;
        axios.get('http://localhost:3001/cordinates')
            .then(function(response) {
                self.setState({geo: response.data});
            })
    }

    handleClick = (id) => {
        console.log(id)
        // this.props.setListing(id)
    }

  
    render() {
        const mapStyle = {
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%',
            height: '90vh'
        };

        return (
            <Map
            style="mapbox://styles/mapbox/streets-v9"
            center={[-117.4029896, 47.6698996]}
            zoom={[13]}
            containerStyle={mapStyle}>
                <Layer type="circle" id="marker" 
                paint={{
                    'circle-radius': {
                        'base': 8,
                        'stops': [
                            [5, 30],
                            [10, 20],
                            [20, 10]
                        ]
                    },
                    'circle-color': "#34495e",
                    "circle-opacity": 0.2
                    }}>
                    {
                    this.state.geo.map((l, idx) => (
                        <Feature
                            key={idx}
                            coordinates={[l.lng, l.lat]}
                            onClick={this.handleClick(l)}
                            />
                        ))
                    }
                </Layer>
            </Map>
        );
    }
  }

  export default Mapo