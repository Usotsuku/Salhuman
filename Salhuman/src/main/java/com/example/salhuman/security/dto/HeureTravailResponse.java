package com.example.salhuman.security.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Date;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class HeureTravailResponse {
    private Long HeureId;
    private Date date;
    private String startTime;
    private String endTime;
    private int regularHours;
    private int overtimeHours;
    private int totalHours;
    private String nom;
    private String prenom;
    private Date date_embauche;
}
