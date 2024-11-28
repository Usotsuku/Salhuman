package com.example.salhuman.security.dto;

import com.example.salhuman.models.Conge;
import com.example.salhuman.models.Element_Salaire;
import com.example.salhuman.models.Employe;
import com.example.salhuman.models.Fiche_Paie;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class FichePaieResReq {
    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String periode;
    private float montant_brut;
    private float montant_net;
    private float amo;
    private float cnss;
    private float impotSurRevenu;
    private Employe employe;
    private List<Element_Salaire> Elements_Salaires;
    private FichePaieResponse fiche_paie;
    private List<Fiche_Paie> fichePaieList;
    private List<FichePaieResponse> FichePaieDataList;
}
