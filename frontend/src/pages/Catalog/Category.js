import { Box, Typography, Container, Grid, Card, CardMedia, CardContent, Button, Breadcrumbs, Link, Chip, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemsByCategory } from '../services/api';
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
    cursor: 'pointer',
  },
}));

const ProductImage = styled(CardMedia)({
  height: 200,
  objectFit: 'contain',
  backgroundColor: '#f5f5f5',
});

const SubcategoryButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  borderRadius: '20px',
  padding: theme.spacing(1, 2),
  margin: theme.spacing(0.5),
  borderColor: theme.palette.divider,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    borderColor: theme.palette.primary.main,
  },
}));

function Category() {
  const { categoryName, subcategoryName } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleSubcategoryClick = (subcategory) => {
    navigate(`/category/${categoryName}/${subcategory}`);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

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
        {/* Subcategories Section */}
        {!subcategoryName && categoryData?.subcategories?.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" gutterBottom>
              Subcategories
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {categoryData.subcategories.map((subcat) => (
                <SubcategoryButton
                  key={subcat.name}
                  variant="outlined"
                  onClick={() => handleSubcategoryClick(subcat.name)}
                  startIcon={
                    subcat.imageUrl ? (
                      <img 
                        src={subcat.imageUrl} 
                        alt={subcat.name} 
                        style={{ width: 24, height: 24, borderRadius: '50%' }} 
                      />
                    ) : undefined
                  }
                >
                  {subcat.name}
                </SubcategoryButton>
              ))}
            </Box>
            <Divider sx={{ my: 3 }} />
          </Box>
        )}

        {/* Products Section */}
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
                    <ProductCard onClick={() => handleProductClick(product._id)}>
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(product._id);
                          }}
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