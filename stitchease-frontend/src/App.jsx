import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ManageDesigns from './components/ManageDesigns';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ExploreDesigns from './components/ExploreDesigns';
import CustomerProfile from './components/CustomerProfile';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route 
            path="/explore" 
            element={
              <ProtectedRoute>
                <ExploreDesigns />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/designs" 
            element={
              <ProtectedRoute>
                <ManageDesigns />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <CustomerProfile />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}