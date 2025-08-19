// Home.js - Güncellenmiş Catalog Ana Sayfası
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  Visibility,
  Search
} from '@mui/icons-material';
import { getItems, getCategories } from '../../services/api';

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Öne çıkan ürünleri ve kategorileri al
        const [productsRes, categoriesRes] = await Promise.all([
          getItems(),
          getCategories()
        ]);
        
        // İlk 6 ürünü öne çıkan olarak al
        setFeaturedProducts(productsRes.data.slice(0, 6));
        setCategories(categoriesRes.data.slice(0, 4));
      } catch (err) {
        console.error('Veri yüklenirken hata oluştu:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography>Yükleniyor...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box 
        sx={{
          background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: 10,
          textAlign: 'center',
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Kalitede Öncü, Trendde Lider
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 700, mx: 'auto', mb: 4, opacity: 0.9 }}>
            En yeni ürünlerimizle hayatınıza değer katın. Özel indirimlerle sınırlı stoklarla!
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            sx={{
              bgcolor: '#ff006e',
              borderRadius: '50px',
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              '&:hover': {
                bgcolor: '#e0005c',
                transform: 'translateY(-3px)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Hemen Keşfet
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Categories Section */}
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            textAlign="center" 
            sx={{ 
              mb: 4,
              position: 'relative',
              display: 'inline-block',
              width: '100%',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 4,
                bgcolor: '#ff006e',
                borderRadius: 2
              }
            }}
          >
            Popüler Kategoriler
          </Typography>
          
          <Grid container spacing={3}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={3} key={category._id}>
                <Card 
                  sx={{ 
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={category.imageUrl || "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"}
                    alt={category.name}
                    sx={{
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category.subcategories?.length || 0} alt kategori
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Products Section */}
        <Box sx={{ mb: 8 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
              mb: 4,
              p: 3,
              bgcolor: 'white',
              borderRadius: 3,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Typography variant="h4" component="h2">
              Öne Çıkan Ürünler
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                variant="outlined" 
                size="small"
                sx={{ 
                  minWidth: 'auto',
                  borderRadius: 2
                }}
              >
                Tüm Kategoriler
              </Button>
              <Button 
                variant="outlined" 
                size="small"
                sx={{ 
                  minWidth: 'auto',
                  borderRadius: 2
                }}
              >
                Varsayılan Sıralama
              </Button>
            </Box>
          </Box>
          
          <Grid container spacing={3}>
            {featuredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card 
                  sx={{ 
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                >
                  {/* Product Badge */}
                  {product.isFeatured && (
                    <Chip 
                      label="Yeni" 
                      sx={{ 
                        position: 'absolute', 
                        top: 16, 
                        left: 16, 
                        bgcolor: '#ff006e', 
                        color: 'white',
                        fontWeight: 'bold'
                      }} 
                    />
                  )}
                  
                  <CardMedia
                    component="img"
                    height="220"
                    image={product.images && product.images.length > 0 ? product.images[0] : "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"}
                    alt={product.name}
                    sx={{
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                  
                  {/* Product Actions */}
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      bottom: -50, 
                      left: 0, 
                      right: 0, 
                      display: 'flex', 
                      justifyContent: 'center', 
                      gap: 1, 
                      p: 2, 
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                      transition: 'all 0.3s ease'
                    }}
                    className="product-actions"
                  >
                    <IconButton 
                      size="small" 
                      sx={{ 
                        bgcolor: 'primary.main', 
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.dark' }
                      }}
                    >
                      <ShoppingCart />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      sx={{ 
                        bgcolor: 'primary.main', 
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.dark' }
                      }}
                    >
                      <Favorite />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      sx={{ 
                        bgcolor: 'primary.main', 
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.dark' }
                      }}
                    >
                      <Visibility />
                    </IconButton>
                  </Box>
                  
                  <CardContent>
                    <Typography variant="h6" gutterBottom noWrap>
                      {product.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {product.description || 'Açıklama bulunmamaktadır.'}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" color="primary.main">
                        ₺{product.price?.toFixed(2)}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating value={product.rating || 0} size="small" readOnly />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          ({product.reviewCount || 0})
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
                
                {/* Hover effect for actions */}
                <style jsx>{`
                  .product-card:hover .product-actions {
                    bottom: 0;
                  }
                `}</style>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}