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

const OrdersTableRow = ({
  device_id,
  order_status,
  customer_name,
  unit_price,
  total_price,
  rental_start,
  rental_end,
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
          <Stack direction='row' alignItems='center' spacing={2}>
            <Typography variant='subtitle2' noWrap>
              {device_id}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{customer_name || ''}</TableCell>
        <TableCell>
          <Label color={generateClassStatus(order_status)}>
            {generateTextStatus(order_status)}
          </Label>
        </TableCell>

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

        <TableCell>{rental_start || ''}</TableCell>

        <TableCell>{rental_end || ''}</TableCell>

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
          <Iconify icon='material-symbols:order-approve' sx={{ mr: 2 }} />
          Kết thúc đơn
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon='material-symbols:close' sx={{ mr: 2 }} />
          Hủy đơn
        </MenuItem>
      </Popover>
    </>
  );
};

OrdersTableRow.propTypes = {
  selected: PropTypes.any,
  device_id: PropTypes.any,
  handleClick: PropTypes.func,
  order_status: PropTypes.any,
  role: PropTypes.any,
  unit_price: PropTypes.any,
  total_price: PropTypes.any,
  rental_start: PropTypes.any,
  rental_end: PropTypes.any
};

export default OrdersTableRow;
