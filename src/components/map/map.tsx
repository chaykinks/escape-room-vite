import {Icon} from 'leaflet';
import {MapContainer, Marker, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  center: [number, number];
  markerPosition: [number, number];
};

const defaultIcon = new Icon({
  iconUrl: '/img/svg/pin-default.svg',
  iconSize: [23, 42],
  iconAnchor: [11, 42],
});

function Map({center, markerPosition}: MapProps): JSX.Element {
  return (
    <MapContainer
      center={center}
      zoom={16}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution=""
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={markerPosition} icon={defaultIcon} />
    </MapContainer>
  );
}

export default Map;
