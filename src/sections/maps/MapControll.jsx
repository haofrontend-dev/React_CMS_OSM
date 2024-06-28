import { Box, Button, Drawer } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import MapFormFilter from './MapFormFilters';

const MapControll = ({ onActionFillter }) => {
  const [showDirectionsPanel, setShowDirectionPanle] = React.useState(false);

  const handleDirectionsToggle = () => {
    setShowDirectionPanle(pre => !pre);
  };

  return (
    <React.Fragment>
      <Box textAlign={'right'}>
        <Button
          color='primary'
          variant='contained'
          onClick={handleDirectionsToggle}
          sx={{
            marginBottom: '24px',
            marginLeft: 'auto'
          }}
        >
          Tìm kiếm
        </Button>
      </Box>

      <Drawer variant='persistent' open={showDirectionsPanel} anchor='right'>
        <Box
          width={400}
          display='flex'
          flexDirection={'column'}
          alignItems='center'
          gap={4}
          p={2}
        >
          <Button
            size='medium'
            color='error'
            variant='contained'
            onClick={handleDirectionsToggle}
            sx={{
              color: '#fff'
            }}
          >
            Đóng
          </Button>
          <MapFormFilter />
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

MapControll.propTypes = {
  onActionFillter: PropTypes.func
};

export default MapControll;
