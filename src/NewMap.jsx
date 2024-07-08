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
import centerMarkerIcon from "/centermarker.png";
import dangerMarkerIcon from "/danger-icon.png";
import axios from "axios";

const initialCenter = [-8.063153, -34.87114];

const Map = ({ apiKey }) => {
  const map = useMap({});
  const [ocorrencias, setOcorrencias] = useState([]);
  const [marker, setMarker] = useState(L.marker(initialCenter));

  if (ocorrencias) {
    let icon = L.icon({
      iconUrl: dangerMarkerIcon,
      iconSize: [30, 30],
      //iconAnchor: [0, 0],
      //popupAnchor: [-3, -76],
      //shadowUrl: 'my-icon-shadow.png',
      //shadowSize: [68, 95],
      //shadowAnchor: [22, 94]
    });
    ocorrencias.map((elem) => {
      if (elem.geolocalizacao && elem.geolocalizacao.length > 10) {
        let latlng = elem.geolocalizacao.split(",");
        //console.log(elem.geolocalizacao.split(','))
        //let ocorrenciaMarker = L.marker(elem.geolocalizacao.split(',')).bindPopUp(elem.categoria.nome).addTo(map);
        L.marker(latlng, { alt: elem.categoria.nome, icon: icon })
          .bindPopup(elem.categoria.nome, {})
          .addTo(map);
        // .bindTooltip(elem.categoria.nome, {permanent: true}).addTo(map);
      }
    });
  }
  const provider = new MapBoxProvider({
    params: {
      access_token: apiKey,
    },
  });

  const searchControl = new GeoSearchControl({
    provider: provider,
    searchLabel: "Insira o endereço",
    notFoundMessage: "Não encontrado. Insira na ordem 'Rua, Bairro, Cidade'.",
    style: "bar",
    showMarker: false,
    //keepResult: true
  });

  useMapEvent("click", (e) => {
    if (marker) {
      marker.removeFrom(map);
      marker.setLatLng(e.latlng);
      marker.addTo(map);
    } /*  else {
      map.addLayer(L.marker(e.latlng));
      setMarker(L.marker(e.latlng));
    } */
  });

  useEffect(() => {
    axios.get("http://localhost:8082/api/ocorrencia").then((r) => {
      setOcorrencias(r.data);
    });
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};

const NewMap = () => {
  return (
    <>
      <MapContainer
        center={initialCenter}
        zoom={13}
        style={{ height: "60vh", width: "60vh" }}
      >
        {/* <Map apiKey={import.meta.env.VITE_APP_MAPBOX_GEOSEARCH_API_TOKEN} /> */}
        <Map apiKey={import.meta.env.VITE_APP_GEOAPIFY_API_KEY} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </>
  );
};

export default NewMap;