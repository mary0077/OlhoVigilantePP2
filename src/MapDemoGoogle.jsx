import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoBox,
} from "@react-google-maps/api";

const containerStyle = {
  width: "30vw", // width: '623px',
  height: "60vh", // height: '729px'
};

const center = {
  lat: -8.0456,
  lng: -34.8981,
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "e7908772ecd09578", //'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_MAPS_JS_API_KEY, //""
  });

  const [map, setMap] = React.useState(null);
  const [marker, setMarker] = React.useState(null);
  const markerRef = React.useRef(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMarkerClick = (ref) => {
    //setMarker(() => )
    console.log(ref?.current)
    let contentString = "Centro do Recife";
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      ariaLabel: "Recife",
      //position: markerRef.current.props.position
    });
    infowindow.open(map);
    /* infowindow.open(
      map,
      anchor
    ); */
  };

  
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker
        position={center}
        label={"Test Marker"}
        draggable={true}
        onClick={handleMarkerClick}
        ref={markerRef}
      ></Marker>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
