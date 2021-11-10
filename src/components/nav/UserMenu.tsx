// react
import { useState } from 'react';
// material-ui
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// THIS PROJECT
// hooks
import { useAuthContext } from '../../contexts/AuthContext';

export default function UserMenu(): React.ReactElement {
  const { currentUser, logOut } = useAuthContext();
  const [anchorUserEl, setAnchorUserEl] = useState<null | HTMLElement>(null);
  const openUserMenu = Boolean(anchorUserEl);

  const toggleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorUserEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorUserEl(null);
  };

  return <>
    <IconButton
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={toggleUserMenu}
      color="inherit"
      size="large">
      <AccountCircle />
    </IconButton>
    <Menu
      id="menu-appbar"
      anchorEl={anchorUserEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={openUserMenu}
      onClose={handleClose}
    >
      <MenuItem disabled>{currentUser}</MenuItem>
      <MenuItem onClick={logOut}>LOG OUT</MenuItem>
    </Menu>
  </>;
};
