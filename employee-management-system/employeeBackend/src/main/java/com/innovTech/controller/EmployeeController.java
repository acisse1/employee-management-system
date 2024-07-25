package com.innovTech.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.innovTech.entity.Employee;
import com.innovTech.service.EmployeeService;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
	
	@Autowired
	private EmployeeService employeeService;
	
	@PostMapping
	public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
		
		Employee savedEmployee = employeeService.createEmployee(employee);
		
		return ResponseEntity.ok(savedEmployee);
	}
	
	@PutMapping("/{employeeId}")
	public ResponseEntity<Employee> updateEmployee(
			@PathVariable Long employeeId,
			@RequestBody Employee employee) {
		
		employee.setId(employeeId);
		
		Employee savedEmployee = employeeService.createEmployee(employee);
		
		return ResponseEntity.ok(savedEmployee);
			
	}
	
	
	@GetMapping
	public ResponseEntity<List<Employee>> retrieveAllEmployees() {
		
		List<Employee> employees = employeeService.retrieveAllEmployees();
		
		return ResponseEntity.ok(employees);
	}
	
	
	@GetMapping("/{employeeId}")
	public ResponseEntity<Employee> retrieveEmployeeById(@PathVariable Long employeeId) {
		
		Employee employee = employeeService.retrieveEmployeeById(employeeId);
		
		return ResponseEntity.ok(employee);
	}
	
	
	@DeleteMapping("/{employeeId}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployeeById(@PathVariable Long employeeId) {
		
		employeeService.deleteEmployeeById(employeeId);
		
		Map<String, Boolean> response = new HashMap<String, Boolean>();
		
		response.put("deleted", Boolean.TRUE);
		
		return ResponseEntity.ok(response);
	}

}
