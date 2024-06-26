import { getVehicleAll } from '@/features/vehicle/vehicleThunk';
import MapsManagersViews from '@/sections/maps/views';
import React from 'react';
import { useDispatch } from 'react-redux';

const Maps = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getVehicleAll());
  }, []);

  return (
    <React.Fragment>
      <MapsManagersViews />
    </React.Fragment>
  );
};

export default Maps;
