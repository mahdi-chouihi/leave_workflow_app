package com.worflow.w_leave.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "w_leave")
public class WLeave {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "mat_emp", nullable = false, length = 9)
    private String matEmp;

    @Column(name = "mat_boss", length = 9)
    private String matBoss;

    @Column(name = "fname_emp", nullable = false, length = 30)
    private String fnameEmp;

    @Column(name = "lname_emp", nullable = false, length = 30)
    private String lnameEmp;

    @Column(name = "creation_date")
    private LocalDateTime creationDate;

    @Column(name = "start_leave")
    private LocalDate startLeave;

    @Column(name = "end_leave")
    private LocalDate endLeave;

    @Column(name = "leave_status", nullable = false, length = 30)
    private String leaveStatus;

    @Column(name = "days_left")
    private Integer daysLeft;



    public String getMatBoss() {
        return matBoss;
    }

    public void setMatBoss(String matBoss) {
        this.matBoss = matBoss;
    }

    public String getMatEmp() {
        return matEmp;
    }

    public void setMatEmp(String matEmp) {
        this.matEmp = matEmp;
    }

    public String getFnameEmp() {
        return fnameEmp;
    }

    public void setFnameEmp(String fnameEmp) {
        this.fnameEmp = fnameEmp;
    }

    public String getLnameEmp() {
        return lnameEmp;
    }

    public void setLnameEmp(String lnameEmp) {
        this.lnameEmp = lnameEmp;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getStartLeave() {
        return startLeave;
    }

    public void setStartLeave(LocalDate startLeave) {
        this.startLeave = startLeave;
    }

    public LocalDate getEndLeave() {
        return endLeave;
    }

    public void setEndLeave(LocalDate endLeave) {
        this.endLeave = endLeave;
    }

    public String getLeaveStatus() {
        return leaveStatus;
    }

    public void setLeaveStatus(String leaveStatus) {
        this.leaveStatus = leaveStatus;
    }

    public Integer getDaysLeft() {
        return daysLeft;
    }

    public void setDaysLeft(Integer daysLeft) {
        this.daysLeft = daysLeft;
    }

}