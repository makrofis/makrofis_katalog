const catalogStyles = {
  heroSection: {
    background: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    py: 10,
    textAlign: 'center',
    mb: 6
  },
  sectionTitle: {
    textAlign: 'center', 
    mb: 4, 
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: -10,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 60,
      height: 4,
      bgcolor: 'secondary.main',
      borderRadius: 2
    }
  },
  primaryButton: {
    bgcolor: 'secondary.main',
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
  },
  cardHover: {
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)'
    }
  },
  imageHover: {
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },
  productActions: {
    position: 'absolute', 
    bottom: -50, 
    left: 0, 
    right: 0, 
    display: 'flex', 
    justifyContent: 'center', 
    gap: 1, 
    p: 2, 
    bgcolor: 'rgba(255, 255, 255, 0.9)',
    transition: 'all 0.3s ease',
    '.MuiCard-root:hover &': {
      bottom: 0
    }
  }
};

export default catalogStyles;