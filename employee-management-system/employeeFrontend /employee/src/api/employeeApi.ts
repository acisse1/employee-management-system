
// src/api/employeeApi.ts
import { Employee } from '../models/Employee';

const API_URL = 'http://localhost:8080/employee';

export const fetchEmployees = async (): Promise<Employee[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch employees');
    }
    return await response.json();
};

export const createEmployee = async (employee: Employee): Promise<Employee> => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
    });
    if (!response.ok) {
        throw new Error('Failed to create employee');
    }
    return await response.json();
};

// Add more API methods (updateEmployee, deleteEmployee) as needed

export const updateEmployee = async (id: number, employee: Employee): Promise<Employee> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(employee),
    });
    if (!response.ok) {
        throw new Error('Failed to update employee');
    }
    return await response.json();
};

export const deleteEmployee = async (id: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete employee');
    }
};
