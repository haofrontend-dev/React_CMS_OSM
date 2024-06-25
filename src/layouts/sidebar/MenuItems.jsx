import {
  CarRentalOutlined,
  MapOutlined,
  BookmarkAddOutlined,
  PeopleOutline
} from '@mui/icons-material';
import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Quản lý'
  },
  {
    id: uniqueId(),
    title: 'Quản lý xe',
    icon: CarRentalOutlined,
    href: '/'
  },
  {
    id: uniqueId(),
    title: 'Quản lý Maps',
    icon: MapOutlined,
    href: '/control-map'
  },
  {
    id: uniqueId(),
    title: 'Quản lý đơn hàng',
    icon: BookmarkAddOutlined,
    href: '/orders'
  },
  {
    id: uniqueId(),
    title: 'Quản lý khách hàng',
    icon: PeopleOutline,
    href: '/customers'
  }
];

export default Menuitems;
