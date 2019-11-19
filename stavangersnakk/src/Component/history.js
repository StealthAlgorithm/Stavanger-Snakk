import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";
import axios from "axios";

export default class History extends Component {
  constructor(props) {
    super(props);
    this.getcords();
    this.center = [58.969975, 5.733107];
    this.posistion = [{ id: 0, Latitude: 58.962406, Longitude: 5.741906 }];
    this.state = {
      historys: [],
      location: []
    };

    this.loadHistory = this.loadHistory.bind(this);

    this.loadHistory();
  }

  async loadHistory() {
    const promise = await axios.post("http://localhost:11000/historydata");
    const status = promise.status;
    if (status === 200) {
      this.setState({ historys: promise.data });
    }
  }

  //hente koordinater fra nettleser
  getcords() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        location: [position.coords.latitude, position.coords.longitude]
      });
    });
  }

  render() {
    const markers = this.state.historys.map(marker => (
      <Marker
        key={marker.HistoryID}
        position={[marker.Latitude, marker.Longitude]}
        draggable={false}
      >
        <Popup>{marker.History}</Popup>
      </Marker>
    ));

    return (
      <div>
        <Map
          center={this.center}
          zoom={14.2}
          minZoom={13}
          className="map"
          maxBounds={[
            [58.986145, 5.763853],
            [58.945169, 5.693569]
          ]}
        >
          <TileLayer
            // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png"
          />

          {markers}
        </Map>
        {this.state.historys.map(value => {
          return (
            <p key={value.HistoryID}>
              {value.History +
                " Latitude: " +
                value.Latitude +
                " Longitude: " +
                value.Longitude}
            </p>
          );
        })}
        <h3>
          Dine Coords lat {this.state.location[0]} og lng{" "}
          {this.state.location[1]}
        </h3>
      </div>
    );
  }
}
