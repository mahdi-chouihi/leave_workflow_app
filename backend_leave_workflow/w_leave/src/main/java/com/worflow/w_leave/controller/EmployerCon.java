
package com.worflow.w_leave.controller;
import com.worflow.w_leave.model.Employer;
import com.worflow.w_leave.repository.EmployerRepo;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/employer")
@CrossOrigin( origins = "http://localhost:4200")
public class EmployerCon {
    @Autowired
    private EmployerRepo repository;
    @PostMapping("/login")
    public ResponseEntity<Employer> loginUser(@RequestBody Map<String, String> loginRequest){
        String matBoss = loginRequest.get("username");
        String passEmp = loginRequest.get("password");
        Employer empr = repository.findByMatBoss(matBoss);
        System.out.println(empr);
        System.out.println(matBoss);
        System.out.println(passEmp);
        System.out.println(empr.getPassBoss());
        if(empr.getPassBoss().equals(passEmp))

            return ResponseEntity.ok(empr);

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    @PostMapping("/leave-form")
    public ResponseEntity<Employer> UpdateDaysLeftEmployer(@RequestBody Map<String,String> UpdateRequest){
        String matBoss = String.valueOf(UpdateRequest.get("matBoss"));

        Employer empr = repository.findByMatBoss(matBoss);
           empr.setDaysLeft(Integer.valueOf(UpdateRequest.get("daysLeft")));
           repository.save(empr);
            return ResponseEntity.ok(empr);

    }

}



