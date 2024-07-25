
// src/pages/AddEmployeePage.tsx
import React from 'react';
import EmployeeForm from '../components/EmployeeForm';
import { Employee } from '../models/Employee';

interface AddEmployeePageProps {
    onAddEmployee: (employee: Employee) => void;
}

const AddEmployeePage: React.FC<AddEmployeePageProps> = ({ onAddEmployee }) => {
    return (
        <div className="container">
            <h2>Add Employee</h2>
            <EmployeeForm onSubmit={onAddEmployee} clearEdit={() => {}} />
        </div>
    );
};

export default AddEmployeePage;
