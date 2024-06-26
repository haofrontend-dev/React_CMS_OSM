import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@mui/material';

const OrdersTableFilter = ({ onFilter }) => {
  return <Container>Filter Action</Container>;
};

OrdersTableFilter.propTypes = {
  onFilter: PropTypes.func,
}

export default OrdersTableFilter;
