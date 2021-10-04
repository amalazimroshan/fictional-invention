import React from "react";
import "../map/index.css";
import GoogleMapReact from "google-map-react";
import { Badge } from "react-bootstrap";
import mapStyle from "./GoogleMapStyles";

const Map = ({ setCoordinates, setBounds, places }) => {
  return (
    <div className="map-container">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyA7fxRJt42JWzLQQyYFmDmzcI0c_z3xhI8",
        }}
        defaulCenter={{ lat: 0, lng: 0 }}
        center={{ lat: 64.9631, lng: 19.0208 }}
        defaultZoom={3}
        options={{
          styles: mapStyle,
          disableDefaultUI: true,
          zoomControl: true,
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        // onChildClick={""}
      >
        {places?.map((place, i) => (
          <Badge
            key={i}
            pill
            className="markerBadge"
            // style={{ color: "#343434", fontSize: "0.8rem" }}
            lat={place.position.coordinates[1]}
            lng={place.position.coordinates[0]}
          >
            {place.price}
          </Badge>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
