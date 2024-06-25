import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '@mui/material';

const VehicleTableFilter = ({ onFilter }) => {
  return <Container>Filter Action</Container>;
};

VehicleTableFilter.propTypes = {
  onFilter: PropTypes.func,
}

export default VehicleTableFilter;
