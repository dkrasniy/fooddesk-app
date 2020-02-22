import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import data_json from "../markers.json";

const MAP_TOKEN =
  "pk.eyJ1IjoibG91aXNwaGFtMjMiLCJhIjoiY2p1dzBldGRtMDdjcjN5bGFqOTNpcXVneCJ9.w6egnce6WFupf_Bww5hVJg";

function Map() {
  const [viewPort, setDefaultPort] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });

  return (
    <div>
      <ReactMapGL
        {...viewPort}
        mapboxApiAccessToken={MAP_TOKEN}
        mapStyle="mapbox://styles/louispham23/ck6y79fvx33fj1jp8a3h67zxe"
        onViewportChange={viewPort => {
          setDefaultPort(viewPort);
        }}
      >
        {data_json.features.map(location => (
          <Marker
            key={location.properties.dbh}
            latitude={location.geometry.coordinates[1]}
            longitude={location.geometry.coordinates[0]}
          >
            <h1 className="text-white text-4xl">MARKER</h1>
            <div>
              <button></button>
            </div>
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default Map;
