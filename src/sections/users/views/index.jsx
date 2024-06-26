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
import UsersTableToolbar from '../UsersTableToolbar';
import UsersTableFilter from '../UsersTableFilter';
import UsersTableHead from '../UsersTableHead';

import { cars } from '@/dumy/listCars';
import { applyFilter, emptyRows, getComparator } from '@/utils';
import UsersTableRow from '../UsersTableRow';
import TableEmptyRows from '@/components/common/table/TableEmptyRows';
import TableNoData from '@/components/common/table/TableNoData';
import useAppSelector from '@/hooks/useAppSelector';

const UsersManagerView = () => {
  const { dataUsers } = useAppSelector(state => state.users);
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
      const newSelecteds = dataUsers.map(n => n.device_id);
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

  if (dataUsers) {
    const dataFiltered = applyFilter({
      inputData: dataUsers,
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
          <Typography variant='h5'>Danh sách khách hàng</Typography>
          <Button
            variant='contained'
            color='inherit'
            startIcon={<Iconify icon='eva:plus-fill' />}
          >
            Tạo
          </Button>
        </Stack>
        <Card>
          <UsersTableToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onOptionFilter={handleShowFilter}
          />
          {isShowFilter && <UsersTableFilter onFilter={handleActionFilter} />}

          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UsersTableHead
                order={order}
                orderBy={orderBy}
                rowCount={dataUsers.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'avatar', label: 'Avatar' },
                  { id: 'customer_name', label: 'Tên KH' },
                  { id: 'email', label: 'Email' },
                  { id: 'phone_number', label: 'SĐT' },
                  { id: 'address', label: 'Địa chỉ' },
                  { id: 'registration_date', label: 'Ngày đăng ký' },
                  { id: '', }
                ]}
              />
              <TableBody>
                {Array.isArray(dataUsers) &&
                  dataUsers.length > 0 &&
                  dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <UsersTableRow
                          key={index}
                          email={row?.email}
                          avatar={row.avatar}
                          address={row.address}
                          phone_number={row.phone_number}
                          customer_name={row.customer_name}
                          registration_date={row.registration_date}
                          selected={selected.indexOf(row.device_id) !== -1}
                          handleClick={event =>
                            handleClick(event, row.device_id)
                          }
                        />
                      );
                    })}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, dataUsers.length)}
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

export default UsersManagerView;
