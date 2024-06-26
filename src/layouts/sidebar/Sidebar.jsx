import React from 'react';
import { useMediaQuery, Box, Drawer, Avatar, Typography } from '@mui/material';
import json2mq from 'json2mq';
import { alpha } from '@mui/material/styles';

import SidebarItems from './SidebarItems';
import useAppSelector from '@/hooks/useAppSelector';

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const { dataProfile } = useAppSelector(state => state.profile);

  const lgUp = useMediaQuery(
    json2mq({
      minWidth: 600
    })
  );
  const sidebarWidth = "270px";


  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 0,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={dataProfile?.avatar} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{dataProfile?.fullname}</Typography>
      </Box>
    </Box>
  );

  if (lgUp) {
    if (lgUp)
    return (
        <Box
            sx={{
                width: sidebarWidth,
                flexShrink: 0,
            }}
        >
            {/* ------------------------------------------- */}
            {/* Sidebar for desktop */}
            {/* ------------------------------------------- */}
            <Drawer
                anchor="left"
                open={isSidebarOpen}
                variant="permanent"
                PaperProps={{
                    sx: {
                        width: sidebarWidth,
                        boxSizing: "border-box",
                    },
                }}
            >
                {/* ------------------------------------------- */}
                {/* Sidebar Box */}
                {/* ------------------------------------------- */}
                <Box
                    sx={{
                        height: "100%",
                    }}
                >
                    {/* ------------------------------------------- */}
                    {/* Logo */}
                    {/* ------------------------------------------- */}
                    <Box px={3}>
                        {/* <Logo /> */}
                        {renderAccount}
                    </Box>

                    <Box>
                        {/* ------------------------------------------- */}
                        {/* Sidebar Items */}
                        {/* ------------------------------------------- */}
                        <SidebarItems />
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
  }
};

export default Sidebar;
