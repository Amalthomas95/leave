import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const initialValues = {
    username: '',
    password: '',
    email: '',
    role: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    role: Yup.string().oneOf(['admin', 'employee']).required('Role is required'),
  });

  const handleSubmit = (values: any) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((user: any) => user.username === values.username);

    if (existingUser) {
      setError('Username already exists');
    } else {
      if (values.role === 'admin' && users.some((user: any) => user.role === 'admin')) {
        setError('Admin already registered');
      } else {
        localStorage.setItem('users', JSON.stringify([...users, values]));
        navigate('/');
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2 style={{ textAlign: 'center' }}>Register</h2>
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

              <BootstrapForm.Group controlId="email">
                <BootstrapForm.Label>Email</BootstrapForm.Label>
                <Field name="email" type="email" as={BootstrapForm.Control} />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="role">
                <BootstrapForm.Label>Role</BootstrapForm.Label>
                <Field name="role" as="select" className="form-control">
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </Field>
                <ErrorMessage name="role" component="div" className="text-danger" />
              </BootstrapForm.Group>

              <Button style={{ marginTop: '30px' }} variant="primary" type="submit">
                Register
              </Button>

              {error && <Alert style={{ marginTop: '30px' }} variant="danger">{error}</Alert>}
            </Form>
          )}
        </Formik>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <Button variant="link" onClick={() => navigate('/')}>Already have an account? Login</Button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
