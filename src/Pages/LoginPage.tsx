
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Features/auth/authSlice';
import { RootState } from '../Redux/store';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userRole = useSelector((state: RootState) => state.auth.userRole);

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values: any) => {
    dispatch(login(values));
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      if (userRole === 'admin') {
        navigate('/AdminDashboard');
      } else if (userRole === 'employee') {
        navigate('/EmployeeProfile');
      }
    } else if (userRole === null && isAuthenticated === false) {
      setError('Invalid username or password');
    }
  }, [isAuthenticated, userRole, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors, touched }) => (
            <Form>
              <BootstrapForm.Group controlId="username">
                <BootstrapForm.Label>Username</BootstrapForm.Label>
                <Field name="username" as={BootstrapForm.Control} />
                <ErrorMessage name="username" component="div" className="text-danger" />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="password">
                <BootstrapForm.Label>Password</BootstrapForm.Label>
                <Field name="password" type="password" as={BootstrapForm.Control} />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </BootstrapForm.Group>

              <Button style={{ marginTop: '30px' }} variant="primary" type="submit">
                Login
              </Button>

              {error && <Alert style={{ marginTop: '30px' }} variant="danger">{error}</Alert>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
