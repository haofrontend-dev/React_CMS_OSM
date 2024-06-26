import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
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

const OrdersTableRow = ({
  email,
  avatar,
  customer_name,
  registration_date,
  phone_number,
  selected,
  address,
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
          <Stack direction='row' alignItems='center' justifyContent='center' spacing={2}>
            <Avatar alt={customer_name} src={avatar} />
          </Stack>
        </TableCell>

        <TableCell>{customer_name || ''}</TableCell>

        <TableCell component='th' scope='row' padding='none'>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Typography variant='subtitle2' noWrap>
              {email}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{phone_number || ''}</TableCell>

        <TableCell>{address || ''}</TableCell>

        <TableCell>{registration_date || ''}</TableCell>

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

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon='material-symbols:close' sx={{ mr: 2 }} />
          Xóa
        </MenuItem>
      </Popover>
    </>
  );
};

OrdersTableRow.propTypes = {
  selected: PropTypes.any,
  avatar: PropTypes.any,
  handleClick: PropTypes.func,
  email: PropTypes.any,
  role: PropTypes.any,
  address: PropTypes.any,
  total_price: PropTypes.any,
  registration_date: PropTypes.any,
  phone_number: PropTypes.any,
  customer_name: PropTypes.any
};

export default OrdersTableRow;
