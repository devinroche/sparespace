import React, { Component } from "react"
import {CreateLabel, FormStyle, WhiteButton, PriceInput, DescriptionInput, Label} from "../Styles";




class Outline extends Component {

    render() {

        const box = {
            
            border: "solid",
            display: "flex",
            flexDirection: "column",
            alignContent: "space-between",
            padding: "25px 25px",
            borderColor: "#DDDDDD",
            borderRadius: "3px",
            boxShadow: "0 1px 1px 0 rgba(0,0,0,0.1)"

        };


        return (
            <div className="row" style={box}>
                <div className="row">
                    
                    <Label style={{color: "#333"}}>Space Basics</Label>
                
                </div>
                <div className="row">
                    
                    <Label style={{color: "#333"}}>Space Details</Label>
                
                </div>
                <div className="row">
                    
                    <Label style={{color: "#333"}}>Photos</Label>
                
                </div>
            
    
            </div>
        );
    }
}

export default Outline;





