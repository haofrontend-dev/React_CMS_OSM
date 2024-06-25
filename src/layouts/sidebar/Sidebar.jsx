import React from 'react';
import { useMediaQuery, Box, Drawer } from '@mui/material';
import json2mq from 'json2mq';
import SidebarItems from './SidebarItems';

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const lgUp = useMediaQuery(
    json2mq({
      minWidth: 600
    })
  );
  const sidebarWidth = "270px";

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
