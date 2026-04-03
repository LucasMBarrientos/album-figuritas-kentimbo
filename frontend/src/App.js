import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Album from './pages/Album';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/album" 
            element={
              <PrivateRoute>
                <Album />
              </PrivateRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/album" />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
