import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Listings from './pages/Listings';
import ListingDetail from './pages/ListingDetail';
import ListingCreate from './pages/ListingCreate';
import Profile from './pages/Profile';
import MyListings from './pages/MyListings';
import NotFound from './pages/NotFound';

function App() {
  useEffect(() => {
    const routes = [
      '/',
      '/register',
      '/login',
      '/listings',
      '/listings/:id',
      '/create',
      '/profile',
      '/my-listings'
    ];
    if (typeof window !== 'undefined' && typeof window.handleRoutes === 'function') {
      window.handleRoutes(routes);
    }
  }, []);

  return (
    <ErrorBoundary>
      <div data-easytag="id1-src/App.js" className="min-h-screen bg-gray-50">
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}> 
              <Route index element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/listings/:id" element={<ListingDetail />} />
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <ListingCreate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-listings"
                element={
                  <ProtectedRoute>
                    <MyListings />
                  </ProtectedRoute>
                }
              />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
}

export default App;
