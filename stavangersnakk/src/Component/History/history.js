import React, { Component } from "react";

import axios from "axios";

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: [],
      Historys: []
    };
    this.loadHistory = this.loadHistory.bind(this);
  }

  componentWillMount() {
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
    return (
      <div>
        <h1>Historys</h1>

        {this.state.Historys.map((value, index) => {
          return <p>{value.History + " " + value.Latitude}</p>;
        })}
      </div>
    );
  }
}
