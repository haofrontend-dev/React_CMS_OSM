import { useState } from 'react';

import { USER_KEYS } from '@/configs';
import { clearAllInit } from '@/features/auth/authSlice';
import useAppSelector from '@/hooks/useAppSelector';
import { removeItem } from '@/utils';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export const account = {
  displayName: 'Jaydon Frankie',
  email: 'demo@minimals.cc',
  photoURL: '/assets/images/avatars/avatar_25.jpg'
};

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    path: '/profile'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { dataProfile } = useAppSelector(state => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(null);

  const handleOpen = event => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    dispatch(clearAllInit());
    removeItem(USER_KEYS.USER_TOKEN);
    navigate('/auth/login', { replace: true });
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: theme => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: theme =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`
          })
        }}
      >
        <Avatar
          src={dataProfile?.avatar}
          alt={dataProfile?.fullname}
          sx={{
            width: 36,
            height: 36,
            border: theme => `solid 2px ${theme.palette.background.default}`
          }}
        >
          {dataProfile?.fullname.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200
          }
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant='subtitle2' noWrap>
            {dataProfile?.fullname}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }} noWrap>
            {dataProfile?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {MENU_OPTIONS.map(option => (
          <MenuItem
            key={option.label}
            onClick={() => {
              navigate('/profile');
              handleClose();
            }}
          >
            <Link>{option.label}</Link>
          </MenuItem>
        ))}

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleLogout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
