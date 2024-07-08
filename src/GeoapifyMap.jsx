import "@geoapify/leaflet-address-search-plugin";

// Lembrar de receber como parâmetro uma função para retornar o estado "temp" (vide implementação original em Ocorrencia.jsx) para o componente pai (Ocorrencia).

import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import {
  GeoSearchControl,
  GeoapifyProvider,
  MapBoxProvider,
} from "leaflet-geosearch";
import {
  MapContainer,
  useMap,
  TileLayer,
  useMapEvent,
  Marker,
} from "react-leaflet";
import * as L from "leaflet";

const initialCenter = [-8.063153, -34.87114];

const Map = ({setReportMarker}) => {
  //var map = L.map("my-map").setView([48.1500327, 11.5753989], 6);
  var map = useMap();
  var marker = null;

  var myAPIKey = import.meta.env.VITE_APP_GEOAPIFY_API_KEY; // Get an API Key on https://myprojects.geoapify.com
  var mapURL = L.Browser.retina
    ? `https://maps.geoapify.com/v1/tile/{mapStyle}/{z}/{x}/{y}.png?apiKey={apiKey}`
    : `https://maps.geoapify.com/v1/tile/{mapStyle}/{z}/{x}/{y}@2x.png?apiKey={apiKey}`;

  // Add map tiles layer. Set 20 as the maximal zoom and provide map data attribution.
  /* L.tileLayer(mapURL, {
    attribution:
      "Powered by Geoapify | © OpenMapTiles © OpenStreetMap contributors",
    apiKey: myAPIKey,
    mapStyle: "osm-bright-smooth", // More map styles on https://apidocs.geoapify.com/docs/maps/map-tiles/
    maxZoom: 20,
  }).addTo(map); */

  // Add Geoapify Address Search control
  const addressSearchControl = L.control.addressSearch(myAPIKey, {
    position: "topright",
    className: "custom-address-field", // add a custom class name
    lang: "pt",
    placeholder: "Digite um endereço aqui",
    noResultsPlaceholder: "Nenhum resultado encontrado",
    resultCallback: (address) => {
      if (marker) {
        marker.remove();
      }

      if (!address) {
        return;
      }

      marker = L.marker([address.lat, address.lon]).addTo(map);
      if (
        address.bbox &&
        address.bbox.lat1 !== address.bbox.lat2 &&
        address.bbox.lon1 !== address.bbox.lon2
      ) {
        map.fitBounds(
          [
            [address.bbox.lat1, address.bbox.lon1],
            [address.bbox.lat2, address.bbox.lon2],
          ],
          { padding: [100, 100] }
        );
      } else {
        map.setView([address.lat, address.lon], 15);
      }
    },
    suggestionsCallback: (suggestions) => {
      //console.log(suggestions);
    },
  });
  //map.addControl(addressSearchControl);

  // Mark on click and retrieve its latlng
  const [mrker, setMrker] = useState(L.marker(initialCenter));
  useMapEvent("click", (e) => {
    if (mrker) {
      mrker.removeFrom(map);
      mrker.setLatLng(e.latlng);
      mrker.addTo(map);
      setReportMarker(mrker.getLatLng()); // Sharing state with parent
    } /*  else {
      map.addLayer(L.marker(e.latlng));
      setMarker(L.marker(e.latlng));
    } */
  });

  useEffect(() => {
    map.addControl(addressSearchControl);
    return () => map.removeControl(addressSearchControl);
  }, []);

  return null;
};

const GeoapifyMap = ({setReportMarker}) => {
  return (
    <>
      <MapContainer
        center={initialCenter}
        zoom={10}
        style={{ height: "60vh", width: "60vh" }}
      >
        <Map setReportMarker={setReportMarker} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </>
  );
};

export default GeoapifyMap;
