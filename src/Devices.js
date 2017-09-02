import React from 'react';




export class Devices extends React.Component {
    render() {

        const deviceStyle = {
            width: '100%',
            height: '100%',

        };


        return (
            <img className="img-responsive" style={deviceStyle} alt="devices" src='https://i.imgur.com/5LPKfCM.png' />
        )
    }
}
