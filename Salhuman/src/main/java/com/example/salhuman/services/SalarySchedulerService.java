package com.example.salhuman.services;

import com.example.salhuman.models.Employe;
import com.example.salhuman.models.Fiche_Paie;
import com.example.salhuman.repositories.EmployeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalarySchedulerService {

    @Autowired
    private Fiche_PaieService fichePaieService;

    @Autowired
    private EmployeRepository employeRepository;

    @Scheduled(cron = "0 0 0 1 * ?")
    public void calculateMonthlySalaries() {
        List<Employe> employees = employeRepository.findAll();
        for (Employe employe : employees) {
            fichePaieService.CalculerSalaire(employe);
        }
    }
}