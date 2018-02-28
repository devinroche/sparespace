import React, { Component } from "react"

class Footer extends Component {
  render() {
    return (
      <div className="container">
        <div className="row footer-section">
          <div className="col-sm-2 col-sm-offset-2">
            <h4><strong>SpareSpace</strong></h4>
            <p><a href="/faq">FAQs</a></p>
            <p><a href="/about">About Us</a></p>
            <p><a href="/contact">Contact Us</a></p>
          </div>
          <div className="col-sm-2 col-sm-offset-1">
            <h4><strong>Discover</strong></h4>
            <p><a href="/sign_up">Create an Account</a></p>
            <p><a href="/listings">Browse Listings</a></p>
            <p><a href="/create_listing">Create Lisitng</a></p>
          </div>
          <div className="col-sm-2 col-sm-offset-1">
            <h4><strong>About</strong></h4>
            <p><a href="/tos">Terms of Service</a></p>
            <p><a href="/privacy">Privacy Policy</a></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer;