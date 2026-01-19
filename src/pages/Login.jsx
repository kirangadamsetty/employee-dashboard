import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('bookxpert@company.com');
  const [password, setPassword] = useState('bookxpert123');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Try bookxpert@company.com / bookxpert123');
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Container style={{ maxWidth: '400px' }}>
        <Card className="p-4 shadow-lg border-0">
          <Card.Body>
            <div className="text-center mb-4">
              <h3 className="fw-bold text-primary">Employee Dashboard</h3>
              <p className="text-muted">Sign in to your account</p>
            </div>
            
            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 py-2">
                Sign In
              </Button>
            </Form>
            
            <div className="mt-3 text-center text-muted small">
              Hint: Use <b>bookxpert@company.com</b> and <b>bookxpert123</b>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
export default Login;