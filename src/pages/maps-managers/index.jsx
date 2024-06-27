import { getVehicleAll } from '@/features/vehicle/vehicleThunk';
import MapsManagersViews from '@/sections/maps/views';
import React from 'react';
import { useDispatch } from 'react-redux';

const Maps = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getVehicleAll());
    }, 15000);

    // Fetch data immediately without waiting for the first interval
    dispatch(getVehicleAll());

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <React.Fragment>
      <MapsManagersViews />
    </React.Fragment>
  );
};

export default Maps;
