// App.js - Kontrol edin
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AdminLayout from './components/Layout/AdminLayout';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminCategories from './pages/Admin/Categories';
import Items from './pages/Admin/Items';
import NotFound from './pages/NotFound';
import CatalogLayout from './components/Layout/CatalogLayout';
import Home from './pages/Catalog/Home';
import Category from './pages/Catalog/Category';
import Product from './pages/Catalog/Product';
import CategoriesPage from './pages/Catalog/CategoriesPage';
import ProductsPage from './pages/Catalog/ProductsPage';
import AboutPage from './pages/Catalog/AboutPage';
import ContactPage from './pages/Catalog/ContactPage';

// Tema ayarlarınızı buraya ekleyin
const theme = createTheme({
  // Tema konfigürasyonu
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="products" element={<Items />} />
          </Route>

          {/* Catalog Routes */}
          <Route path="/" element={<CatalogLayout />}>
            <Route index element={<Home />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="category/:categoryName" element={<Category />} />
            <Route path="category/:categoryName/:subcategoryName" element={<Category />} />
            <Route path="product/:productId" element={<Product />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;