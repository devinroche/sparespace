import React from 'react';


export class Logo extends React.Component {

    render(){
        const logoStyle = {
            color: 'red',
            fontSize: '2em',
            marginTop: 25

        };

        return(
            <div className="container">
                <nav className="navbar">
                    <a className="navbar-brand" style={logoStyle}><b>sparespace</b></a>
                </nav>
            </div>
        )
    }

}