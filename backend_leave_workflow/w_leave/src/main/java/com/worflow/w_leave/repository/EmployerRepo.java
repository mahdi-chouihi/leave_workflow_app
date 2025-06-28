package com.worflow.w_leave.repository;

import com.worflow.w_leave.model.Employee;
import com.worflow.w_leave.model.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployerRepo extends JpaRepository<Employer, String> {
    Employer findByMatBoss(String matBoss);
}
