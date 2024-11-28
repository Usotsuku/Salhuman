package com.example.salhuman.security.dto;

import com.example.salhuman.models.Element_Salaire;
import com.example.salhuman.models.Employe;
import com.example.salhuman.models.Fiche_Paie;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class FichePaieResponse {
    private Long FicheId;
    private String periode;
    private float montant_brut;
    private float montant_net;
    private float amo;
    private float cnss;
    private float impotSurRevenu;
    private Long employeId;
    private String nom;
    private String prenom;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date_embauche;
    private List<ElementSalaireResponse> Elements_Salaires;
    private List<FichePaieResponse> FichePaieDataList;
}
