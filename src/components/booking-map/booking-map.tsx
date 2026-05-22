import {Icon} from 'leaflet';
import {MapContainer, Marker, TileLayer} from 'react-leaflet';
import {BookingPlace} from '../../types/booking';

type BookingMapProps = {
  places: BookingPlace[];
  selectedPlaceId: string;
  onPlaceSelect: (placeId: string) => void;
};

const defaultIcon = new Icon({
  iconUrl: '/img/svg/pin-default.svg',
  iconSize: [23, 42],
  iconAnchor: [11, 42],
});

const activeIcon = new Icon({
  iconUrl: '/img/svg/pin-active.svg',
  iconSize: [23, 42],
  iconAnchor: [11, 42],
});

function BookingMap({
  places,
  selectedPlaceId,
  onPlaceSelect,
}: BookingMapProps): JSX.Element {
  const firstPlace = places[0];

  return (
    <MapContainer
      center={firstPlace.location.coords}
      zoom={10}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution=""
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {places.map((place) => (
        <Marker
          key={place.id}
          position={place.location.coords}
          icon={place.id === selectedPlaceId ? activeIcon : defaultIcon}
          eventHandlers={{
            click: () => onPlaceSelect(place.id),
          }}
        />
      ))}
    </MapContainer>
  );
}

export default BookingMap;
