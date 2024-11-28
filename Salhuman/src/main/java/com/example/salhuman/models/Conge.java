package com.example.salhuman.models;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
@Setter
@Getter
@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Conge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long congeId;
    private String type;
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dateDebut;
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date dateFin;
    private String statuts;
    @ManyToOne
    private Employe employe;

}
