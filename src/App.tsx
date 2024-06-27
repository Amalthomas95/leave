import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import AdminDashboard from './Pages/AdminDashboard';

import Header from './Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './Redux/store';
import { login } from './Features/auth/authSlice';
import EmployeeProfilePage from './Pages/EmployeeProfilePage';

const App: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('users') || '[]').find((user: any) => user.isLoggedIn);

    if (storedUser) {
      dispatch(login(storedUser));
    }
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {isAuthenticated && user?.role === 'admin' && (
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
        )}
        {isAuthenticated && user?.role === 'employee' && (
          <Route path="/EmployeeProfilePage" element={<EmployeeProfilePage/>} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
