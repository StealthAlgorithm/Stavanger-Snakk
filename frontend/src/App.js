import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

import History from "./Component/history";

import error404 from "./Component/error404";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={History} />
        <Route path="/404" exact component={error404} />
      </Router>
    );
  }
}

export default App;
