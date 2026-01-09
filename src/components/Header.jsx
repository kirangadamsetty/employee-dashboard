import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser } from 'react-icons/fi';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="white" expand="lg" className="mb-4 sticky-top no-print">
      <Container>
        <Navbar.Brand className="fw-bold text-primary">
          Employee<span className="text-dark">Dashboard</span>
        </Navbar.Brand>
        {user && (
          <div className="d-flex align-items-center gap-3">
            <div className="d-none d-md-flex align-items-center gap-2 text-secondary">
               <FiUser /> <span>{user.name}</span>
            </div>
            <Button variant="outline-danger" size="sm" onClick={handleLogout}>
              <FiLogOut /> Logout
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;