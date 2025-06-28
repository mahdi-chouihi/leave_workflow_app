package com.worflow.w_leave.repository;


import com.worflow.w_leave.model.WLeave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WLeaveRepo extends JpaRepository<WLeave, Integer> {
     WLeave save(WLeave wleave);
     List<WLeave> findByMatEmp(String matEmp);
     WLeave findTopByMatEmpOrderByDaysLeftAsc(String matEmp);


     List<WLeave> findByMatBossAndLeaveStatus(String mat, String pending);

    WLeave findByMatBossAndMatEmp(String matBoss, String matEmp);

    WLeave findByMatBossAndMatEmpOrderByDaysLeftAsc(String matBoss, String matEmp);

    WLeave findByMatBossAndMatEmpAndLeaveStatus(String matBoss, String matEmp, String pending);
}
