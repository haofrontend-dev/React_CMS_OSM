import { useLocation } from "react-router-dom";
import { Box, List } from "@mui/material";

import MenuItems from "./MenuItems";
import NavGroup from "./NavGroup";
import NavItem from "./NavItem";

// eslint-disable-next-line react/prop-types
const SidebarItems = ({ toggleMobileSidebar }) => {
    const location = useLocation();
    const pathName = location.pathname;

    return (
        <Box sx={{ px: 3 }}>
            <List className="sidebarNav" component="div">
                {MenuItems.map((item) => {
                    // {/********SubHeader**********/}
                    if (item.subheader) {
                        return <NavGroup item={item} key={item.subheader} />;

                        // {/********If Sub Menu**********/}
                        /* eslint no-else-return: "off" */
                    }  else {
                        return (
                          <NavItem
                            item={item}
                            key={item.id}
                            pathDirect={pathName}
                            onClick={toggleMobileSidebar}
                          />
                        );
                      }
                })}
            </List>
        </Box>
    );
};

export default SidebarItems;
