import React, { Component } from "react";
import { LoginHeader, Paragraph } from "../Styles";
import Footer from "../Footer/Footer";


class Tos extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 text-center">
            <LoginHeader>About Sparespace</LoginHeader>
          </div>
        </div>

        <div className="row" style={{marginTop: 15}}>
          <div className="col-sm-10 col-sm-offset-1">
            <Paragraph>
              Sparespace is a platform that serves as a peer-to-peer
              marketplace for storage for the students at Gonzaga University. The idea was developed as part of a
              senior design capstone project at Gonzaga University for 2017 -
              2018.
            </Paragraph>
            <Paragraph>
              The students on the team noticed a common theme and
              issue towards the end of every academic year:
              <Paragraph>
                {" "}
                <i>
                  Where can students store their belongings? Many of these
                  students are out-of-state and cannot bring their mattresses,
                  couches, and other furniture and necessities back home with
                  them because they are too large. On the other side of
                  the story, there are students who lease off-campus houses and
                  when they leave to return back to their hometowns for the
                  summer, their leased houses become vacant for the summer. What
                  if there were a platform that connects off-campus student
                  houses with students searching for storage?
                </i>
              </Paragraph>
            </Paragraph>
            <Paragraph>
              Sparespace will allow Gonzaga students to find and connect with off-campus students
              who lease off-campus houses with storage space to offer. Our
              platform will enable individuals and student households near
              Gonzaga University to offer their unutilized storage space to
              Gonzaga students. This will give members of the household the opportunity to earn an extra income.
              In the end, renters will save money on storage expenses, and
              off-campus Gonzaga houses will earn additional income. It is a
              "win-win" scenario as parties from both sides benefit.
            </Paragraph>
            <p/>
          </div>
        </div>
        <div className="row">
          <Footer/>
        </div>
      </div>
    );
  }
}

export default Tos;
