import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

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
export const getAgeOptions = () => {
  return [
    { value: 1, label: 'Dưới 18' },
    { value: 2, label: '18 - 40' },
    { value: 3, label: 'Trên 40' }
  ];
};

export const getGenderOptions = () => {
  return [
    { value: 0, label: 'Nam' },
    { value: 1, label: 'Nữ' },
    { value: 2, label: 'Khác' }
  ];
};

const OrdersTableFilter = ({ onFilter }) => {
  const [selectFilter, setSelectedFilter] = React.useState({
    status: [],
    age: null,
    gender: null
  });

  const options = React.useMemo(() => getVehicleStatusOptions(), []);
  const optionsAge = React.useMemo(() => getAgeOptions(), []);
  const optionsGender = React.useMemo(() => getGenderOptions(), []);

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
      <Grid item xs={12} sm={3}>
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

      <Grid item xs={12} sm={12} display='flex' justifyContent='center'>
        <Button
          variant='contained'
          color='primary'
          onClick={handleActionFilter}
        >
          Tìm kiếm
        </Button>
      </Grid>
    </Grid>
  );
};

OrdersTableFilter.propTypes = {
  onFilter: PropTypes.func
};

export default OrdersTableFilter;
