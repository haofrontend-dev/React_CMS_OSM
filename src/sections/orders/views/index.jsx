import React from 'react';
import {
  Box,
  Typography,
  Breadcrumbs,
  Stack,
  Button,
  Card,
  Container,
  TableContainer,
  Table,
  TableBody,
  TablePagination
} from '@mui/material';
import Iconify from '@/components/common/Iconify';
import OrdersTableToolbar from '../OrdersTableToolbar';
import OrdersTableFilter from '../OrdersTableFilter';
import OrdersTableHead from '../OrdersTableHead';

import { cars } from '@/dumy/listCars';
import { applyFilter, emptyRows, getComparator } from '@/utils';
import OrdersTableRow from '../OrdersTableRow';
import TableEmptyRows from '@/components/common/table/TableEmptyRows';
import TableNoData from '@/components/common/table/TableNoData';
import useAppSelector from '@/hooks/useAppSelector';

const OrdersManagerView = () => {
  const { dataOrders } = useAppSelector(state => state.orders);
  const [order, setOrder] = React.useState('asc');
  const [selected, setSelected] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState('device_id');
  const [filterName, setFilterName] = React.useState('');
  const [isShowFilter, setIsShowFilter] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [page, setPage] = React.useState(0);

  const handleFilterByName = event => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleShowFilter = () => {
    setIsShowFilter(prev => !prev);
  };

  const handleActionFilter = fields => {
    console.log(fields);
  };

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = dataOrders.map(n => n.device_id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  if (dataOrders) {
    const dataFiltered = applyFilter({
      inputData: dataOrders,
      comparator: getComparator(order, orderBy),
      filterName
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
      <Container>
        <Stack
          spacing={2}
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          mb={5}
        >
          <Typography variant='h5'>Danh sách đơn hàng</Typography>
          <Button
            variant='contained'
            color='inherit'
            startIcon={<Iconify icon='eva:plus-fill' />}
          >
            Tạo
          </Button>
        </Stack>
        <Card>
          <OrdersTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onOptionFilter={handleShowFilter}
          />
          {isShowFilter && <OrdersTableFilter onFilter={handleActionFilter} />}

          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <OrdersTableHead
                order={order}
                orderBy={orderBy}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'device_id', label: 'ID' },
                  { id: 'customer_name', label: 'Tên KH' },
                  { id: 'status', label: 'Trạng thái' },
                  { id: 'unit_price', label: 'Đơn giá' },
                  { id: 'total_price', label: 'Tổng tiền' },
                  { id: 'rental_start', label: 'Ngày bắt đầu thuê' },
                  { id: 'rental_end', label: 'Ngày kết thúc' },
                ]}
              />
              <TableBody>
                {Array.isArray(dataOrders) &&
                  dataOrders.length > 0 &&
                  dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      return (
                        <OrdersTableRow
                          key={row?.device_id}
                          device_id={row?.device_id}
                          order_status={row.order_status}
                          unit_price={row.unit_price}
                          total_price={row.total_price}
                          customer_name={row.customer_name}
                          rental_start={row.rental_start}
                          rental_end={row.rental_end}
                          selected={selected.indexOf(row.device_id) !== -1}
                          handleClick={event =>
                            handleClick(event, row.device_id)
                          }
                        />
                      );
                    })}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, dataOrders.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            page={page}
            component='div'
            sx={{
              width: '100%',
              borderTop: theme => `1px solid ${theme.palette.divider}`
            }}
            count={cars.length}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    );
  }
};

export default OrdersManagerView;
