import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Box,
  Badge
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const menuItems = [
    { text: 'Ana Sayfa', path: '/' },
    { text: 'Kategoriler', path: '/categories' },
    { text: 'Ürünler', path: '/products' },
    { text: 'Hakkımızda', path: '/about' },
    { text: 'İletişim', path: '/contact' }
  ];

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'linear-gradient(135deg, #3a86ff 0%, #2563eb 100%)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            display: 'flex', 
            alignItems: 'center',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          onClick={() => navigate('/')}
        >
          <Box component="span" sx={{ mr: 1, fontSize: '1.5rem' }}>🏬</Box>
          Makrofis
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  {menuItems.map((item) => (
                    <ListItem 
                      button 
                      key={item.text}
                      onClick={() => navigate(item.path)}
                      selected={location.pathname === item.path}
                    >
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {menuItems.map((item) => (
              <Button 
                key={item.text} 
                color="inherit"
                onClick={() => navigate(item.path)}
                variant={location.pathname === item.path ? "outlined" : "text"}
                sx={{ 
                  borderRadius: 2,
                  ...(location.pathname === item.path && { 
                    backgroundColor: 'rgba(255, 255, 255, 0.15)' 
                  })
                }}
              >
                {item.text}
              </Button>
            ))}
            
            <Box sx={{ 
              position: 'relative', 
              display: 'flex', 
              alignItems: 'center', 
              bgcolor: 'rgba(255, 255, 255, 0.2)', 
              borderRadius: '50px', 
              px: 1, 
              py: 0.5,
              ml: 2
            }}>
              <SearchIcon sx={{ color: 'white', mr: 1 }} />
              <InputBase
                placeholder="Ürün veya kategori ara..."
                sx={{ color: 'white', width: 200 }}
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearch}
              />
            </Box>
            
            <IconButton color="inherit">
              <Badge badgeContent={3} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            
            <IconButton color="inherit">
              <PersonIcon />
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}