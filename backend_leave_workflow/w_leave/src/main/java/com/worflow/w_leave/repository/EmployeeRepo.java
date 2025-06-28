package com.worflow.w_leave.repository;

import com.worflow.w_leave.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, String> {
    Employee findByMatEmp(String matEmp);

    Employee findByMatEmpOrderByDaysLeftAsc(String matBoss);
}
