import { Box, Typography, Container, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { getCategories } from '../../services/api';

const HeroSection = styled(Box)(({ theme }) => ({
  height: '60vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://source.unsplash.com/random/1600x900/?products')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: theme.palette.common.white,
  textAlign: 'center',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const CategoryCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Box>
      <HeroSection>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to MAKROFIS Catalog
          </Typography>
          <Typography variant="h5" gutterBottom>
            Discover our premium collection of products
          </Typography>
          <Button variant="contained" size="large" sx={{ mt: 3 }}>
            Shop Now
          </Button>
        </Container>
      </HeroSection>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
          Browse Categories
        </Typography>
        
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <Typography>Loading categories...</Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={category._id}>
                <CategoryCard>
                  <CardMedia
                    component="img"
                    height="200"
                    image={category.imageUrl || 'https://source.unsplash.com/random/300x200/?products'}
                    alt={category.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {category.name}
                    </Typography>
                    <Button size="small" href={`/category/${category.name}`}>
                      View Products
                    </Button>
                  </CardContent>
                </CategoryCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default Home;