package com.example.salhuman.security.dto;

import lombok.Data;

import java.util.Date;

@Data
public class CongeResponse {
    private Long congeId;
    private String type;
    private Date dateDebut;
    private Date dateFin;
    private String statuts;
    private String nom;
    private String prenom;
}
