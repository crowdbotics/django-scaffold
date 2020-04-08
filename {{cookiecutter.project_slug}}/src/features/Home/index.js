import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">Welcome!</div>
          <div className="card-body">
            <div className="bd-example">
              <p className="h2">This is the sample application created and deployed from the Crowdbotics app. You can view list of modules selected for this application in left panel.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
