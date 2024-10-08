import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import BookIcon from '@mui/icons-material/Book';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../theme/ThemeContextProvider';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const pages = ['In Progress', 'Completed'];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
  const { mode, toggleColorMode } = useThemeContext();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget instanceof HTMLElement) {
      setAnchorElNav(event.currentTarget);
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position='sticky' sx={{ boxShadow: 'none' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Link
            to={'/'}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <BookIcon sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }} />
            <Typography
              variant='h6'
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', sm: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              JUST DO IT
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', sm: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link
                  key={page}
                  to={`/status/${page}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign='center'>{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          <BookIcon sx={{ display: { xs: 'flex', sm: 'none' }, mr: 1 }} />
          <Box
            sx={{
              display: { xs: 'flex', sm: 'none' },
              flexGrow: 1,
            }}
          >
            <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography
                variant='h5'
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'flex', sm: 'none' },
                  flexGrow: 1,
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                JUST DO IT
              </Typography>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
            {pages.map((page) => (
              <Link
                key={page}
                to={`/status/${page}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              sx={{ ml: 1 }}
              onClick={toggleColorMode}
              color='inherit'
            >
              {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
