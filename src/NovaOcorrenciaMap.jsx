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
import dangerMarkerIcon from "/danger-icon.png";
import axios from "axios";

const initialCenter = [-8.063153, -34.87114];

const Map = ({ setReportMarker }) => {
  const myAPIKey = import.meta.env.VITE_APP_GEOAPIFY_API_KEY; // Get an API Key on https://myprojects.geoapify.com
  const map = useMap();
  const [ocorrencias, setOcorrencias] = useState([]);
  //const [marker, setMarker] = useState(L.marker(initialCenter));
  let marker = null;

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

      // Search location marker
      //marker = L.marker([address.lat, address.lon]).addTo(map);

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

  // Mark on click and retrieve its latlng
  const [mrker, setMrker] = useState(L.marker(initialCenter));
  useMapEvent("click", (e) => {
    if (mrker) {
      mrker.removeFrom(map);
      mrker.setLatLng(e.latlng);
      mrker.addTo(map);
      // console.log(mrker.getLatLng())
      setReportMarker(mrker); // Sharing state with parent
    } /*  else {
      map.addLayer(L.marker(e.latlng));
      setMarker(L.marker(e.latlng));
    } */
  });

  useEffect(() => {
    axios.get("/api/ocorrencia").then((r) => {
      setOcorrencias(r.data);
    });
    map.addControl(addressSearchControl);
    return () => map.removeControl(addressSearchControl);
  }, []);

  return null;
};

const NovaOcorrenciaMap = ({ setReportMarker }) => {
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

export default NovaOcorrenciaMap;
