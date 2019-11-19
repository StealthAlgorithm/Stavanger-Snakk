import React, { Component } from "react";
import Viewmap from "./Viewmap";
import axios from "axios";

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: [],
      Historys: [{ id: 0, Latitude: 58.962406, Longitude: 5.741906 }]
    };
    this.loadHistory = this.loadHistory.bind(this);
    this.loadHistory();
  }

  async loadHistory() {
    const promise = await axios.post("http://localhost:11000/historydata");
    const status = promise.status;
    if (status === 200) {
      const data = promise.data;
      this.setState({ Historys: data });
    }
  }

  render() {
    console.log("Loading History");
    return (
      <div>
        <Viewmap Historys={this.state.Historys} />
        {this.state.Historys.map((value, index) => {
          return (
            <p key={index}>
              {value.History +
                " Latitude: " +
                value.Latitude +
                " Longitude: " +
                value.Longitude}
            </p>
          );
        })}
      </div>
    );
  }
}
