import {
  GeoSearchControl,
  MapBoxProvider,
  GoogleProvider,
  AlgoliaProvider,
} from "leaflet-geosearch";
import {
  MapContainer,
  useMap,
  TileLayer,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import L, { marker } from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
import retinaIcon from "leaflet/dist/images/marker-icon-2x.png";
import icnUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({
  iconRetinaUrl: retinaIcon,
  iconUrl: icnUrl,
  shadowUrl: shadowUrl,
});
import { Geocoder } from "leaflet-control-geocoder";

const SearchField = ({ apiKey }) => {
  const initialCenter = [-8.0456, -34.8981];
  const map = useMap();
  const [marker, setMarker] = useState(L.marker(initialCenter));
  const [markerQ, setMarkerQ] = useState();
  const [state, setState] = useState("");

  map.setView(initialCenter, 10);

  /* const params = {
    apiKey: "__YOUR_GOOGLE_KEY__",
    language: "nl", // render results in Dutch
    region: "nl", // prioritize matches within The Netherlands
  };
  const provider = new GoogleProvider({ ...params }); */

  const provider = new MapBoxProvider({
    params: {
      access_token: apiKey,
    },
  });
  /* 
  const provider = new AlgoliaProvider({params}); */

  const searchControl = new GeoSearchControl({
    provider: provider,
    searchLabel:
      "Recomendamos buscar seguindo a ordem: rua, bairro, cidade...'",
    notFoundMessage:
      "Não encontrado. Tente seguindo a ordem: rua, bairro, cidade.",
    style: "bar",

    //keepResult: true
  });

  // Bug: Marcador inicial não é arrastável
  // fixar ponto flutuante em 7 antes de fazer queries
  //console.log("before drag: ", marker.getLatLng());

  map.on("click", (e) => {
    if (marker) {
      marker.removeFrom(map);
    }

    let mrk = L.marker(e.latlng, { draggable: true, autoPan: true }).on(
      "dragend",
      (e) => {
        /* console.log("dragend: ", e.target._latlng) */
        //dragendlatlng = e.target._latlng;
        mrk.setLatLng(e.target._latlng);
        //setMarker(mrk);
        //console.log("dragend: ", dragendlatlng)
      }
    );
    /* console.log("dragend: ", dragendlatlng)  */
    setMarker(mrk);
  });
  //console.log("after drag: ", marker.getLatLng())
  marker.addTo(map);
  map.setView(marker.getLatLng(), 20);

  // Geocoder
  //let geocoder = new Geocoder({ defaultMarkGeocode: false })
  //  .on('markgeocode', function (e) {
  //    let marker = L.marker(e.geocode.center).addTo(map);
  //    map.fitBounds(marker.getBounds());
  //  }).addTo(map);

  useEffect(() => {
    map.addControl(searchControl);
    return () => map.removeControl(searchControl);
  }, []);

  return null;
};

const MyMap = () => {
  return (
    <>
      <MapContainer style={{ height: "60vh", width: "60vh" }}>
        {/* {showSearch && <SearchField apiKey={import.meta.env.VITE_APP_MAPBOX_GEOSEARCH_API_TOKEN} />} */}

        {/* <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          //style={{minHeight:"50vh", display:"block", margin:"15px 0px 15px 10px"}}
        > */}
        <SearchField
          apiKey={import.meta.env.VITE_APP_MAPBOX_GEOSEARCH_API_TOKEN}
          /* apiKey={ import.meta.env.VITE_APP_ALGOLIA_API_KEY } */
        />
        {/* </form> */}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </>
  );
};

export default MyMap;
