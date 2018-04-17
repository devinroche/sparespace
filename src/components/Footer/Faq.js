import React, { Component } from "react";
import { Header, SubHeader, Row } from "../Styles";
import Collapsible from "react-collapsible";

import "./Faq.css";

class Faq extends Component {
  render() {
    return (
      <div className="container">
        <Row className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <Header>Frequently Asked Questions</Header>
          </div>
        </Row>

        <div className="row">
          <div className="col-sm-5 col-sm-offset-1">
            <div className="title">
              <p>I'm a renter looking for storage:</p>
            </div>
            <Collapsible trigger="What is sparespace?"> 
              <p>Sparespace is a web-application that serves as a peer-to-peer marketplace  
                for storage. Our goal is to provide a more affordable and alternative  
                storage solution, in comparison to traditional "big-box" commercial storage  
                solutions. To accomplish this, we created a platform that will enable Gonzaga  
                University students to find and connect with off-campus students who lease  
                off-campus houses that have unutilized extra space that they can offer for lease.</p>  
                <p>Our platform allows users to post and offer their storage space for lease,  
                search for nearby storage spaces, and message each other to discuss terms and  
                pricing</p> 
            </Collapsible>
            <Collapsible trigger="Where does sparespace offer storage?">
            <p>Sparespace is a storage platform that serves the community of  
                Gonzaga University and Spokane. 
              </p> 
            </Collapsible>
            <Collapsible trigger="How much does storage cost?">
            <p>Storage costs are determined soley between the renter and the host.</p> 
              <p>Sparespace does not charge for the use of our platform. Our platform 
                is free to use. 
              </p> 
            </Collapsible> 
            <Collapsible trigger="Does sparespace screen hosts and their listings/property?"> 
              <p>No.</p> 
              <p>Sparespace does not screen, perform background check, or inspect the host and their 
                properties and listings. Sparespace soley acts as a platform that serves as a bulletin 
                that connects renters and hosts. 
              </p> 
            </Collapsible>
            <Collapsible trigger="How are payment transactions processed and made?"> 
              <p>This must be decided and agreed upon by the renter and the host.</p> 
              <p>Sparespace does not handle or process any payments/transcations whatsoever. We are soley 
                a platform that acts as a bulletin for renters and hosts. 
              </p> 
            </Collapsible> 
            <Collapsible trigger="When and how often can I access my things?"> 
              <p>This is decided between the host and the renter. Before the lease begins, 
                they must negotiate and agree to terms on how and when the renter party  
                can access their property.  
                In the listing the Host agrees to provide the times that  
                the Renter may access Stored Items. In some cases,  
                Host may provide Renter with means for unlimited Access.  
                Renter must contact Host at least 24 hours in advance to request  
                Access unless otherwise specified in rental agreement. 
              </p> 
            </Collapsible> 
          </div>
          <div className="col-sm-5">
            <div className="title">
              <p>I'm a host with unused space:</p>
            </div>
            <Collapsible trigger="How do I make money as a host?">
              
            <p>You offer your unused,extra space for lease so a perspective renter can lease it from you.</p> 
              <p>You and the renter agree on the lease price and terms and you make money by leasing your space out.</p> 
            </Collapsible>
            <Collapsible trigger="What am I liable for?">
            <p>By using our platform, you assume all risk and liability for what might occur.</p> 
            </Collapsible>
            <Collapsible trigger="Is sparespace a safe platform to find renters?">
              <p>We think so.</p>
              <p>
                We don't do background checks or anything like that. You assume
                all risk. Don't blame us if you get shot or robbed.
              </p>
            </Collapsible>
            <Collapsible trigger="Do I get to choose which reservations I want to approve or decline?">
              <p>Yes.</p>
              <p>
                It is important that you screen and do your due dilligence 
                on perspective renters. 
              </p>
            </Collapsible>
            <Collapsible trigger="How much does it cost to rent out my storage space?"> 
              <p>FREE!</p> 
              <p>There are no fees in using our platform. Sparespace is 100% free!</p> 
            </Collapsible> 
            <Collapsible trigger="What can I rent out?"> 
              <p>Anything that can be considered as 'storage space'!</p> 
              <p>Examples that are considered as 'storage space' closets, garages, 
                rooms, and sheds. 
              </p> 
            </Collapsible> 
          </div>
        </div>
      </div>
    );
  }
}

export default Faq;
