
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Employee } from '../models/Employee';
import { fetchEmployees, deleteEmployee } from '../api/employeeApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch, faSort } from '@fortawesome/free-solid-svg-icons';
import { formatSalary } from '../utils/utils';

interface EmployeeListProps {
    onEdit: (employee: Employee) => void;
}

const EmployeeList: React.FC<EmployeeListProps> = ({ onEdit }) => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: keyof Employee; direction: 'asc' | 'desc' } | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getEmployees = async () => {
            try {
                const data = await fetchEmployees();
                setEmployees(data);
                setFilteredEmployees(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };
        getEmployees();
    }, []);

    useEffect(() => {
        setFilteredEmployees(
            employees.filter(employee =>
                employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                employee.email.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, employees]);

    const handleDelete = async (id: number) => {
        try {
            await deleteEmployee(id);
            setEmployees(employees.filter(employee => employee.id !== id));
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleEdit = (employee: Employee) => {
        onEdit(employee);
        navigate(`/update-employee/${employee.id}`);
    };

    const handleSort = (key: keyof Employee) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedEmployees = React.useMemo(() => {
        let sortableEmployees = [...filteredEmployees];
        if (sortConfig !== null) {
            sortableEmployees.sort((a, b) => {
                const aKey = a[sortConfig.key]!;
                const bKey = b[sortConfig.key]!;

                if (aKey < bKey) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aKey > bKey) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableEmployees;
    }, [filteredEmployees, sortConfig]);

    return (
        <div className="container">
            <h1>Employee List</h1>
            <div className="input-group mb-3" style={{ maxWidth: '400px' }}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search employees..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th onClick={() => handleSort('id')}>ID <FontAwesomeIcon icon={faSort} /></th>
                        <th onClick={() => handleSort('name')}>Name <FontAwesomeIcon icon={faSort} /></th>
                        <th onClick={() => handleSort('department')}>Department <FontAwesomeIcon icon={faSort} /></th>
                        <th onClick={() => handleSort('salary')}>Salary <FontAwesomeIcon icon={faSort} /></th>
                        <th onClick={() => handleSort('email')}>Email <FontAwesomeIcon icon={faSort} /></th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedEmployees.map(employee => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.department}</td>
                            <td>{formatSalary(employee.salary)}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button onClick={() => handleDelete(employee.id!)} className="btn btn-danger">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <button onClick={() => handleEdit(employee)} className="btn btn-primary ml-2">
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
