import React, { createContext, useState, useContext, useEffect } from 'react';

const EmployeeContext = createContext();

export const useEmployees = () => useContext(EmployeeContext);

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('employees');
    if (storedData) {
      setEmployees(JSON.parse(storedData));
    } else {
      const initialData = [
        { id: 1, name: "Kiran", gender: "Male", dob: "1990-05-15", state: "Telangan", active: true, image: "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff" },
        { id: 2, name: "Anil", gender: "Female", dob: "1992-08-22", state: "Andhra Pradesh", active: true, image: "https://ui-avatars.com/api/?name=Jane+Smith&background=random" },
        { id: 3, name: "Ram", gender: "Male", dob: "1985-11-30", state: "Kerala", active: false, image: "https://ui-avatars.com/api/?name=Robert+Brown&background=random" }
      ];
      setEmployees(initialData);
      localStorage.setItem('employees', JSON.stringify(initialData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (employee) => {
    const newEmployee = { ...employee, id: Date.now() }; 
    setEmployees([...employees, newEmployee]);
  };

  const editEmployee = (updatedEmployee) => {
    setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const toggleStatus = (id) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, active: !emp.active } : emp
    ));
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, editEmployee, deleteEmployee, toggleStatus }}>
      {children}
    </EmployeeContext.Provider>
  );
};
