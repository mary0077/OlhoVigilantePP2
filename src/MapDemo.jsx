import "leaflet/dist/leaflet.css";
import MapDemoLeaftlet from "./MapDemoLeaflet";
import MapDemoGoogle from "./MapDemoGoogle";
import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import * as opencage from "opencage-api-client";
import { GeoSearchControl, MapBoxProvider } from "leaflet-geosearch";
import { SearchBox } from "@mapbox/search-js-react";

import MyMap from "./MyMap";

// Import API Keys
const controlGeocodingApiKey = import.meta.env.VITE_OPENCAGE_GEOCODING_API_KEY;
const tileApiKey = import.meta.env.VITE_APP_THUNDERFOREST_TILE_API_KEY;
const mapboxApiToken = import.meta.env.VITE_APP_MAPBOX_GEOSEARCH_API_TOKEN;

const MapWithGeocodeDemo = () => {
  const map = useMap();
  //map.setMaxBounds(-13.53920,-45.06592,-1.27431,-33.39844); // Limitar o mapa à região Nordeste?

  let mapOpts = {
    center: [-8.0456, -34.8981],
    zoom: 10,
    bounds: "-13.53920,-45.06592,-1.27431,-33.39844",
  };

  map.setView(mapOpts.center, mapOpts.zoom);

  L.tileLayer(
    "https://tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=" + tileApiKey,
    {
      attribution:
        'Data <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, Map tiles &copy; <a href="https://www.thunderforest.com/">Thunderforest</a>',
      minZoom: 4,
      maxZoom: 18,
    }
  ).addTo(map);

  SearchField(mapboxApiToken, map);

  // GeoSearch Control

  // busca params
  /* let controlOpts = {
    key: controlGeocodingApiKey,
    limit: 10,
    proximity: "-8.0456,-34.8981",
    countrycode: "br",
    bounds: "-45.06592,-13.53920,-33.39844,-1.27431", // Nordeste
    // openlayers options
    position: "topright",
  }; */

  //let c = opencage.geocode(gcOpts); // Returns a promise
  //map.flyTo(ocorrencia.latlng)
  //let control = L.Control.openCageGeocoding(options).addTo(map);

  //return;
};

const SearchField = (apiKey, map) => {
  const provider = new MapBoxProvider({
    params: {
      access_token: apiKey,
    },
  });

  const searchControl = new GeoSearchControl({
    provider: provider,
    showPopup: true,
    marker: {
      draggable: true,
    },
  });

  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};

export default function MapDemo() {

  return (
    <>
      <div className="flex gap-4 justify-center items-center h-screen">
        {/* <MapContainer
          //center={boundsCenter}
          center={[-8.0456, -34.8981]}
          zoom={10}
          style={{ height: "60vh", width: "60vh" }}
        >
          <MapWithGeocodeDemo />
          
        </MapContainer> */}
        {/* <MyMap /> */}
        <MapDemoGoogle />
      </div>
    </>
  );
}
