import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  IconButton,
  MenuItem,
  Popover,
  Stack,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';
import Iconify from '@/components/common/Iconify';
import Label from '@/components/common/label';

const VehicleTableRow = ({
  device_id,
  status,
  battery_status,
  customer_name,
  unit_price,
  total_price,
  rental_duration,
  selected,
  handleClick
}) => {
  const [open, setOpen] = React.useState(null);

  const handleOpenMenu = event => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const generateTextStatus = status => {
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

  const generateClassStatus = status => {
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

  return (
    <>
      <TableRow hover tabIndex={-1} role='checkbox' selected={selected}>
        <TableCell padding='checkbox'>
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component='th' scope='row' padding='none'>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Typography variant='subtitle2' noWrap>
              {device_id}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Label color={generateClassStatus(status)}>
            {generateTextStatus(status)}
          </Label>
        </TableCell>

        <TableCell>{battery_status || ''}%</TableCell>

        <TableCell>{customer_name || ''}</TableCell>

        <TableCell>
          {Intl.NumberFormat('vi', {
            style: 'currency',
            currency: 'VND'
          }).format(unit_price)}
        </TableCell>

        <TableCell>
          {total_price
            ? Intl.NumberFormat('vi', {
                style: 'currency',
                currency: 'VND'
              }).format(total_price)
            : ''}
        </TableCell>

        <TableCell>{rental_duration || ''}</TableCell>

        <TableCell align='right'>
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon='eva:more-vertical-fill' />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 }
        }}
      >
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon='eva:edit-fill' sx={{ mr: 2 }} />
          Xem chi tiết
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'success.main' }}>
          <Iconify icon='tdesign:lock-off' sx={{ mr: 2 }} />
          Mở khóa
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon='mingcute:lock-line' sx={{ mr: 2 }} />
          Khóa xe
        </MenuItem>
      </Popover>
    </>
  );
};

VehicleTableRow.propTypes = {
  selected: PropTypes.any,
  device_id: PropTypes.any,
  handleClick: PropTypes.func,
  status: PropTypes.any,
  battery_status: PropTypes.any,
  role: PropTypes.any,
  unit_price: PropTypes.any,
  total_price: PropTypes.any,
  rental_duration: PropTypes.any
};

export default VehicleTableRow;
