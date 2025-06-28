package com.worflow.w_leave.controller;

import com.worflow.w_leave.model.Employee;
import com.worflow.w_leave.model.Employer;
import com.worflow.w_leave.repository.EmployeeRepo;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/employee")
@CrossOrigin( origins = "http://localhost:4200")
public class EmployeeCon {
    @Autowired
    private EmployeeRepo repository;
    @PostMapping("/login")
    public ResponseEntity<Employee> loginUser(@RequestBody Map<String, String> loginRequest){
        String matEmp = loginRequest.get("username");
        String passEmp = loginRequest.get("password");
        Employee emp = repository.findByMatEmp(matEmp);
        System.out.println(emp);
        System.out.println(matEmp);
        System.out.println(passEmp);
        System.out.println(emp.getPassEmp());
        if(emp.getPassEmp().equals(passEmp))

            return ResponseEntity.ok(emp);

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    @PostMapping("/leave-form")
    public ResponseEntity<Employee> UpdateDaysLeftEmployee(@RequestBody Map<String,String> UpdateRequest){
        String matBoss = String.valueOf(UpdateRequest.get("matBoss"));
        System.out.println(matBoss);
        System.out.println(UpdateRequest.get("daysLeft"));
        Employee emp = repository.findByMatEmp(matBoss);
        emp.setDaysLeft(Integer.valueOf(UpdateRequest.get("daysLeft")));
        repository.save(emp);
        return ResponseEntity.ok(emp);

    }
}



