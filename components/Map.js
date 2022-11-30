import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";
import "mapbox-gl/dist/mapbox-gl.css";

function Map({ searchResults }) {
  // console.log(searchResults);
  const [selectedLocation, setSelectedLocation] = useState({});
  // transform searchResults into the {latittude: 54.5454, longitude: 13.785745}
  const coordinates = searchResults.map((item) => ({
    longitude: item.long,
    latitude: item.lat,
  }));
  // console.log(coordinates);

  // The latitude and longitude of the center of location coordinates
  const center = getCenter(coordinates);
  // console.log(center);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  //   console.log(selectedLocation);

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/patitok/clb3mfzcy000914l7i27aagp9"
      mapboxAccessToken={process.env.mapbox_key}
      {...viewport}
      onMove={(next) => setViewport(next.viewState)}
    >
      {searchResults.map((result) => (
        <div key={result.img}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>

          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
