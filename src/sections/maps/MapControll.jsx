import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Drawer, IconButton } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import MapFormFilter from './MapFormFilters';

const MapControll = ({ onActionFillter }) => {
  const [showDirectionsPanel, setShowDirectionPanle] = React.useState(false);

  const handleDirectionsToggle = () => {
    setShowDirectionPanle(pre => !pre);
  };

  return (
    <React.Fragment>
      <Button
        color='primary'
        variant='contained'
        sx={{
          position: 'absolute',
          zIndex: 998,
          top: '10px',
          right: '10px'
        }}
        onClick={handleDirectionsToggle}
      >
        Tìm kiếm
      </Button>

      <Drawer variant='persistent' open={showDirectionsPanel} anchor='right'>
        <Box
          width={400}
          display='flex'
          flexDirection={'column'}
          alignItems='center'
          gap={4}
          p={2}
        >
          <IconButton
            size='medium'
            color='primary'
            onClick={handleDirectionsToggle}
            sx={{
              color: 'text.primary'
            }}
            aria-label='close'
          >
            <CloseOutlined />
          </IconButton>
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
