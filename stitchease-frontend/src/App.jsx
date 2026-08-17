import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ManageDesigns from './components/ManageDesigns';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ExploreDesigns from './components/ExploreDesigns';
import CustomerProfile from './components/CustomerProfile';
import TailorDashboard from './components/TailorDashboard';
import TailorProfile from './components/TailorProfile';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DesignCustomization from './components/DesignCustomization';
import CheckoutMeasurements from './components/CheckoutMeasurements';
import CheckoutDelivery from './components/CheckoutDelivery';
import CheckoutReview from './components/CheckoutReview';

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
            path="/admin" 
            element={
              <ProtectedRoute>
                <TailorDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/profile" 
            element={
              <ProtectedRoute>
                <TailorProfile />
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
          <Route 
            path="/design-customization/:id" 
            element={
              <ProtectedRoute>
                <DesignCustomization />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/checkout-measurements/:id" 
            element={
              <ProtectedRoute>
                <CheckoutMeasurements />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/checkout-delivery/:id" 
            element={
              <ProtectedRoute>
                <CheckoutDelivery />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/checkout-review/:id" 
            element={
              <ProtectedRoute>
                <CheckoutReview />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}