package com.example.salhuman.controllers;

import com.example.salhuman.security.dto.FichePaieResReq;
import com.example.salhuman.security.dto.FichePaieResponse;
import com.example.salhuman.services.Fiche_PaieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/fiche_paie")
public class FichePaieController {

    @Autowired
    private Fiche_PaieService fichePaieService;

    @GetMapping("/employe/{employeId}")
    public ResponseEntity<FichePaieResReq> getAllFichePaieByEmploye(@PathVariable Long employeId) {
        return ResponseEntity.ok(fichePaieService.getAllFichePaieByEmploye(employeId));
    }

    @GetMapping("/employe/{employeId}/periode/{periode}")
    public ResponseEntity<FichePaieResReq> getFichePaieByMonth(@PathVariable Long employeId, @PathVariable String periode) {
        return ResponseEntity.ok(fichePaieService.getFichePaieByMonth(employeId, periode));
    }

    @GetMapping("/all")
    public ResponseEntity<FichePaieResReq> getAllFichePaies() {
        return ResponseEntity.ok(fichePaieService.getAllFichePaies());
    }

    @GetMapping("/fiche/{ficheId}")
    public ResponseEntity<FichePaieResReq> getFichePaieById(@PathVariable long ficheId) {
        return ResponseEntity.ok(fichePaieService.getFichePaieById(ficheId));
    }

    @GetMapping("/periode/{periode}")
    public ResponseEntity<FichePaieResReq> getAllFichePaieByPeriode(@PathVariable String periode) {
        return ResponseEntity.ok(fichePaieService.getAllFichePaieByPeriode(periode));
    }
}

