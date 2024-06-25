import {
  Box,
  AppBar,
  Toolbar,
  styled,
  IconButton,
  Badge,
  Stack
} from '@mui/material';
import PropTypes from 'prop-types';

import MenuIcon from '@mui/icons-material/Menu';
import LanguagePopover from '../common/LanguagePopover';
import AccountPopover from '../common/AccountPopover';
// components

// eslint-disable-next-line react/prop-types
const Header = ({ toggleMobileSidebar }) => {
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px'
    }
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
    justifyContent: 'space-between'
  }));

  return (
    <AppBarStyled position='sticky' color='default'>
      <ToolbarStyled>
        <IconButton
          color='inherit'
          aria-label='menu'
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: 'none',
              xs: 'inline'
            }
          }}
        >
          <MenuIcon />
        </IconButton>
        <Box flexGrow={1} />
        <LanguagePopover />
        <AccountPopover />
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object
};

export default Header;
