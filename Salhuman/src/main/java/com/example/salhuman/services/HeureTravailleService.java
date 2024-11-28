package com.example.salhuman.services;

import com.example.salhuman.models.Employe;
import com.example.salhuman.models.Heure_Travaille;
import com.example.salhuman.repositories.EmployeRepository;
import com.example.salhuman.repositories.HeureTravailleRepository;
import com.example.salhuman.security.dto.HeureTravailResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class HeureTravailleService {

    @Autowired
    private HeureTravailleRepository heureTravailleRepository;

    @Autowired
    private EmployeRepository employeRepository;

    public Heure_Travaille saveHeureTravaille(Heure_Travaille heureTravaille) {
        return heureTravailleRepository.save(heureTravaille);
    }

    public List<Heure_Travaille> getHeuresByEmployeAndDateRange(Long employeId, Date startDate, Date endDate) {
        return heureTravailleRepository.findByEmployeIdAndDateBetween(employeId, startDate, endDate);
    }

    public List<HeureTravailResponse> getCurrentMonthHoursWorkedByEmployee(Long employeId) {
        Date startDate = getStartOfMonth();
        Date endDate = getEndOfMonth();

        System.out.println("Fetching hours worked for employeId: " + employeId);
        System.out.println("Date range: " + startDate + " to " + endDate);

        List<Heure_Travaille> hoursWorked = heureTravailleRepository.findByEmployeIdAndDateRange(employeId, startDate, endDate);

        System.out.println("Fetched hours worked data: " + hoursWorked);
        return hoursWorked.stream()
                .map(this::mapToHeureTravailResponse)
                .collect(Collectors.toList());
    }

    private Date getStartOfMonth() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar.getTime();
    }

    private Date getEndOfMonth() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);
        return calendar.getTime();
    }

    private HeureTravailResponse mapToHeureTravailResponse(Heure_Travaille heureTravaille) {
        HeureTravailResponse response = new HeureTravailResponse();
        response.setDate(heureTravaille.getDate());
        response.setStartTime("08:30");
        response.setEndTime("17:30");
        response.setHeureId(heureTravaille.getHeureId());
        response.setNom(heureTravaille.getEmploye().getNom());
        response.setPrenom(heureTravaille.getEmploye().getPrenom());
        response.setDate_embauche(heureTravaille.getEmploye().getDate_embauche());
        response.setRegularHours(Math.min(heureTravaille.getNb_heures(), 8));
        response.setOvertimeHours(Math.max(heureTravaille.getNb_heures() - 8, 0));
        response.setTotalHours(heureTravaille.getNb_heures());
        return response;
    }
    public List<Heure_Travaille> getHeuresByEmploye(Long employeId) {
        Optional<Employe> employe = employeRepository.findById(employeId);;
        return heureTravailleRepository.findByEmploye(employe);
    }
}