
// src/pages/HomePage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';
import { Employee } from '../models/Employee';

const HomePage: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [employeeToEdit, setEmployeeToEdit] = useState<Employee | undefined>(undefined);

    const handleAddEmployee = (employee: Employee) => {
        setEmployees([...employees, employee]);
    };

    const handleEditEmployee = (employee: Employee) => {
        setEmployeeToEdit(employee);
    };

    const clearEdit = () => {
        setEmployeeToEdit(undefined);
    };

    return (
        <div className="container">
            <EmployeeList onEdit={handleEditEmployee} />
            <div className="mt-3">
                <Link to="/add-employee" className="btn btn-primary">
                    Add Employee
                </Link>
            </div>
            {employeeToEdit && (
                <div className="mt-3">
                    <EmployeeForm
                        onSubmit={handleAddEmployee}
                        employeeToEdit={employeeToEdit}
                        clearEdit={clearEdit}
                    />
                </div>
            )}
        </div>
    );
};

export default HomePage;
