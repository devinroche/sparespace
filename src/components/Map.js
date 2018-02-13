import React from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";

const Map = ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoiZGV2aW5yb2NoZSIsImEiOiJjamJvNjc1aTYzbWg3MzJxeTJ2ejBkcGE4In0.jYTHkOOzGtxzn8VcaZnN6w'
});

class Mapo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            geo: [],
            l: ''
        };
    }

    componentDidMount() {
        this.getCordinates()
    }
    getCordinates = () => {
        var self = this;
        axios.get('http://localhost:3001/cordinates')
            .then(function (response) {
                self.setState({ geo: response.data });
            })
    }

    handleClick = (id) => {
        this.setState({
            l: id
        })
    }


    render() {
        const mapStyle = {
            width: '100%',
            height: '100vh',
        };

        return (
            <Map
                style="mapbox://styles/mapbox/light-v9"
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
                        'circle-color': "#FC5B45",
                        "circle-opacity": 0.2
                    }}>
                    {
                        this.state.geo.map((l, idx) => (
                            <Feature
                                key={idx}
                                coordinates={[l.lng, l.lat]}
                                onClick={this.handleClick.bind(this, l)}
                            />
                        ))
                    }
                </Layer>
                {this.state.l &&
                    <Popup coordinates={[this.state.l.lng, this.state.l.lat]}>
                        <Link to={`/listing/${this.state.l._id}`}><p>{this.state.l.title}</p></Link>
                    </Popup>
                }
            </Map>
        );
    }
}

export default Mapo