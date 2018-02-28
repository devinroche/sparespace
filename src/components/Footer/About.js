import React, { Component } from "react";
import { LoginHeader } from "../Styles";

class Tos extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <LoginHeader>About sparespace</LoginHeader>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-10 col-sm-offset-1">
            <p>
              sparespace is a platform that serves as a peer - to - peer
              marketplace for storage for the students at Gonzaga University and
              the Spokane, WA community. The idea was originated from two
              students at Gonzaga University, and was developed as part of a
              senior design capstone project at Gonzaga University for 2017 -
              2018.
            </p>
            <p>
              The students came with the idea after noticing a common theme and
              issue towards the end of every academic year:
              <p>
                {" "}
                <i>
                  Where can students store their belongings? Many of these
                  students are out-of-state and cannot bring their mattresses,
                  couches, and other furniture and necessities back home with
                  them because they are too large. Surely, they can opt to use a
                  commercial-storage solution to store their belongings, but
                  this solution is more expensive and presents a potential
                  transportation dilemma where students have to commute back and
                  forth to the storage facility. This will especially be a major
                  conflict for students who lack a vehicle. On the other side of
                  the story, there are students who lease off-campus houses and
                  when they leave to return back to their hometowns for the
                  summer, their leased houses become vacant for the summer. What
                  if there were a platform that connects off-campus student
                  houses with students searching for storage?
                </i>
              </p>
            </p>
            <p>
              And hence, to solve this problem, sparespace was born. sparespace
              will allow Gonzaga students, members of the Gonzaga community and
              the Spokane community to find and connect with off-campus students
              who lease off-campus houses, providing a more affordable storage
              solution than traditional "big-box" commercial solutions. Our
              platform will enable individuals and student households near
              Gonzaga University to offer their unutilized storage space to
              Gonzaga students and members of the Spokane community at a
              discounted rate than tradition storage options. This will give
              members of the household the opportunity to earn an extra income.
              In the end, renters will save money on storage expenses, and
              off-campus Gonzaga houses will earn additional income. It is a
              "win-win" scenario as parties from both sides benefit.
            </p>
            <p />
            <p>
              sparespace has received numerous recognition and support from businesses and entrepreneurship programs, including
              Gonzaga's Hogan Entrepreneurial Leadership Program and Start-Up Spokane.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Tos;
