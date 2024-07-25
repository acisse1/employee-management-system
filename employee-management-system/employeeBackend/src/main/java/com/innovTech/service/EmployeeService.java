package com.innovTech.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.innovTech.entity.Employee;
import com.innovTech.repository.EmployeeRepository;

@Service
public class EmployeeService {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	

	public Employee createEmployee(Employee employee) {

		return employeeRepository.save(employee);
	}


	public List<Employee> retrieveAllEmployees() {

		return employeeRepository.findAll();
	}


	public Employee retrieveEmployeeById(Long employeeId) {

		return employeeRepository.findById(employeeId).orElseThrow(
				() -> new NoSuchElementException(
						"Employee with ID " + employeeId + " was not found")
				);
	}


	public void deleteEmployeeById(Long employeeId) {

		employeeRepository.deleteById(employeeId);
	}

}
