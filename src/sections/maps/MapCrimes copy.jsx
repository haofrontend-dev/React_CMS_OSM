import { Box, Button, Card, Divider, Stack, Typography } from '@mui/material';
import L from 'leaflet';
import PropTypes from 'prop-types';
import React from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import useSupercluster from 'use-supercluster';

import Label from '@/components/common/label';
import {
  generateClassStatus,
  generateClassStatusBattery,
  generateNameVehicle,
  generatePathImage,
  generateTextStatusVehicle
} from '@/utils';
const icons = {};

const fetchIcon = count => {
  if (!icons[count]) {
    icons[count] = L.divIcon({
      html: `<div class="cluster-maker style="...">
                ${count}
            </div>`
    });
  }

  return icons[count];
};

const getIcon = type => {
  switch (type) {
    case 1:
      return './assets/icons/location_success.svg';
    case 2:
      return './assets/icons/location-error.svg';
    case 3:
      return './assets/icons/location-primary.svg';
    case 4:
      return './assets/icons/location-warning.svg';
    default:
      return './assets/icons/location-warning.svg';
  }
};

const fetchIconStatus = (status, battery) => {
  if (status && battery) {
    return L.divIcon({
      html: `<div class="icon-maker">
        <img src="${getIcon(status)}" alt="car" class="icon-maker__location" />
        <img src="./assets/icons/car.svg" alt="car" class="icon-maker__car" />
        <div class="icon-maker__battery ${generateClassStatusBattery(battery)}">
          <span>${battery}%</span>
        </div>
      </div>`,
      iconSize: [20, 20]
    });
  }

  return L.icon({
    iconUrl: './assets/icons/car.svg',
    iconSize: [20, 20]
  });
};

const ShowCrimes = ({ data }) => {
  const [bounds, setBounds] = React.useState();
  const [zoom, setZoom] = React.useState(12);
  const map = useMap();

  const updateBounds = React.useCallback(() => {
    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat
    ]);
  }, [map]);

  const updateZoom = React.useCallback(() => {
    setZoom(map.getZoom());
  }, [map]);

  React.useEffect(() => {
    updateBounds();
    updateZoom();
  }, [updateBounds, updateZoom]);

  React.useEffect(() => {
    map.on('zoomend', () => {
      updateBounds();
      updateZoom();
    });
    return () => {
      map.off('zoomend', updateBounds);
      map.off('zoomend', updateZoom);
    };
  }, [map, updateBounds, updateZoom]);

  // Fit map to bounds containing all points initially
  React.useEffect(() => {
    if (data.length > 0) {
      const latLngBounds = L.latLngBounds(
        data.map(crime => [crime.latitude, crime.longitude])
      );
      map.fitBounds(latLngBounds);
    }
  }, [data, map]);

  const points = React.useMemo(
    () =>
      Array.isArray(data) &&
      data.map((crime, index) => ({
        type: 'Feature',
        properties: {
          cluster: false,
          crimeId: index + 1,
          category: `category-${index}`,
          device_id: crime?.device_id,
          vehicle_type: crime?.vehicle_type,
          battery_status: crime?.battery_status,
          customer_name: crime?.customer_name,
          status: crime?.status,
          unit_price: crime?.unit_price
        },
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(crime.longitude), parseFloat(crime.latitude)]
        }
      })),
    [data]
  );

  const { clusters, supercluster } = useSupercluster({
    points: points,
    bounds: bounds,
    zoom: zoom,
    options: { radius: 90, maxZoom: 17 }
  });

  console.log(clusters);

  return (
    <React.Fragment>
      {clusters.map(cluster => {
        const [longitude, latitude] = cluster.geometry.coordinates;

        const {
          cluster: isCluster,
          point_count: pointCount,
          device_id,
          status,
          vehicle_type,
          battery_status
        } = cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              icon={fetchIcon(
                pointCount,
                10 + (pointCount / points.length) * 40
              )}
              eventHandlers={{
                click: () => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    22
                  );
                  map.setView([latitude, longitude], expansionZoom, {
                    animate: true
                  });
                }
              }}
            ></Marker>
          );
        }

        // we have a single point (crime) to render
        return (
          <Marker
            key={`crime-${cluster.properties.crimeId}`}
            position={[latitude, longitude]}
            icon={fetchIconStatus(status, battery_status)}
          >
            <Popup>
              <Card variant='outlined' sx={{ maxWidth: 360 }}>
                <Box sx={{ p: 2 }}>
                  <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    gap={4}
                  >
                    <Typography
                      gutterBottom
                      variant='h5'
                      component='div'
                      sx={{
                        margin: 0
                      }}
                    >
                      {device_id}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant='h6'
                      component='div'
                      sx={{
                        margin: 0
                      }}
                    >
                      <Label color={generateClassStatus(status)}>
                        {generateTextStatusVehicle(status)}
                      </Label>
                    </Typography>
                  </Stack>
                  <Stack direction='row' alignItems='center' gap={2} mt={1}>
                    <Typography
                      color='text.secondary'
                      variant='body2'
                      component='span'
                      sx={{ margin: 0 }}
                    >
                      Pin:
                    </Typography>
                    <Label color={generateClassStatusBattery(battery_status)}>
                      {battery_status}%
                    </Label>
                  </Stack>
                  <Typography
                    color='text.secondary'
                    variant='body2'
                    component='div'
                    mt={1}
                  >
                    {generateNameVehicle(vehicle_type)}
                  </Typography>
                </Box>

                <Box sx={{ p: 2 }}>
                  <img src={generatePathImage(vehicle_type)} alt={device_id} />
                </Box>
                <Divider />
                <Box sx={{ p: 1 }}>
                  <Stack direction='row' spacing={1}>
                    <Button variant='contained' color='primary' size='small'>
                      Chi tiết
                    </Button>
                    {battery_status > 10 ? (
                      <Button variant='contained' color='success' size='small'>
                        Mở khóa
                      </Button>
                    ) : (
                      <Button variant='contained' color='error' size='small'>
                        Khóa
                      </Button>
                    )}
                    {status === 2 && (
                      <Button variant='contained' color='warning' size='small'>
                        Lộ trình
                      </Button>
                    )}
                  </Stack>
                </Box>
              </Card>
            </Popup>
          </Marker>
        );
      })}
    </React.Fragment>
  );
};

ShowCrimes.propTypes = {
  data: PropTypes.array.isRequired
};

export default React.memo(ShowCrimes);
