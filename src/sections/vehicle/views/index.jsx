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
import useBreadcrumbs from '@/hooks/useBreadcrumbs';
import VehicleTableToolbar from '../VehicleTableToolbar';
import VehicleTableFilter from '../VehicleTableFilter';
import VehicleTableHead from '../VehicleTableHead';

import { cars } from '@/dumy/listCars';
import { applyFilter, emptyRows, getComparator } from '@/utils';
import VehicleTableRow from '../VehicleTableRow';
import TableEmptyRows from '@/components/common/table/TableEmptyRows';
import TableNoData from '@/components/common/table/TableNoData';
import useAppSelector from '@/hooks/useAppSelector';

const VehicleManagerView = () => {
  const { dataVehicle } = useAppSelector(state => state.vehicle);
  const breadcrumbs = useBreadcrumbs();
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
      const newSelecteds = dataVehicle.map(n => n.device_id);
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

  if (dataVehicle) {
    const dataFiltered = applyFilter({
      inputData: dataVehicle,
      comparator: getComparator(order, orderBy),
      filterName
    });

    const notFound = !dataFiltered.length && !!filterName;

    return (
      <Container maxWidth='xl'>
        <Stack
          spacing={2}
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          mb={5}
        >
          <Typography variant='h5'>Danh sách xe</Typography>
          <Button
            variant='contained'
            color='inherit'
            startIcon={<Iconify icon='eva:plus-fill' />}
          >
            Tạo
          </Button>
        </Stack>
        <Breadcrumbs separator='›' aria-label='breadcrumb' mb={5}>
          {breadcrumbs}
        </Breadcrumbs>
        <Card>
          <VehicleTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onOptionFilter={handleShowFilter}
          />
          { <VehicleTableFilter onFilter={handleActionFilter} />}

          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <VehicleTableHead
                order={order}
                orderBy={orderBy}
                rowCount={dataVehicle.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'device_id', label: 'ID' },
                  { id: 'status', label: 'Trạng thái' },
                  { id: 'battery_status', label: 'Trạng thái pin' },
                  { id: 'customer_name', label: 'Tên KH' },
                  { id: 'vehicle_type', label: 'Loại xe' },
                  { id: 'unit_price', label: 'Giá thuê' },
                  { id: 'total_price', label: 'Thành tiền' },
                  { id: 'rental_duration', label: 'Thời gian thuê' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {Array.isArray(dataVehicle) &&
                  dataVehicle.length > 0 &&
                  dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      return (
                        <VehicleTableRow
                          key={row?.device_id}
                          device_id={row?.device_id}
                          status={row.status}
                          battery_status={row.battery_status}
                          unit_price={row.unit_price}
                          total_price={row.total_price}
                          rental_duration={row.rental_duration}
                          customer_name={row.customer_name}
                          vehicle_type={row.vehicle_type}
                          selected={selected.indexOf(row.device_id) !== -1}
                          handleClick={event =>
                            handleClick(event, row.device_id)
                          }
                        />
                      );
                    })}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, dataVehicle.length)}
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

export default VehicleManagerView;
