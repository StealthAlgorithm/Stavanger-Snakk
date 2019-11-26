import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import { Marker, Popup } from "react-leaflet";
import axios from "axios";

export default class History extends Component {
  constructor(props) {
    super(props);
    this.getcords();
    this.center = [58.969975, 5.733107];
    this.posistion = [];
    this.state = {
      historys: [],
      location: [],
      selected: []
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
  selectHistory(id) {
    console.log(id);
  }

  addMarker = e => {
    const { historys } = this.state;
    const { lat, lng } = e.latlng;
    historys.push({
      HistoryID: historys.length + 1,
      UserID: 1,
      Latitude: lat,
      Longitude: lng,
      History: "tester"
    });
    this.setState({ historys });
    console.log(this.state.historys);
  };
  render() {
    const markers = this.state.historys.map(marker => (
      <Marker
        onClick={this.selectHistory(marker.HistoryID)}
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
          onClick={this.addMarker}
          center={this.center}
          zoom={14.2}
          minZoom={13}
          ref={this.mapRef}
          className="map"
          maxBounds={[
            [58.986145, 5.763853],
            [58.945169, 5.693569]
          ]}
        >
          <TileLayer
            //nytt design kart designer konstatin
            // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.mapbox.com/styles/v1/stealthalgorithm/ck38knnvx1c6z1cpj7nyst8g0/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3RlYWx0aGFsZ29yaXRobSIsImEiOiJjazM4aGZsZ2IwOHVoM3Bvdng2a2UwNHUzIn0.H5YK9CC9XhpGRfMt0vtQrw"
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
