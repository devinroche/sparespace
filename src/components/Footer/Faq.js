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
            <SubHeader>
              Can't find what you are looking for?{" "}
              <a href="/contact">Contact Us!</a>
            </SubHeader>
          </div>
        </Row>

        <div className="row">
          <div className="col-sm-5 col-sm-offset-1">
            <div className="title">
              <p>I'm a renter looking for storage:</p>
            </div>
            <Collapsible trigger="Will my things be safe?">
              <p>Not sure.</p>
              <p>But if things get stolen, we ain't liable.</p>
            </Collapsible>
            <Collapsible trigger="Where does sparespace offer storage?">
              <p>The Gonzaga Community fam.</p>
            </Collapsible>
            <Collapsible trigger="How much does storage cost?">
              <p>A lot.</p>
              <p>Especially if you rent out George's vip room.</p>
            </Collapsible>
            <Collapsible trigger="Can I purchase renter's insurance?">
              <p>I guess?</p>
              <p>
                Like I said fam, sparespace ain't reliable if something goes
                wrong.
              </p>
            </Collapsible>
            <Collapsible trigger="When and how often can I access my things?">
              <p>check with the dude that you are renting from.</p>
            </Collapsible>
          </div>
          <div className="col-sm-5">
            <div className="title">
              <p>I'm a host with unused space:</p>
            </div>
            <Collapsible trigger="How do I make money as a host?">
              <p>You rent out your space.</p>
              <p>You get paid. It ain't rocket science.</p>
            </Collapsible>
            <Collapsible trigger="What am I liable for?">
              <p>EVERYTHING.</p>
              <p>
                For the 100000th time, sparespace ain't reponsible for anything.
                You assume ALL risk.
              </p>
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
                But just to let you know, it's illegal to discriminate based on
                color, religion, race, disability,and all the other legal jazz
                out there.
              </p>
            </Collapsible>
            <Collapsible trigger="Do I have to pay anything to rent out my storage space?">
              <p>sparespace takes 100% commission of what you make.</p>
              <p>So to answer you question,yes.</p>
            </Collapsible>
          </div>
        </div>
      </div>
    );
  }
}

export default Faq;
