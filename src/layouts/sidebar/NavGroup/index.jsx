// mui imports
import { ListSubheader, styled } from '@mui/material';


// eslint-disable-next-line react/prop-types
const NavGroup = ({ item }) => {
  const ListSubheaderStyle = styled((props) => <ListSubheader disableSticky {...props} />)(
    ({ theme }) => ({
      ...theme.typography.overline,
      fontWeight: '700',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(0),
      color: theme.palette.text.primary,
      lineHeight: '26px',
      padding: '3px 12px',
    }),
  );
  return (
    // eslint-disable-next-line react/prop-types
    <ListSubheaderStyle>{item.subheader}</ListSubheaderStyle>
  );
};

export default NavGroup;
