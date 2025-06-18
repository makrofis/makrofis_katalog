import { Box, Typography, Container, Grid, Card, CardMedia, CardContent, Button, Breadcrumbs, Link, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItemsByCategory } from '../../services/api';
import HomeIcon from '@mui/icons-material/Home';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const CategoryHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
  background: theme.palette.background.paper,
  marginBottom: theme.spacing(4),
}));

const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const ProductImage = styled(CardMedia)({
  height: 200,
  objectFit: 'contain',
  backgroundColor: '#f5f5f5',
});

function Category() {
  const { categoryName, subcategoryName } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await getItemsByCategory(categoryName, subcategoryName);
        setCategoryData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch category data:', error);
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryName, subcategoryName]);

  return (
    <Box>
      <CategoryHeader>
        <Container maxWidth="xl">
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" sx={{ mb: 2 }}>
            <Link underline="hover" color="inherit" href="/">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Link underline="hover" color="inherit" href={`/category/${categoryName}`}>
              {categoryName}
            </Link>
            {subcategoryName && (
              <Typography color="text.primary">{subcategoryName}</Typography>
            )}
          </Breadcrumbs>

          <Typography variant="h3" component="h1" gutterBottom>
            {subcategoryName || categoryName}
          </Typography>
          {subcategoryName && (
            <Typography variant="subtitle1" color="text.secondary">
              {categoryName} &gt; {subcategoryName}
            </Typography>
          )}
        </Container>
      </CategoryHeader>

      <Container maxWidth="xl" sx={{ py: 2 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <Typography>Loading products...</Typography>
          </Box>
        ) : (
          <>
            {categoryData?.products?.length > 0 ? (
              <Grid container spacing={4}>
                {categoryData.products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                    <ProductCard>
                      <ProductImage
                        component="img"
                        image={product.images?.[0] || 'https://source.unsplash.com/random/300x300/?product'}
                        alt={product.name}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6" component="div">
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {product.description || 'No description available'}
                        </Typography>
                        <Chip label={`$${product.price}`} color="primary" size="small" />
                      </CardContent>
                      <Box sx={{ p: 2 }}>
                        <Button
                          size="small"
                          fullWidth
                          variant="contained"
                          href={`/product/${product._id}`}
                        >
                          View Details
                        </Button>
                      </Box>
                    </ProductCard>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <Typography variant="h6" color="text.secondary">
                  No products found in this category.
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}

export default Category;