import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import HomeScreen from './screens/HomeScreen';
import ServiceList from './screens/ServiceList';
import ServiceDetail from './screens/ServiceDetail';
import UserProfile from './screens/UserProfile';
import SellerApplication from './screens/SellerApplication';
import SellerDashboard from './screens/SellerDashboard';
import AdminUsers from './screens/AdminUsers';
import ProtectedRoute from './components/ProtectedRoute';
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Chatbot />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/apply" element={<SellerApplication />} />
          <Route
            path="/seller/dashboard"
            element={
              <ProtectedRoute requiredRole="seller">
                <SellerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminUsers />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
