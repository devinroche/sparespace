import React, { Component } from "react"
import {CreateLabel, FormStyle, WhiteButton, PriceInput, DescriptionInput, Label} from "../Styles";




class Outline extends Component {

    render() {

        const box = {
            
            border: "solid",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "25px 25px",
            borderColor: "#DDDDDD",
            borderRadius: "3px",
            boxShadow: "0 1px 1px 0 rgba(0,0,0,0.1)"

        };


        return (
            <div className="row" style={box}>
                <div className="row">
                {
                    this.props.pageBasics === true ? null  : // determine current page
                        <Label style={{color: "#333", fontSize: "17"}}>Space Basics</Label>
                }
                {
                    this.props.pageBasics === false ? null  : // determine current page
                        <Label style={{color: "#333", fontSize: "17"}}><u style={{textDecoration: "none", borderBottom: "2px solid #FC5B45 "}}>Space Basics</u></Label>
                }
                    
                    
                
                </div>
                <div className="row">
                {
                    this.props.pageD === true ? null  : // determine current page
                        <Label style={{color: "#333", fontSize: "17"}}>Space Details</Label>
                }
                {
                    this.props.pageD === false ? null  : // determine current page
                        <Label style={{color: "#333", fontSize: "17"}}><u style={{textDecoration: "none", borderBottom: "2px solid #FC5B45 "}}>Space Details</u></Label>
                }
                </div>
                <div className="row">
                    
                {
                    this.props.pageI === true ? null  : // determine current page
                        <Label style={{color: "#333", fontSize: "17"}}>Photos</Label>
                }
                {
                    this.props.pageI === false ? null  : // determine current page
                        <Label style={{color: "#333", fontSize: "17"}}><u style={{textDecoration: "none", borderBottom: "2px solid #FC5B45 "}}>Photos</u></Label>
                }
                
                </div>
            </div>
        );
    }
}

export default Outline;





