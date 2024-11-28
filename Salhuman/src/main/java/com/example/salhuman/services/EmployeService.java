package com.example.salhuman.services;

import com.example.salhuman.models.Conge;
import com.example.salhuman.models.Employe;
import com.example.salhuman.models.Fiche_Paie;
import com.example.salhuman.models.Heure_Travaille;
import com.example.salhuman.repositories.CongeRepository;
import com.example.salhuman.repositories.EmployeRepository;
import com.example.salhuman.repositories.HeureTravailleRepository;
import com.example.salhuman.security.dto.EmployeeResponse;
import com.example.salhuman.security.dto.ReqRes;
import com.example.salhuman.security.dto.employeReqRes;
import com.example.salhuman.security.entities.User;
import com.example.salhuman.security.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeService {
    @Autowired
    private EmployeRepository employeRepository;
    @Autowired
    CongeRepository congeRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserRepository userRepository;

    public employeReqRes saveEmploye(employeReqRes employeReqRes){
        employeReqRes resp = new employeReqRes();

        try {
            Employe employe = new Employe();
            employe.setNom(employeReqRes.getNom());
            employe.setPrenom(employeReqRes.getPrenom());
            employe.setDate_embauche(employeReqRes.getDate_embauche());
            employe.setDepartement(employeReqRes.getDepartement());
            employe.setSalaire(employeReqRes.getSalaire());
            employe.setPoste(employeReqRes.getPoste());
            Employe employeResult = employeRepository.save(employe);
            if (employeResult.getEmployeId()>0) {

                User user = new User();
                user.setEmail(employeResult.getNom() + "@gmail.com");
                user.setName(employeResult.getNom());
                user.setPassword(passwordEncoder.encode("123"));
                user.setRole("USER");
                user.setEmploye(employeResult);
                userRepository.save(user);

                employeResult.setUser(user);
                employeRepository.save(employeResult);

                resp.setEmploye((employeResult));
                resp.setMessage("User Saved Successfully");
                resp.setStatusCode(200);
            }

        }catch (Exception e){
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }


    public employeReqRes updateEmploye(long employeId , Employe updatedEmploye) {
        employeReqRes reqRes = new employeReqRes();
        try {
            Optional<Employe> employeOptional = employeRepository.findById(employeId);
            if (employeOptional.isPresent()) {
                Employe existingEmploye = employeOptional.get();
                existingEmploye.setNom(updatedEmploye.getNom());
                existingEmploye.setPrenom(updatedEmploye.getPrenom());
                existingEmploye.setDate_embauche(updatedEmploye.getDate_embauche());
                existingEmploye.setDepartement(updatedEmploye.getDepartement());
                existingEmploye.setSalaire(updatedEmploye.getSalaire());
                existingEmploye.setPoste(updatedEmploye.getPoste());
                User user = userRepository.findByname(updatedEmploye.getNom());
                existingEmploye.setUser(user);


                Employe employeSaved = employeRepository.save(existingEmploye);
                reqRes.setEmploye(employeSaved);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Employee updated successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("Employee not found for update");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while updating Employee: " + e.getMessage());
        }
        return reqRes;
    }

    public Employe getEmploye(Long id) {
        return employeRepository.findById(id).get();
    }


    public employeReqRes getAllEmployes() {

        employeReqRes resp = new employeReqRes();

        try {
            List<Employe> result = employeRepository.findAll();
            if (!result.isEmpty()) {
                List<EmployeeResponse> employeeResponses = result.stream()
                        .map(employe -> {
                            EmployeeResponse dto = new EmployeeResponse();
                            dto.setEmployeId(employe.getEmployeId());
                            dto.setNom(employe.getNom());
                            dto.setPrenom(employe.getPrenom());
                            dto.setDepartement(employe.getDepartement());
                            dto.setPoste(employe.getPoste());
                            dto.setSalaire(employe.getSalaire());
                            dto.setDate_embauche(employe.getDate_embauche());
                            return dto;
                        }).collect(Collectors.toList());

                resp.setEmployeDataList(employeeResponses);
                resp.setStatusCode(200);
                resp.setMessage("Successful");
            } else {
                resp.setStatusCode(404);
                resp.setMessage("No Employees found");
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setMessage("Error occurred: " + e.getMessage());
        }

        return resp;
    }


    @Transactional
    public void deleteEmployeById(Long id) {
        Optional<Employe> optionalEmploye = employeRepository.findById(id);
        optionalEmploye.ifPresent(employe -> {
            User user = employe.getUser();
            if (user != null) {
                userRepository.delete(user);
            }
            employeRepository.delete(employe);
        });
    }


    public void deleteAllEmployes() {
        employeRepository.deleteAll();
    }


    public employeReqRes getEmployeById(long id) {
        employeReqRes resp = new employeReqRes();

        try {
            Employe employeById = employeRepository.findById(id).orElseThrow(() -> new RuntimeException("Employe Not found"));
            resp.setEmploye(employeById);
            resp.setStatusCode(200);
            resp.setMessage("Users with id '" + id + "' found successfully");
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setMessage("Error occurred: " + e.getMessage());
        }
        return resp;
    }



    public Fiche_Paie getLatestfichpaie(Employe employe) {

        List<Fiche_Paie> fiches = employe.getFiches();
        if (fiches.isEmpty()) {
            return null; // No payslips available
        }

        // Sort the list of payslips by date in descending order
        fiches.sort(Comparator.comparing(Fiche_Paie::getPeriode).reversed());

        // Return the first (most recent) payslip
        return fiches.get(0);
    }



}