import { Container } from '@mui/material';
import React from 'react';
import { MapContainer, TileLayer, useMap, ZoomControl } from 'react-leaflet';
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

const MapsManagersViews = () => {
  const { dataVehicle } = useAppSelector(state => state.vehicle);

  const [location, setLocation] = React.useState([12.245, 109.1943]);

  if (dataVehicle) {
    return (
      <MapContainer
        center={location}
        zoom={15}
        scrollWheelZoom={true}
        style={{ width: '100%', minHeight: '100vh' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {location.length > 0 && <ResetCenterView location={location} />}
        <ZoomControl position='topleft' />
        <ShowCrimes data={dataVehicle} />
      </MapContainer>
    );
  }

  return (
    <MapContainer
      center={location}
      zoom={15}
      scrollWheelZoom={true}
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
