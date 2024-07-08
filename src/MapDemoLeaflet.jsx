import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import "leaflet/dist/leaflet.css";


const boundsCenter = [-8.0456, -34.8981]; // Centraliza inicialmente em Recife - geo:-8.0456,-34.8981
// Pendente - Limitar mapa às coordenadas dentro da região

export default function MapDemoLeaftlet() {
  // inicializar com os marcadores da listagem de todas as ocorrências
  const initialMarkers = [
    /* { lat: -8.0456, lng: -34.8981 } */
    { lat: "-8.1760394", lng: "-34.92846" },
  ];
  const [markers, setMarkers] = useState(initialMarkers);
  const [ocorrenciaMarker, setOcorrenciaMarker] = useState();

  function LocationMarkers() {
    const map = useMapEvents({
      click(e) {
        // setting a multiple markers for each click
        /* markers.push(e.latlng);
        setMarkers((prevValue) => [...prevValue, e.latlng]); */

        // setting a single marker for all clicks
        // try useRef and keep updating it after each click, also saving the latlng data somewhere
        //console.log(e.latlng)
        setOcorrenciaMarker(() => e.latlng);
      },
    });

    return (
      <>
        {markers.map((marker) => (
          <Marker
            position={marker}
            key={marker.lat + marker.lng} /* key={ocorrencia.id} */
          >
            <Popup className="text-center">
              <h6>
                <strong>Tipo de Ocorrência</strong>
              </h6>
              <p>dados 1</p>
              <p>dados 2</p>
            </Popup>
          </Marker>
          
        ))}
        {/* <Marker position={ocorrenciaMarker} key={markers.length + 1}>
          <Popup className="text-center">
            <h6>
              <strong>Nova Ocorrência</strong>
            </h6>
            <p>dados 1</p>
            <p>dados 2</p>
          </Popup>
        </Marker> */}
      </>
    );
  }

  return (
    <MapContainer
      center={boundsCenter}
      zoom={10}
      style={{ height: "60vh", width: "60vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarkers />
      {console.log(ocorrenciaMarker)}
      <Marker position={[0,0]} key={markers.length + 1}>
          <Popup className="text-center">
            <h6>
              <strong>Nova Ocorrência</strong>
            </h6>
            <p>dados 1</p>
            <p>dados 2</p>
          </Popup>
        </Marker>
    </MapContainer>
  );
}
