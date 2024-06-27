import L from 'leaflet';
import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';

const POINTS_OF_INTEREST = {
  POS: 10, //'PoS', // Điểm bán/sạc
  PARK: 20, //'Park', // Điểm đỗ xe
  REPAIR_STATION: 30, //'Repair Station', // Trạm sửa chữa
  WAREHOUSE: 40 // 'Warehouse', // Kho
};

const getIcon = type => {
  switch (type) {
    case POINTS_OF_INTEREST.POS:
      return './assets/icons/pos.png';
    case POINTS_OF_INTEREST.PARK:
      return './assets/icons/park.png';
    case POINTS_OF_INTEREST.REPAIR_STATION:
      return './assets/icons/repair-station.png';
    case POINTS_OF_INTEREST.WAREHOUSE:
      return './assets/icons/warehouse.png';
    default:
      return './assets/icons/warehouse.png';
  }
};

const getNamePoint = type => {
  switch (type) {
    case POINTS_OF_INTEREST.POS:
      return 'Điểm bán/sạc';
    case POINTS_OF_INTEREST.PARK:
      return 'Điểm đên xe';
    case POINTS_OF_INTEREST.REPAIR_STATION:
      return 'Trạm sửa chữa';
    case POINTS_OF_INTEREST.WAREHOUSE:
      return 'Kho';
    default:
      return 'Kho';
  }
};

const fetchIcon = count => {
  return L.icon({
    iconUrl: getIcon(count),
    iconSize: [40, 40]
  });
};

const MapPointMaker = ({ dataPoints }) => {
  console.log(dataPoints);
  return (
    <React.Fragment>
      {Array.isArray(dataPoints) &&
        dataPoints.map((dataPoint, index) => (
          <Marker
            key={index}
            position={[dataPoint.latitude, dataPoint.longitude]}
            icon={fetchIcon(dataPoint.point_type)}
          >
            <Tooltip direction='bottom' offset={[0, 20]} opacity={1} permanent>
              {getNamePoint(dataPoint.point_type)}
            </Tooltip>
          </Marker>
        ))}
    </React.Fragment>
  );
};

export default MapPointMaker;
