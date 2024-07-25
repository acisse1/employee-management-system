
import React, { useState, useEffect } from 'react';
import { Employee } from '../models/Employee';
import { createEmployee, updateEmployee } from '../api/employeeApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faBriefcase, faDollarSign } from '@fortawesome/free-solid-svg-icons';

interface EmployeeFormProps {
    onSubmit: (employee: Employee) => void;
    employeeToEdit?: Employee;
    clearEdit: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSubmit, employeeToEdit, clearEdit }) => {
    const [name, setName] = useState<string>('');
    const [department, setDepartment] = useState<string>('');
    const [salary, setSalary] = useState<number>(0);
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        if (employeeToEdit) {
            setName(employeeToEdit.name);
            setDepartment(employeeToEdit.department);
            setSalary(employeeToEdit.salary);
            setEmail(employeeToEdit.email);
        }
    }, [employeeToEdit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const employee: Employee = { name, department, salary, email };
        try {
            if (employeeToEdit && employeeToEdit.id !== undefined) {
                const updatedEmployee = await updateEmployee(employeeToEdit.id, employee);
                onSubmit(updatedEmployee);
                clearEdit();
            } else {
                const newEmployee = await createEmployee(employee);
                onSubmit(newEmployee);
            }
        } catch (error) {
            console.error('Error saving employee:', error);
        }
        setName('');
        setDepartment('');
        setSalary(0);
        setEmail('');
    };

    return (
        <div className="container">
            <h2>{employeeToEdit ? 'Edit' : 'Add'} Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ maxWidth: '400px' }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Department</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><FontAwesomeIcon icon={faBriefcase} /></span>
                        </div>
                        <input
                            type="text"
                            className="form-control"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            style={{ maxWidth: '400px' }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Salary</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><FontAwesomeIcon icon={faDollarSign} /></span>
                        </div>
                        <input
                            type="number"
                            className="form-control"
                            value={salary}
                            onChange={(e) => setSalary(Number(e.target.value))}
                            style={{ maxWidth: '400px' }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></span>
                        </div>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ maxWidth: '400px' }}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
                {employeeToEdit && (
                    <button type="button" className="btn btn-secondary ml-2" onClick={clearEdit}>
                        Cancel
                    </button>
                )}
            </form>
        </div>
    );
};

export default EmployeeForm;
