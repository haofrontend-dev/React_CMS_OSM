import PropTypes from 'prop-types';
import React from 'react';
import { Marker, useMap } from 'react-leaflet';
import useSupercluster from 'use-supercluster';
import L from 'leaflet';

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

const icon = L.icon({
  iconUrl: './assets/icons/motorcycle.svg',
  iconSize: [38, 38]
});

const ShowCrimes = ({ data }) => {
  const [bounds, setBounds] = React.useState();
  const [zoom, setZoom] = React.useState(12);
  const map = useMap();

  console.log(data);

  const updateMap = () => {
    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat
    ]);
    setZoom(map.getZoom());
  };

  const onMove = () => {
    updateMap();
  };

  React.useEffect(() => {
    updateMap();
  }, []);

  React.useEffect(() => {
    map.on('move', onMove);
    return () => {
      map.off('move', onMove);
    };
  }, [map]);

  const points =
    Array.isArray(data) &&
    data.map((crime, index) => ({
      type: 'Feature',
      properties: {
        cluster: false,
        crimeId: index + 1,
        category: `category-${index}`
      },
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(crime.longitude), parseFloat(crime.latitude)]
      }
    }));

  const { clusters, supercluster } = useSupercluster({
    points: points,
    bounds: bounds,
    zoom: zoom,
    options: { radius: 90, maxZoom: 17 }
  });

  return (
    <React.Fragment>
      {clusters.map(cluster => {
        const [longitude, latitude] = cluster.geometry.coordinates;

        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;

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
            icon={icon}
          />
        );
      })}
    </React.Fragment>
  );
};

ShowCrimes.propTypes = {
  data: PropTypes.array.isRequired
};

export default ShowCrimes;
