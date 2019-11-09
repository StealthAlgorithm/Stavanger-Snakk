import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Cmarker from "./marker";
export default class Viewmap extends Component {
  constructor(props) {
    super();
    this.center = [58.969975, 5.733107];
    this.posistion = [{ id: 0, Latitude: 58.967158, Longitude: 5.732188 }];
    //this.Historys = props.Historys;
    //console.log(props);
  }

  render() {
    const markers = this.posistion.map(marker => (
      <Cmarker key={marker.id} marker={marker} />
    ));

    return (
      <Map center={this.center} zoom={14.2} className="map">
        <TileLayer
          // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png"
        />
        {markers}
      </Map>
    );
  }
}
