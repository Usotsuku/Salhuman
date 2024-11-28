package com.example.salhuman.security.dto;

import com.example.salhuman.models.Conge;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class congeResReq {
    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String type;
    private Date dateDebut;
    private Date dateFin;
    private String statuts;
    private Conge conge;
    private List<Conge> congeList;
    private List<CongeResponse> congeDataList;
}
