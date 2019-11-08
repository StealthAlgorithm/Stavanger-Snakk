import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Category from "./Component/History/history";

import error404 from "./Component/History/error404";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Category} />
        <Route path="/404" exact component={error404} />
      </Router>
    );
  }
}

export default App;
