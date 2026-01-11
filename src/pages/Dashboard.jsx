import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { useEmployees } from '../context/EmployeeContext';
import StatsCard from '../components/StatsCard';
import EmployeeTable from '../components/EmployeeTable';
import Header from '../components/Header';
import { FiUsers, FiUserCheck, FiUserX, FiSearch, FiPlus, FiPrinter } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { employees } = useEmployees();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const stats = useMemo(() => {
    return {
      total: employees.length,
      active: employees.filter(e => e.active).length,
      inactive: employees.filter(e => !e.active).length
    };
  }, [employees]);

  const filteredData = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGender = filterGender ? emp.gender === filterGender : true;
      const matchesStatus = filterStatus ? String(emp.active) === filterStatus : true;      
      return matchesSearch && matchesGender && matchesStatus;
    });
  }, [employees, searchTerm, filterGender, filterStatus]);
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Header />
      <Container className="pb-5">
        <Row className="mb-4 no-print">
          <StatsCard title="Total Employees" count={stats.total} icon={<FiUsers />} color="primary" />
          <StatsCard title="Active Employees" count={stats.active} icon={<FiUserCheck />} color="success" />
          <StatsCard title="Inactive Employees" count={stats.inactive} icon={<FiUserX />} color="secondary" />
        </Row>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 bg-white p-3 rounded shadow-sm no-print gap-3">
          <h4 className="fw-bold mb-0">Employee List</h4>
          <div className="d-flex gap-2">
            <Button variant="outline-dark" onClick={handlePrint}>
              <FiPrinter className="me-2" /> Print
            </Button>
            <Button variant="primary" onClick={() => navigate('/add')}>
              <FiPlus className="me-2" /> Add Employee
            </Button>
          </div>
        </div>

        <div className="row g-3 mb-4 no-print">
          <div className="col-md-4">
            <InputGroup>
              <InputGroup.Text className="bg-white border-end-0"><FiSearch /></InputGroup.Text>
              <Form.Control 
                placeholder="Search by name..." 
                className="border-start-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="col-md-3">
            <Form.Select value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Form.Select>
          </div>
          <div className="col-md-3">
            <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </Form.Select>
          </div>
        </div>

        <div className="printable-area">
          <EmployeeTable data={filteredData} />
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
