import React from 'react'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'
import { Link } from "react-router-dom"
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";

const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoiZGV2aW5yb2NoZSIsImEiOiJjamJvNjc1aTYzbWg3MzJxeTJ2ejBkcGE4In0.jYTHkOOzGtxzn8VcaZnN6w'
});

class SubMap extends React.Component {
    handleClick = (id) => {
        console.log(id)
    }


    render() {
        const mapStyle = {
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%',
            height: '30vh'
        };

        return (
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                center={[-117.4029896, 47.6698996]}
                zoom={[13]}
                maxZoom={13}
                containerStyle={mapStyle}>
                <Layer type="circle" id="marker"
                    paint={{
                        'circle-radius': {
                            'base': 8,
                            'stops': [
                                [0, 10],
                                [1, 10],
                                [2, 10],
                                [3, 10],
                                [4, 10],
                                [5, 20],
                                [6, 20],
                                [7, 20],
                                [8, 20],
                                [9, 30],
                                [10, 30],
                                [11, 30],
                                [12, 20],
                                [13, 20],
                                [14, 50],
                                [15, 70],
                                [16, 90],
                                [17, 110],
                                [18, 150],
                                [19, 200],
                                [20, 300],
                                [21, 400],
                                [22, 500]
                            ]
                        },
                        'circle-color': "#34495e",
                        "circle-opacity": 0.2
                    }}>
                    {
                        <Feature
                            coordinates={[this.props.l.lng, this.props.l.lat]}
                        />
                    }
                </Layer>
            </Map>
        );
    }
}

export default SubMap