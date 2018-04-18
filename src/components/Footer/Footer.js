import React, { Component } from "react"
import {FooterLink} from "../Styles";
import {Link} from "react-router-dom";



class Footer extends Component {
  render() {
    return (
      <div className="container">
        <div className="row footer-section" style={{textAlign: "center"}}>
          <ul className="list-inline">
            <li><Link to="/about"><FooterLink href="#">About<span style={{ color: "#FC5B45" }}>&nbsp; &bull; </span></FooterLink></Link></li> 
              <li><Link to="/faq"><FooterLink href="#">FAQ<span style={{ color: "#FC5B45" }}>&nbsp; &bull; </span></FooterLink></Link></li> 
              <li><Link to="/tos"><FooterLink href="#">Terms of Service<span style={{ color: "#FC5B45" }}>&nbsp; &bull; </span></FooterLink></Link></li>
              <li><FooterLink href="mailto:usesparespace@gmail.com">Contact Us<span style={{ color: "#FC5B45" }}>&nbsp; &bull; </span></FooterLink></li> 
              <li><Link to="/privacy"><FooterLink href="#">Privacy Policy</FooterLink></Link></li> 
          </ul>
        </div>
      </div>
    )
  }
}

export default Footer;