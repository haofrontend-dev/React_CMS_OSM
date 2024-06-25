// mui imports
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme,
  ListItemButton,
} from "@mui/material";
import { NavLink } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const NavItem = ({ item, level, pathDirect, onClick }) => {
  // eslint-disable-next-line react/prop-types
  const Icon = item.icon;
  const theme = useTheme();
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

  const ListItemStyled = styled(ListItem)(() => ({
      padding: 0,
      ".MuiButtonBase-root": {
          whiteSpace: "nowrap",
          marginBottom: "2px",
          padding: "8px 10px",
          borderRadius: "8px",
          backgroundColor: level > 1 ? "transparent !important" : "inherit",
          color: theme.palette.text.secondary,
          paddingLeft: "10px",
          "&:hover": {
              backgroundColor: '#ECF2FF',
              color: theme.palette.primary.main,
          },
          "&.Mui-selected": {
              color: "white",
              backgroundColor: theme.palette.primary.main,
              "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
              },
          },
      },
  }));

  return (
      // eslint-disable-next-line react/prop-types
      <List component="div" disablePadding key={item.id}>
          <ListItemStyled>

              <ListItemButton
                  component={NavLink}
                  // eslint-disable-next-line react/prop-types
                  to={item.href}
                  // eslint-disable-next-line react/prop-types
                  disabled={item.disabled}
                  // eslint-disable-next-line react/prop-types
                  selected={pathDirect === item.href}
                  // eslint-disable-next-line react/prop-types
                  target={item.external ? "_blank" : ""}
                  onClick={onClick}
              >
                  <ListItemIcon
                      sx={{
                          minWidth: "36px",
                          p: "3px 0",
                          color: "inherit",
                      }}
                  >
                      {itemIcon}
                  </ListItemIcon>
                  <ListItemText>
                      {
                          // eslint-disable-next-line react/prop-types
                          item.title
                      }
                  </ListItemText>
              </ListItemButton>
          </ListItemStyled>
      </List>
  );
};

export default NavItem;
