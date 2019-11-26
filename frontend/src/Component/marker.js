import React from "react";
import { Marker, Popup } from "react-leaflet";
async function Cmarker(props) {
  return (
    <div className="marker">
      <Marker
        position={await [props.marker.Latitude, props.marker.Longitude]}
        draggable={false}
      >
        {/*   <Popup>
          A pretty CSS3 popup.
          <br />
          Easily customizable.
        </Popup> */}
      </Marker>{" "}
    </div>
  );
}

export default Cmarker;
