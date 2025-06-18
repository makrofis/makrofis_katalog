import { Box, Container, Typography, Divider, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4, 0),
  marginTop: theme.spacing(4),
}));

const FooterColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

function CatalogFooter() {
  return (
    <FooterContainer>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 4 }}>
          <FooterColumn>
            <Typography variant="h6" gutterBottom>Company</Typography>
            <Link href="#" color="textSecondary">About Us</Link>
            <Link href="#" color="textSecondary">Careers</Link>
            <Link href="#" color="textSecondary">Blog</Link>
          </FooterColumn>
          <FooterColumn>
            <Typography variant="h6" gutterBottom>Help</Typography>
            <Link href="#" color="textSecondary">Customer Service</Link>
            <Link href="#" color="textSecondary">Track Order</Link>
            <Link href="#" color="textSecondary">Returns & Exchanges</Link>
          </FooterColumn>
          <FooterColumn>
            <Typography variant="h6" gutterBottom>Contact</Typography>
            <Typography color="textSecondary">Email: info@makrofis.com</Typography>
            <Typography color="textSecondary">Phone: +90 123 456 7890</Typography>
          </FooterColumn>
        </Box>
        <Divider />
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography color="textSecondary">
            © {new Date().getFullYear()} MAKROFIS. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="#" color="textSecondary">Terms</Link>
            <Link href="#" color="textSecondary">Privacy</Link>
            <Link href="#" color="textSecondary">Cookies</Link>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
}

export default CatalogFooter;