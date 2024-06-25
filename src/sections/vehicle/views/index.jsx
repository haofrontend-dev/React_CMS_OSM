import React from 'react';
import {
  Box,
  Typography,
  Breadcrumbs,
  Stack,
  Button,
  Card,
  Container
} from '@mui/material';
import Iconify from '@/components/common/Iconify';
import useBreadcrumbs from '@/hooks/useBreadcrumbs';
import VehicleTableToolbar from '../VehicleTableToolbar';
import VehicleTableFilter from '../VehicleTableFilter';
import VehicleTableHead from '../VehicleTableHead';

const VehicleManagerView = () => {
  const breadcrumbs = useBreadcrumbs();
  const [order, setOrder] = React.useState('asc');
  const [selected, setSelected] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState('name');
  const [filterName, setFilterName] = React.useState('');
  const [isShowFilter, setIsShowFilter] = React.useState(false);

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
      const newSelecteds = users.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  return (
    <Container>
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
        {isShowFilter && <VehicleTableFilter onFilter={handleActionFilter} />}

        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800 }}>
            <VehicleTableHead
              order={order}
              orderBy={orderBy}
              numSelected={selected.length}
              onRequestSort={handleSort}
              onSelectAllClick={handleSelectAllClick}
              headLabel={[
                { id: 'device_id', label: 'ID' },
                { id: 'status', label: 'Trạng thái' },
                { id: 'battery_status', label: 'Trạng thái pin' },
                { id: 'customer_name', label: 'Tên KH', align: 'center' },
                { id: 'unit_price', label: 'Giá thuê' },
                { id: '' }
              ]}
            />
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
};

export default VehicleManagerView;
