package com.worflow.w_leave.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "employer")
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Employer {
    @Id
    @Column(name = "mat_boss", nullable = false, length = 9)
    private String matBoss;

    @Column(name = "fname_boss", nullable = false, length = 30)
    private String fnameBoss;

    @Column(name = "lname_boss", nullable = false, length = 30)
    private String lnameBoss;

    @Column(name = "pass_boss", nullable = false, length = 30)
    private String passBoss;

    @Column(name = "days_left")
    private Integer daysLeft;

    public String getMatBoss() {
        return matBoss;
    }

    public void setMatBoss(String matBoss) {
        this.matBoss = matBoss;
    }

    public String getFnameBoss() {
        return fnameBoss;
    }

    public void setFnameBoss(String fnameBoss) {
        this.fnameBoss = fnameBoss;
    }

    public String getLnameBoss() {
        return lnameBoss;
    }

    public void setLnameBoss(String lnameBoss) {
        this.lnameBoss = lnameBoss;
    }

    public String getPassBoss() {
        return passBoss;
    }

    public void setPassBoss(String passBoss) {
        this.passBoss = passBoss;
    }

    public Integer getDaysLeft() {
        return daysLeft;
    }

    public void setDaysLeft(Integer daysLeft) {
        this.daysLeft = daysLeft;
    }

}