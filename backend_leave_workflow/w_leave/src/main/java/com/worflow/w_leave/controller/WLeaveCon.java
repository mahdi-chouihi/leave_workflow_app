package com.worflow.w_leave.controller;

import com.worflow.w_leave.model.Employee;
import com.worflow.w_leave.model.Employer;
import com.worflow.w_leave.model.WLeave;

import com.worflow.w_leave.repository.WLeaveRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/WLeave")
@CrossOrigin( origins = "http://localhost:4200")
public class WLeaveCon {
    @Autowired
    private WLeaveRepo repository;

    @PostMapping("/leave-form")
    public ResponseEntity<WLeave> insertWLeave(@RequestBody WLeave wleave){
        wleave=repository.save(wleave);
        System.out.println(wleave);
        System.out.println(wleave.getEndLeave());
        System.out.println(wleave.getLeaveStatus());
        System.out.println(wleave.getStartLeave());
        System.out.println(wleave.getCreationDate());
        System.out.println(wleave.getDaysLeft());
        System.out.println(wleave.getFnameEmp());
        System.out.println(wleave.getLnameEmp());
        System.out.println(wleave.getMatEmp());
        System.out.println(wleave.getMatBoss());
        return ResponseEntity.ok(wleave);
    }
    @PostMapping("/fetch")
    public ResponseEntity<List<WLeave>> getWLeaveEmp(@RequestBody String mat) {
        List<WLeave> wl = repository.findByMatEmp(mat);
        return ResponseEntity.ok(wl);
    }
    @PostMapping("/status-check")
    public ResponseEntity<WLeave> getStatus(@RequestBody String mat) {
        WLeave wl = repository.findTopByMatEmpOrderByDaysLeftAsc(mat);
        return ResponseEntity.ok(wl);
    }
    @PostMapping("/update-pending")
    public ResponseEntity<WLeave> getStatusAndDelete(@RequestBody String mat) {
        WLeave wl = repository.findTopByMatEmpOrderByDaysLeftAsc(mat);
        if (wl != null) {
            repository.delete(wl);
        }
        return ResponseEntity.ok(wl);
    }

    @PostMapping("/notification")
    public ResponseEntity<List<WLeave>> getPending(@RequestBody String mat) {
        List<WLeave> wl  = repository.findByMatBossAndLeaveStatus(mat, "pending");

        return ResponseEntity.ok(wl);
    }
    @PostMapping("/notifcard")
    public ResponseEntity<WLeave> updatePending(@RequestBody Map<String, String> sth) {
        String matEmp = sth.get("matEmp");
        String matBoss = sth.get("matBoss");
        String leaveStatus = sth.get("leaveStatus");
        String daysLeft =sth.get("daysLeft");
        WLeave wl  = repository.findByMatBossAndMatEmpAndLeaveStatus(matBoss, matEmp,"pending");

        wl.setDaysLeft(Integer.parseInt(daysLeft));
        wl.setLeaveStatus(leaveStatus);
        repository.save(wl);
        return ResponseEntity.ok(wl);
    }

}

