import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ['Dashboard', 'Clientes', 'Reglas de Acumulación'];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(navItems[0]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNavClick = (item: string) => {
    setActiveItem(item);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{
                textAlign: 'center',
                backgroundColor: activeItem === item ? '#644BBA' : 'transparent',
                color: activeItem === item ? 'white' : '#644BBA',
                fontFamily: 'Roboto, sans-serif',
               
              }}
              onClick={() => handleNavClick(item)}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: 'white', boxShadow: 'none', padding: '0 20px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' }, color: '#644BBA' }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1, justifyContent: 'center' }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color: activeItem === item ? 'white' : '#644BBA',
                  backgroundColor: activeItem === item ? '#644BBA' : 'transparent',
                  fontFamily: 'Roboto, sans-serif',
                  fontWeight: 'bold',
                  borderRadius: 10,

                  mx: 1, 
                 
                }}
                onClick={() => handleNavClick(item)}
              >
                {item}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', color: '#644BBA', fontFamily: 'Roboto, sans-serif' }}>
            <Typography sx={{ fontSize: '16px', cursor: 'pointer', color: '#1C1B1E', fontWeight: 500 }}>
              Pamela Rojas Gonzalez
            </Typography>
            <IconButton sx={{ color: '#644BBA' }}>
              <ArrowDropDownIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
