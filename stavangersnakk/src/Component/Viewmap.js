import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import Cmarker from "./marker";
export default class Viewmap extends Component {
  constructor(props) {
    super(props);
    this.center = [58.969975, 5.733107];
    this.posistion = [{ id: 0, Latitude: 58.962406, Longitude: 5.741906 }];
    //this.Historys = props.Historys;
    this.state = {
      data: props.Historys
    };
  }
  render() {
    console.log(this.state.data);
    const markers = this.posistion.map(marker => (
      <Cmarker key={marker.id} marker={marker} />
    ));

    return (
      <Map center={this.center} zoom={14.2} minZoom={13} className="map">
        <TileLayer
          // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png"
        />
        {markers}
      </Map>
    );
  }
}
