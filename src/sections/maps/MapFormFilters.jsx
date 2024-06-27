import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select
} from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const getVehicleStatusOptions = () => {
  return [
    { value: 1, label: 'Free' },
    { value: 2, label: 'Đã có khách' },
    { value: 3, label: 'Hết pin' },
    { value: 4, label: 'Hỏng' }
  ];
};

export const getVehicleTypeBatteryOptions = () => {
  return [
    { value: 80, label: '80% or more' },
    { value: 20, label: '20% to 79%' },
    { value: 19, label: '0% to 19%' }
  ];
};

export const getVehicleTypeOptions = () => {
  return [
    { value: 0, label: 'VF e34' },
    { value: 1, label: 'Tesla Model S' },
    { value: 2, label: 'Kia Soul EV' },
    { value: 3, label: 'MG ZS EV' },
    { value: 4, label: 'Volkswagen ID.3' },
    { value: 5, label: 'Hyundai Kona Electric' },
    { value: 6, label: 'Honda E' },
    { value: 7, label: 'Nissan Leaf' },
    { value: 8, label: 'Peugeot E-208' },
    { value: 9, label: 'Polestar 2' },
    { value: 10, label: 'Tesla Model 3' }
  ];
};

const MapFormFilter = ({ onFilter }) => {
  const [selectFilter, setSelectedFilter] = React.useState({
    status: [],
    battery: [],
    vehicleType: []
  });

  const options = React.useMemo(() => getVehicleStatusOptions(), []);
  const optionsBattery = React.useMemo(
    () => getVehicleTypeBatteryOptions(),
    []
  );
  const optionVehicleType = React.useMemo(() => getVehicleTypeOptions(), []);

  const handleChange = event => {
    const {
      target: { value, name }
    } = event;

    setSelectedFilter(prev => ({
      ...prev,
      [name]: typeof value === 'string' ? value.split(',') : value
    }));
  };

  const handleActionFilter = () => {
    onFilter(selectFilter);
  };

  React.useEffect(() => {
    console.log(selectFilter);
  }, [selectFilter]);
  return (
    <Grid
      container
      spacing={2}
      mb={2}
      sx={{
        p: theme => theme.spacing(0, 1, 0, 3)
      }}
    >
      <Grid item xs={12} sm={12}>
        <FormControl sx={{ m: 1, width: '100%' }}>
          <InputLabel
            id='demo-multiple-checkbox-label'
            sx={{ background: '#fff', padding: '0 4px' }}
          >
            Trạng thái xe
          </InputLabel>
          <Select
            labelId='demo-multiple-checkbox-label'
            id='demo-multiple-checkbox'
            multiple
            name='status'
            value={selectFilter.status}
            onChange={handleChange}
            input={<OutlinedInput label='Tag' />}
            renderValue={selected => selected.map(tag => tag.label).join(', ')}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  width: 250
                }
              }
            }}
          >
            {options.map(status => (
              <MenuItem key={status.value} value={status}>
                <Checkbox checked={selectFilter.status.indexOf(status) > -1} />
                <ListItemText primary={status.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={12}>
        <FormControl sx={{ m: 1, width: '100%' }}>
          <InputLabel
            id='demo-multiple-checkbox-label'
            sx={{ background: '#fff', padding: '0 4px' }}
          >
            Pin
          </InputLabel>
          <Select
            labelId='demo-multiple-checkbox-label'
            id='demo-multiple-checkbox'
            multiple
            name='battery'
            value={selectFilter.battery}
            onChange={handleChange}
            input={<OutlinedInput label='Tag' />}
            renderValue={selected => selected.map(tag => tag.label).join(', ')}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  width: 200
                }
              }
            }}
          >
            {optionsBattery.map(status => (
              <MenuItem key={status.value} value={status} sx={{ p: 0 }}>
                <Checkbox checked={selectFilter.battery.indexOf(status) > -1} />
                <ListItemText primary={status.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={12}>
        <FormControl sx={{ m: 1, width: '100%' }}>
          <InputLabel
            id='demo-multiple-checkbox-label'
            sx={{ background: '#fff', padding: '0 4px' }}
          >
            Loại xe
          </InputLabel>
          <Select
            labelId='demo-multiple-checkbox-label'
            id='demo-multiple-checkbox'
            multiple
            name='vehicleType'
            value={selectFilter.vehicleType}
            onChange={handleChange}
            input={<OutlinedInput label='Tag' />}
            renderValue={selected => selected.map(tag => tag.label).join(', ')}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                  width: 250
                }
              }
            }}
          >
            {optionVehicleType.map(status => (
              <MenuItem key={status.value} value={status}>
                <Checkbox
                  checked={selectFilter.vehicleType.indexOf(status) > -1}
                />
                <ListItemText primary={status.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={12} display='flex' justifyContent='center' gap={4}>
        <Button
          variant='contained'
          color='primary'
          onClick={handleActionFilter}
        >
          Tìm kiếm
        </Button>

        <Button
          variant='contained'
          color='success'
          onClick={handleActionFilter}
        >
          Trở lại
        </Button>
      </Grid>
    </Grid>
  );
};

MapFormFilter.propTypes = {
  onFilter: PropTypes.func
};

export default MapFormFilter;
