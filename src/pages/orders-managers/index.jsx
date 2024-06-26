import { getOrdersAll } from '@/features/orders/ordersThunk';
import useAppSelector from '@/hooks/useAppSelector';
import OrdersManagerView from '@/sections/orders/views';
import React from 'react';
import { useDispatch } from 'react-redux';

const Orders = () => {
  const { isLoading } = useAppSelector(state => state.orders);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getOrdersAll());
  }, []);
  return (
    <React.Fragment>{isLoading ? <></> : <OrdersManagerView />}</React.Fragment>
  );
};

export default Orders;
