import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.jpg'; // Import the logo

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Sidebar = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    // Clear localStorage and navigate to login page
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const role = localStorage.getItem('role');
  const employeId = localStorage.getItem('Id');

  const getMenuItems = () => {
    switch (role) {
      case 'ADMIN':
        return [
          { label: 'Employees', path: '/admin/employe-management', icon: <InboxIcon /> },
          { label: 'Users', path: '/admin/user-management', icon: <InboxIcon /> },
          { label: 'Documents', path: '/fichepaielist', icon: <InboxIcon /> },
        ];
      case 'MANAGER':
        return [
          { label: 'Employees', path: '/admin/employe-management', icon: <InboxIcon /> },
          { label: 'Documents', path: '/fichepaielist', icon: <InboxIcon /> },
          { label: 'Conges', path: '/managerCongeList', icon: <InboxIcon /> },
        ];
      case 'USER':
        return [
          { label: 'Conges', path: '/CongeList', icon: <InboxIcon /> },
          { label: 'Work Hours', path: `/hours-worked/${employeId}`, icon: <InboxIcon /> },
          { label: 'Documents', path: '/employefichepaielist', icon: <InboxIcon /> },
          { label: 'Submit Work Hours', path: '/add-hours-worked', icon: <InboxIcon /> },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  // Dynamic title based on role
  let title = '';
  switch (role) {
    case 'ADMIN':
      title = 'Admin Dashboard';
      break;
    case 'MANAGER':
      title = 'Manager Dashboard';
      break;
    case 'USER':
      title = 'Employee Dashboard';
      break;
    default:
      title = 'Dashboard';
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="logout"
            edge="end"
            onClick={handleLogout}
            sx={{ marginLeft: 'auto' }}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: theme.spacing(2) }}>
          <img src={logo} alt="Logo" style={{ width: '80%', height: 'auto' }} />
        </Box>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => navigate(item.path)}
              sx={{ display: 'block' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
