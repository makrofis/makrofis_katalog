import { Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../../services/api';
import { useEffect, useState } from 'react';

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        All Categories
      </Typography>
      {loading ? (
        <Typography>Loading categories...</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {categories.map((category) => (
            <Box 
              key={category._id}
              onClick={() => navigate(`/category/${category.name}`)}
              sx={{
                p: 3,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <Typography variant="h6">{category.name}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default CategoriesPage;