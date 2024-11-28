package com.example.salhuman.controllers;

import com.example.salhuman.models.Employe;
import com.example.salhuman.models.Heure_Travaille;
import com.example.salhuman.security.dto.HeureTravailResponse;
import com.example.salhuman.security.dto.HeureTravailleresreq;
import com.example.salhuman.security.entities.User;
import com.example.salhuman.security.repositories.UserRepository;
import com.example.salhuman.services.HeureTravailleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class HeureTravailleController {
    @Autowired
    private HeureTravailleService heureTravailleService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<Heure_Travaille> addHeureTravaillee(@RequestBody HeureTravailleresreq heureTravailleDto, Principal principal) {
        Optional<User> currentUser = userRepository.findByEmail(principal.getName());
        Employe currentEmploye = currentUser.get().getEmploye();

        Heure_Travaille heureTravaille = new Heure_Travaille();
        heureTravaille.setDate(heureTravailleDto.getDate());
        heureTravaille.setType(heureTravailleDto.getType());
        heureTravaille.setNb_heures(heureTravailleDto.getNb_heures());
        heureTravaille.setStatut(heureTravailleDto.getStatut());
        heureTravaille.setEmploye(currentEmploye);

        Heure_Travaille savedHeure = heureTravailleService.saveHeureTravaille(heureTravaille);
        return new ResponseEntity<>(savedHeure, HttpStatus.CREATED);
    }


    @GetMapping("hoursworked/{employeId}/currentMonth")
    public ResponseEntity<List<HeureTravailResponse>> getCurrentMonthHoursWorkedByEmployee(
            @PathVariable Long employeId) {

        List<HeureTravailResponse> response = heureTravailleService.getCurrentMonthHoursWorkedByEmployee(employeId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

/*
@GetMapping("employe/workhours/{employeId}")
    public ResponseEntity<List<Heure_Travaille>> getHeuresByEmploye(@PathVariable Long employeId) {
        List<Heure_Travaille> heures = heureTravailleService.getHeuresByEmploye(employeId);
        return new ResponseEntity<>(heures, HttpStatus.OK);
    }

    @GetMapping("workhours/{employeId}/week")
    public ResponseEntity<List<Heure_Travaille>> getHeuresByEmployeAndWeek(@PathVariable Long employeId) {
        LocalDate now = LocalDate.now();
        LocalDate monday = now.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate friday = now.with(TemporalAdjusters.nextOrSame(DayOfWeek.FRIDAY));
        List<Heure_Travaille> heures = heureTravailleService.getHeuresByEmployeAndDateRange(employeId,
                Date.from(monday.atStartOfDay(ZoneId.systemDefault()).toInstant()),
                Date.from(friday.atStartOfDay(ZoneId.systemDefault()).toInstant()));
        return new ResponseEntity<>(heures, HttpStatus.OK);
    }

    @GetMapping("workhours/{employeId}/month")
    public ResponseEntity<List<Heure_Travaille>> getHeuresByEmployeAndMonth(@PathVariable Long employeId) {
        LocalDate now = LocalDate.now();
        LocalDate firstDayOfMonth = now.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate lastDayOfMonth = now.with(TemporalAdjusters.lastDayOfMonth());
        List<Heure_Travaille> heures = heureTravailleService.getHeuresByEmployeAndDateRange(employeId,
                Date.from(firstDayOfMonth.atStartOfDay(ZoneId.systemDefault()).toInstant()),
                Date.from(lastDayOfMonth.atStartOfDay(ZoneId.systemDefault()).toInstant()));
        return new ResponseEntity<>(heures, HttpStatus.OK);
    }
 */