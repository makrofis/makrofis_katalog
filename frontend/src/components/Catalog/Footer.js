import React from 'react';
import { Box, Container, Typography, Grid, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#1e293b', 
        color: 'white', 
        py: 6,
        mt: 8 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Makrofis Hakkında
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
              Kaliteli ürünleri uygun fiyatlarla müşterilerimize ulaştırmak için 2010 yılından beri hizmet veriyoruz.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'primary.main' } }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'primary.main' } }}>
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'primary.main' } }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'primary.main' } }}>
                <YouTube />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Alışveriş
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5, cursor: 'pointer', '&:hover': { opacity: 1 } }}>Ürün Kataloğu</Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5, cursor: 'pointer', '&:hover': { opacity: 1 } }}>İndirimler</Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5, cursor: 'pointer', '&:hover': { opacity: 1 } }}>Yeni Gelenler</Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5, cursor: 'pointer', '&:hover': { opacity: 1 } }}>Teslimat Bilgileri</Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>Ödeme Seçenekleri</Typography>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Bilgi
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5, cursor: 'pointer', '&:hover': { opacity: 1 } }}>Hakkımızda</Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5, cursor: 'pointer', '&:hover': { opacity: 1 } }}>İletişim</Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5, cursor: 'pointer', '&:hover': { opacity: 1 } }}>Gizlilik Politikası</Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5, cursor: 'pointer', '&:hover': { opacity: 1 } }}>Satış Sözleşmesi</Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, cursor: 'pointer', '&:hover': { opacity: 1 } }}>Geri Dönüşüm & İade</Typography>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              İletişim
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>1234 Cadde, İstanbul, Türkiye</Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>+90 212 345 67 89</Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>info@makrofis.com</Typography>
          </Grid>
        </Grid>
        
        <Typography variant="body2" align="center" sx={{ opacity: 0.7, pt: 3, mt: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          &copy; 2023 Makrofis. Tüm hakları saklıdır.
        </Typography>
      </Container>
    </Box>
  );
}