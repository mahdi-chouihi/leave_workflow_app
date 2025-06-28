package com.worflow.w_leave.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "employee")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Employee {
    @Id
    @Column(name = "mat_emp", nullable = false, length = 9)
    private String matEmp;

    @Column(name = "fname_emp", nullable = false, length = 30)
    private String fnameEmp;

    @Column(name = "lname_emp", nullable = false, length = 30)
    private String lnameEmp;

    @Column(name = "pass_emp", nullable = false, length = 30)
    private String passEmp;


    @JoinColumn(name = "mat_boss", nullable = false)
    private String matBoss;

    @Column(name = "days_left")
    private Integer daysLeft;

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

    public String getPassEmp() {
        return passEmp;
    }

    public void setPassEmp(String passEmp) {
        this.passEmp = passEmp;
    }

    public String getMatBoss() {
        return matBoss;
    }

    public void setMatBoss(String matBoss) {
        this.matBoss = matBoss;
    }

    public Integer getDaysLeft() {
        return daysLeft;
    }

    public void setDaysLeft(Integer daysLeft) {
        this.daysLeft = daysLeft;
    }

}