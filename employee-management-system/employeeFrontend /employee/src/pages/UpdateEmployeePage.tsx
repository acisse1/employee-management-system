
// src/pages/UpdateEmployeePage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import { Employee } from '../models/Employee';
import { fetchEmployees } from '../api/employeeApi';

interface UpdateEmployeePageProps {
    onUpdateEmployee: (employee: Employee) => void;
}

const UpdateEmployeePage: React.FC<UpdateEmployeePageProps> = ({ onUpdateEmployee }) => {
    const { id } = useParams<{ id: string }>();
    const [employeeToEdit, setEmployeeToEdit] = useState<Employee | undefined>(undefined);

    useEffect(() => {
        const getEmployee = async () => {
            try {
                const employees = await fetchEmployees();
                const employee = employees.find(emp => emp.id === Number(id));
                if (employee) {
                    setEmployeeToEdit(employee);
                }
            } catch (error) {
                console.error('Error fetching employee:', error);
            }
        };
        getEmployee();
    }, [id]);

    const handleUpdate = (updatedEmployee: Employee) => {
        onUpdateEmployee(updatedEmployee);
    };

    return (
        <div className="container">
            <h2>Update Employee</h2>
            {employeeToEdit && (
                <EmployeeForm
                    onSubmit={handleUpdate}
                    employeeToEdit={employeeToEdit}
                    clearEdit={() => {}}
                />
            )}
        </div>
    );
};

export default UpdateEmployeePage;
