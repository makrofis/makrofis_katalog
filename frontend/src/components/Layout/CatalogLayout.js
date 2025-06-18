import { Box, Container, CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';
import CatalogHeader from '../Navigation/CatalogHeader';
import CatalogFooter from '../Navigation/CatalogFooter';

const MainContent = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
}));

const ContentWrapper = styled(Box)({
  flex: 1,
  paddingTop: '64px', // Space for header
});

function CatalogLayout({ children }) {
  return (
    <MainContent>
      <CssBaseline />
      <CatalogHeader />
      <ContentWrapper>
        <Container maxWidth="xl">
          {children}
        </Container>
      </ContentWrapper>
      <CatalogFooter />
    </MainContent>
  );
}

export default CatalogLayout;