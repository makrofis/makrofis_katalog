import { Box, Typography, Container, Grid, Card, CardMedia, CardContent, Button, Breadcrumbs, Link, Divider, Chip, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItems } from '../../services/api';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ProductContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
}));

const ProductImage = styled(CardMedia)({
  height: 400,
  objectFit: 'contain',
  backgroundColor: '#f5f5f5',
});

const ThumbnailImage = styled(CardMedia)({
  height: 80,
  width: 80,
  objectFit: 'contain',
  backgroundColor: '#f5f5f5',
  cursor: 'pointer',
  border: '1px solid #e0e0e0',
  '&:hover': {
    borderColor: 'primary.main',
  },
});

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getItems();
        const foundProduct = response.data.find(item => item._id === productId);
        setProduct(foundProduct);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography>Loading product details...</Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography variant="h6" color="error">
          Product not found
        </Typography>
      </Box>
    );
  }

  return (
    <ProductContainer>
      <Container maxWidth="xl">
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 4 }}>
          <Link underline="hover" color="inherit" href="/">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Link underline="hover" color="inherit" href={`/category/${product.category}`}>
            {product.category}
          </Link>
          {product.subcategory && (
            <Link underline="hover" color="inherit" href={`/category/${product.category}/${product.subcategory}`}>
              {product.subcategory}
            </Link>
          )}
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 2 }}>
              <ProductImage
                component="img"
                image={product.images?.[selectedImage] || 'https://source.unsplash.com/random/600x600/?product'}
                alt={product.name}
              />
            </Card>
            <Grid container spacing={1}>
              {product.images?.map((image, index) => (
                <Grid item key={index}>
                  <ThumbnailImage
                    component="img"
                    image={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    onClick={() => setSelectedImage(index)}
                    sx={{
                      borderColor: selectedImage === index ? 'primary.main' : 'divider',
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h1" gutterBottom>
              {product.name}
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <Rating value={4.5} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                (24 reviews)
              </Typography>
            </Box>
            <Typography variant="h4" color="primary" gutterBottom>
              ${product.price}
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              {product.description || 'No description available.'}
            </Typography>

            {product.specs?.length > 0 && (
              <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                  Specifications:
                </Typography>
                <ul style={{ paddingLeft: 20 }}>
                  {product.specs.map((spec, index) => (
                    <li key={index}>
                      <Typography variant="body2">{spec}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
            )}

            <Divider sx={{ my: 3 }} />

            <Box display="flex" gap={2} flexWrap="wrap">
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                sx={{ flexGrow: 1 }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<FavoriteBorderIcon />}
              >
                Wishlist
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<ShareIcon />}
              >
                Share
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ProductContainer>
  );
}

export default Product;