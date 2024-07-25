
// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddEmployeePage from './pages/AddEmployeePage';
import Header from './components/Header';
import Footer from './components/Footer';
import { Employee } from './models/Employee';
import './styles/global.css';
import UpdateEmployeePage from './pages/UpdateEmployeePage';

const App: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);

    const handleAddEmployee = (employee: Employee) => {
        setEmployees([...employees, employee]);
    };

    const handleUpdateEmployee = (updatedEmployee: Employee) => {
        setEmployees(employees.map(employee => 
            employee.id === updatedEmployee.id ? updatedEmployee : employee
        ));
    };

    return (
        <Router>
            <div className="d-flex flex-column min-vh-100">
                <Header />
                <main className="flex-fill">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/add-employee" element={<AddEmployeePage onAddEmployee={handleAddEmployee} />} />
                        <Route path="/update-employee/:id" element={<UpdateEmployeePage onUpdateEmployee={handleUpdateEmployee} />} />
                        {/* Add other routes here */}
                        <Route path="/employees" element={<HomePage />} />
                        <Route path="/about" element={<div>About Page</div>} />
                        <Route path="/contact" element={<div>Contact Page</div>} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
