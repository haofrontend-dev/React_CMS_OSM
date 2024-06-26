export const generateNameVehicle = vehicle_type => {
  const electricVehicleTypes = [
    'VF e34',
    'Tesla Model S',
    'Kia Soul EV',
    'MG ZS EV',
    'Volkswagen ID.3',
    'Hyundai Kona Electric',
    'Honda E',
    'Nissan Leaf',
    'Peugeot E-208',
    'Polestar 2',
    'Tesla Model 3'
  ];

  return (
    electricVehicleTypes[vehicle_type] || `Unknown Vehicle ${vehicle_type}`
  );
};

export const generatePathImage = vehicle_type => {
  const pathImages = [
    'https://res.cloudinary.com/dpt5wvddv/image/upload/v1719399262/exl32c0daaeylet09k8c.jpg',
    'https://res.cloudinary.com/dpt5wvddv/image/upload/v1719399263/wtphirmkauv1tpmyxh8t.png',
    'https://res.cloudinary.com/dpt5wvddv/image/upload/v1719399473/owyd8o7pgbd0w2zg5ghs.jpg',
    'https://res.cloudinary.com/dpt5wvddv/image/upload/v1719399566/vtlw50hftm9mn0sc5xee.jpg',
    'https://res.cloudinary.com/dpt5wvddv/image/upload/v1719399600/xpttbaecqlczgqkcqb3b.webp',
    'https://res.cloudinary.com/dpt5wvddv/image/upload/v1719399681/jpmbyqkqncx22x0wxv4r.png',
    'https://res.cloudinary.com/dpt5wvddv/image/upload/v1719399721/uxc5xnji4v1jibqykvlx.jpg',
    'https://res.cloudinary.com/dpt5wvddv/image/upload/v1719399789/aef9n1vg9843kdzr9nyu.jpg',
    'https://res.cloudinary.com/dpt5wvddv/image/upload/v1719407434/ph28ctpsx020m20wu06m.webp',
    'https://res.cloudinary.com/dpt5wvddv/image/upload/v1719407506/y9ondyjatc58etqt5dtg.png'
  ];

  return pathImages[vehicle_type] || '';
};

export const generateTextStatus = status => {
  switch (status) {
    case 1:
      return 'Chờ nhận xe';
    case 2:
      return 'Đã có khách';
    case 3:
      return 'Hoàn thành';
    case 4:
      return 'Hủy đơn';
    default:
      return 'Chờ nhận xe';
  }
};

export const generateClassStatus = status => {
  switch (status) {
    case 1:
      return 'success';
    case 2:
      return 'primary';
    case 3:
      return 'warning';
    case 4:
      return 'error';
    default:
      return 'success';
  }
};

export const generateTextStatusVehicle = status => {
  switch (status) {
    case 1:
      return 'Free';
    case 2:
      return 'Đã có khách';
    case 3:
      return 'Hết pin';
    case 4:
      return 'Hỏng';
    default:
      return 'Free';
  }
};

export const generateClassStatusBattery = status => {
  if (status >= 80) {
    return 'success';
  } else if (status > 20) {
    return 'primary';
  } else {
    return 'error';
  }
};
