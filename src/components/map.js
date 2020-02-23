import React, { useState } from "react";
import ReactMapGL, {
  Marker,
  Popup,
  GeolocateControl,
  NavigationControl
} from "react-map-gl";
import data_json from "../markers.json";
import { IoMdPin } from "react-icons/io";

const MAP_TOKEN =
  "pk.eyJ1IjoibG91aXNwaGFtMjMiLCJhIjoiY2p1dzBldGRtMDdjcjN5bGFqOTNpcXVneCJ9.w6egnce6WFupf_Bww5hVJg";

function Map() {
  const [viewPort, setDefaultPort] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 38.66015,
    longitude: -121.34709,
    zoom: 13
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
                <h1 className="text-2xl text-blue-600 text-xl font-bold">
                  {location.properties.location}
                </h1>
                <IoMdPin className="fill-current text-orange-600 " size={40} />
              </button>
              {/* {select ? (
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
              ) : null} */}
            </div>
          </Marker>
        ))}
        <div style={{ position: "absolute", left: 0 }} className="m-16">
          <NavigationControl />
        </div>
      </ReactMapGL>
    </div>
  );
}

export default Map;
