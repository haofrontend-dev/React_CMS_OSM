import React from 'react';
import {
  MapContainer,
  TileLayer,
  useMap,
  ZoomControl,
  useMapEvents
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import ShowCrimes from '../MapCrimes';
import useAppSelector from '@/hooks/useAppSelector';

const ResetCenterView = props => {
  // eslint-disable-next-line react/prop-types
  const { location } = props;
  const map = useMap();

  React.useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (location.length > 0) {
      map.setView(L.latLng(location[0], location[1]), map.getZoom(), {
        animate: true
      });
    }
  }, [location, map]);

  return null;
};

const EnforceBounds = ({ maxBounds }) => {
  const map = useMapEvents({
    moveend() {
      if (!maxBounds.contains(map.getCenter())) {
        map.panInsideBounds(maxBounds, { animate: true });
      }
    },
    zoomend() {
      if (!maxBounds.contains(map.getCenter())) {
        map.panInsideBounds(maxBounds, { animate: true });
      }
    }
  });
  return null;
};

const MapsManagersViews = () => {
  const { dataVehicle } = useAppSelector(state => state.vehicle);

  const [location, setLocation] = React.useState([12.245, 109.1943]);
  const bounds = L.latLngBounds(
    L.latLng(12.2, 109.1), // Southwestern coordinate of Nha Trang
    L.latLng(12.3, 109.3) // Northeastern coordinate of Nha Trang
  );
  const maxBounds = bounds.pad(0.1);

  if (dataVehicle) {
    return (
      <MapContainer
        center={location}
        zoom={15}
        scrollWheelZoom={true}
        maxBounds={maxBounds}
        style={{ width: '100%', minHeight: '100vh' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {location.length > 0 && <ResetCenterView location={location} />}
        <ZoomControl position='topleft' />
        <EnforceBounds maxBounds={maxBounds} />
        {dataVehicle && <ShowCrimes data={dataVehicle} />}
      </MapContainer>
    );
  }

  return (
    <MapContainer
      center={location}
      zoom={15}
      scrollWheelZoom={true}
      maxBounds={maxBounds}
      style={{ width: '100%', minHeight: '100vh' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {location.length > 0 && <ResetCenterView location={location} />}
    </MapContainer>
  );
};

export default MapsManagersViews;
