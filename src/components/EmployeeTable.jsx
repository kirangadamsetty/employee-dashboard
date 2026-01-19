import React, { useState } from 'react';
import { Table, Button, Form, Badge } from 'react-bootstrap';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import ConfirmModal from './ConfirmModal';
import { useEmployees } from '../context/EmployeeContext';
import { useNavigate } from 'react-router-dom';

const EmployeeTable = ({ data }) => {
  const { deleteEmployee, toggleStatus } = useEmployees();
  const navigate = useNavigate();
  
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
   
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteEmployee(selectedId);
    setShowModal(false);
  };

  return (
    <>
      <div className="table-responsive">
        <Table hover align="middle" className="bg-white rounded shadow-sm">
          <thead className="bg-light">
            <tr>
              <th className="py-3 ps-3">Employee</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>State</th>
              <th>Status</th>
              <th className="text-end pe-3 no-print">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((emp) => (
                <tr key={emp.id}>
                  <td className="ps-3">
                    <div className="d-flex align-items-center">
                      <img 
                        src={emp.image || "https://via.placeholder.com/40"} 
                        alt={emp.name} 
                        className="profile-img-small me-3" 
                        onError={(e)=>{e.target.src="https://via.placeholder.com/40"}} 
                      />
                      <div>
                        <div className="fw-bold text-dark">{emp.name}</div>
                        <div className="small text-muted">ID: {emp.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{emp.gender}</td>
                  <td>{emp.dob}</td>
                  <td>{emp.state}</td>
                  <td>
                    <Form.Check 
                      type="switch"
                      id={`custom-switch-${emp.id}`}
                      label={emp.active ? "Active" : "Inactive"}
                      checked={emp.active}
                      onChange={() => toggleStatus(emp.id)}
                      className={emp.active ? "text-success fw-bold" : "text-muted"}
                    />
                  </td>
                  <td className="text-end pe-3 no-print">
                    <Button 
                      variant="light" 
                      size="sm" 
                      className="text-primary me-2"
                      onClick={() => navigate(`/edit/${emp.id}`)}
                      title="Edit"
                    >
                      <FiEdit2 />
                    </Button>
                    <Button 
                      variant="light" 
                      size="sm" 
                      className="text-danger"
                      onClick={() => handleDeleteClick(emp.id)}
                      title="Delete"
                    >
                      <FiTrash2 />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  No employees found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <ConfirmModal 
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={confirmDelete}
        title="Confirm Deletion"
        body="Are you sure you want to delete this employee?"
      />
    </>
  );
};

export default EmployeeTable;