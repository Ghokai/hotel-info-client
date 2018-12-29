import React, { Component } from "react";
import Header from "./Header";
import { Switch, Route } from "react-router-dom";
import UploadPage from "../pages/UploadPage";
import AboutPage from "../pages/AboutPage";

//not found route
const NotFound = () => (
  <div className="row">
    <div className="col-lg-12">
      <div className="alert alert-danger" role="alert">
        <span>
          <span className=" oi mr5 oi-x " />
          404 Not Found
        </span>
      </div>
    </div>
  </div>
);

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: null
    };
  }
  //renders app header and route pages
  render() {
    return (
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/" component={UploadPage} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}
