import React from "react";
import { Marker, Popup } from "react-leaflet";
function Cmarker(props) {
  return (
    <div className="marker">
      <Marker position={[props.marker.Latitude, props.marker.Longitude]}>
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
