import React, { Component } from "react"
import {FooterLink} from "../Styles";


class Footer extends Component {
  render() {
    return (
      <div className="container">
        <div className="row footer-section" style={{textAlign: "center"}}>
          <ul className="list-inline">
              <li><FooterLink href="/about">About<span style={{ color: "#FC5B45" }}>&nbsp; &bull; </span></FooterLink></li>
              <li><FooterLink href="/faq">FAQ<span style={{ color: "#FC5B45" }}>&nbsp; &bull; </span></FooterLink></li>
              <li><FooterLink href="/tos">Terms of Service<span style={{ color: "#FC5B45" }}>&nbsp; &bull; </span></FooterLink></li>
              <li><FooterLink href="/contact">Contact Us<span style={{ color: "#FC5B45" }}>&nbsp; &bull; </span></FooterLink></li>
              <li><FooterLink href="/privacy">Privacy Policy</FooterLink></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Footer;