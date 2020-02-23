import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import data_json from "../markers.json";
import { IoMdPin } from "react-icons/io";

const MAP_TOKEN =
  "pk.eyJ1IjoibG91aXNwaGFtMjMiLCJhIjoiY2p1dzBldGRtMDdjcjN5bGFqOTNpcXVneCJ9.w6egnce6WFupf_Bww5hVJg";

function Map() {
  const [viewPort, setDefaultPort] = useState({
    width: "60vw",
    height: "60vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 5
  });

  const [select, setPopup] = useState(false);

  return (
    <div>
      <ReactMapGL
        {...viewPort}
        mapboxApiAccessToken={MAP_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewPort => {
          setDefaultPort(viewPort);
        }}
      >
        {data_json.features.map(location => (
          <Marker
            key={location.properties.location}
            latitude={location.geometry.coordinates[1]}
            longitude={location.geometry.coordinates[0]}
          >
            <div>
              <button onClick={() => setPopup(true)}>
                <h1 className="text-2xl text-blue-500">
                  {location.properties.location}
                </h1>
                <IoMdPin className="fill-current text-blue-500 w-24" />
              </button>
              {select ? (
                <Popup
                  latitude={location.geometry.coordinates[1]}
                  longitude={location.geometry.coordinates[0]}
                  onClose={() => setPopup(false)}
                  closeButton={true}
                  closeOnClick={false}
                  anchor="top"
                  dynamicPosition={true}
                >
                  <div className="text-white">
                    {location.properties.location}
                  </div>
                </Popup>
              ) : null}
            </div>
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default Map;
