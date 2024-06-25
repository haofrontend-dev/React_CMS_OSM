
import { TwoWheelerTwoTone, CarRentalOutlined, MapOutlined } from '@mui/icons-material'
import { uniqueId } from "lodash";

const Menuitems = [
    {
        navlabel: true,
        subheader: "Quản lý xe",
    },
    {
        id: uniqueId(),
        title: "Quản lý map",
        icon: MapOutlined,
        href: "/control-map",
    },
    {
        id: uniqueId(),
        title: "Quản lý đơn hàng",
        icon: TwoWheelerTwoTone,
        href: "/orders",
    },
    {
        id: uniqueId(),
        title: "Quản lý khách hàng",
        icon: CarRentalOutlined,
        href: "/customers",
    },
];

export default Menuitems;
