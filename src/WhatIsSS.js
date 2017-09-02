import React from 'react';
import './media.css'


export  class WhatIsSS extends React.Component {
    render(){

        const subText = {
            textAlign: 'center',
            fontStyle: 600,
            fontSize: '1.4em',

        }


        const subText2 = {
            fontSize: '1.4em',
            textAlign: 'center',
            marginTop: 30
        }

        const divStyle = {
            marginTop: 250,
            paddingBottom: 50,
            borderTop: '1px solid #EBECED',
            backgroundColor: '#FCFBFC'

        }

        return(

            <div className="container-fluid" style={divStyle}>
                <h1 className="text-center"> <b> What is sparespace? </b> </h1>
                <div className="container subHeader">
                    <p style={subText}> Sparespace is an upcoming web and mobile application which will connect users who are in need of storage space with users who have storage space to offer.
                        Currently being developed by Gonzaga students, sparespace will
                        provide a cheaper and easier alternative storage solution. Our goal is to have Gonzaga Juniors and Seniors list space in their off campus house and have Freshmen
                        and Sophomores rent this space.
                        </p>
                    <p style={subText2}> If you have any questions, would like to contribute, or any other inquiries, please feel free to email us at: <a href={'mailto:gkunthara1@gmail.com'}>hello@usesparespace.com</a></p>
                </div>
            </div>


        )
    }
}