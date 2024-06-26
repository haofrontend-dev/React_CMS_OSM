import { getVehicleAll } from '@/features/vehicle/vehicleThunk';
import useAppSelector from '@/hooks/useAppSelector';
import VehicleManagerView from '@/sections/vehicle/views';
import React from 'react';
import { useDispatch } from 'react-redux';

const Vehicle = () => {

  const { isLoading, dataVehicle } = useAppSelector(state => state.vehicle);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getVehicleAll());
  }, [])

  return (
    <React.Fragment>
      {isLoading ? <div></div> : <VehicleManagerView />}
    </React.Fragment>
  );
}

export default Vehicle;
