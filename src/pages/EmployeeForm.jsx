import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useEmployees } from '../context/EmployeeContext';
import Header from '../components/Header';
import { FiSave, FiArrowLeft, FiUpload } from 'react-icons/fi';

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];


const EmployeeForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { addEmployee, editEmployee, employees } = useEmployees();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    state: '',
    active: true,
    image: '' 
  });
  
  const [preview, setPreview] = useState(null);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode) {
      const employee = employees.find(e => e.id === parseInt(id));
      if (employee) {
        setFormData(employee);
        setPreview(employee.image);
      } else {
        setError('Employee not found');
      }
    }
  }, [id, isEditMode, employees]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2000000) { 
        alert("File is too large. Please select an image under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    if (!formData.gender || !formData.state) {
        setValidated(true);
        return;
    }

    if (isEditMode) {
      editEmployee(formData);
    } else {
      addEmployee(formData);
    }
    navigate('/dashboard');
  };

  return (
    <>
      <Header />
      <Container className="mb-5">
        <div className="d-flex justify-content-center">
          <Card className="shadow-sm border-0 w-100" style={{ maxWidth: '800px' }}>
            <Card.Header className="bg-white border-bottom-0 pt-4 px-4 d-flex justify-content-between align-items-center">
              <h4 className="fw-bold text-primary mb-0">{isEditMode ? 'Edit Employee' : 'Add New Employee'}</h4>
              <Button variant="outline-secondary" size="sm" onClick={() => navigate('/dashboard')}>
                <FiArrowLeft className="me-1" /> Back
              </Button>
            </Card.Header>
            <Card.Body className="p-4">
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={4} className="text-center mb-4 mb-md-0">
                    <div className="mb-3">
                      <img 
                        src={preview || "https://via.placeholder.com/150?text=Upload"} 
                        alt="Preview" 
                        className="profile-img-preview mb-3 bg-light"
                      />
                    </div>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label className="btn btn-outline-primary btn-sm w-100 cursor-pointer">
                        <FiUpload className="me-2"/> Choose Image
                        <Form.Control 
                          type="file" 
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ display: 'none' }}
                        />
                      </Form.Label>
                      <Form.Text className="text-muted d-block small">Max size 2MB</Form.Text>
                    </Form.Group>
                    
                    <Form.Group className="mt-3">
                      <Form.Check 
                        type="switch"
                        id="active-switch"
                        label={formData.active ? "Status: Active" : "Status: Inactive"}
                        name="active"
                        checked={formData.active}
                        onChange={handleChange}
                        className={formData.active ? "text-success fw-bold" : "text-muted"}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={8}>
                    <Form.Group className="mb-3" controlId="fullName">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control 
                        required 
                        type="text" 
                        placeholder="e.g. John Doe"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">Name is required.</Form.Control.Feedback>
                    </Form.Group>

                    <Row className="mb-3">
                      <Col md={6}>
                        <Form.Group controlId="gender">
                          <Form.Label>Gender</Form.Label>
                          <Form.Select 
                            required 
                            name="gender" 
                            value={formData.gender} 
                            onChange={handleChange}
                          >
                            <option value="">Select...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">Gender is required.</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="dob">
                          <Form.Label>Date of Birth</Form.Label>
                          <Form.Control 
                            required 
                            type="date" 
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                          />
                          <Form.Control.Feedback type="invalid">DOB is required.</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4" controlId="state">
                      <Form.Label>State</Form.Label>
                      <Form.Select 
                        required 
                        name="state" 
                        value={formData.state} 
                        onChange={handleChange}
                      >
                        <option value="">Select State...</option>
                        {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">State is required.</Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-grid">
                      <Button variant="primary" type="submit" size="lg">
                        <FiSave className="me-2" />
                        {isEditMode ? 'Update Employee' : 'Save Employee'}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default EmployeeForm;


