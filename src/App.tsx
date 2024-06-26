
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import EmployeeProfilePage from './Pages/EmployeeProfilePage';
import AdminDashboard from './Pages/AdminDashboard';
import { useSelector } from 'react-redux';
import { RootState } from './Redux/store';
import './App.css';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userRole = useSelector((state: RootState) => state.auth.userRole);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route 
          path="/AdminDashboard" 
          element={isAuthenticated && userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} 
        />
        <Route 
          path="/EmployeeProfile" 
          element={isAuthenticated && userRole === 'employee' ? <EmployeeProfilePage /> : <Navigate to="/" />} 
        />
      </Routes>
    </div>
  );
};

export default App;
