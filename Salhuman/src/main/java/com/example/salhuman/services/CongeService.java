package com.example.salhuman.services;

import com.example.salhuman.models.Conge;
import com.example.salhuman.models.Employe;
import com.example.salhuman.repositories.CongeRepository;
import com.example.salhuman.security.dto.CongeResponse;
import com.example.salhuman.security.dto.EmployeeResponse;
import com.example.salhuman.security.dto.congeResReq;
import com.example.salhuman.security.dto.employeReqRes;
import com.example.salhuman.security.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CongeService {
    @Autowired
    private CongeRepository congeRepository;

    public congeResReq saveConge(congeResReq resReq , Employe employe){
        congeResReq resp = new congeResReq();

        try {
            Conge conge = new Conge();
            conge.setType(resReq.getType());
            conge.setDateDebut(resReq.getDateDebut());
            conge.setDateFin(resReq.getDateFin());
            conge.setStatuts("PENDING");
            conge.setEmploye(employe);
            Conge congeResult = congeRepository.save(conge);
            if (congeResult.getCongeId()>0) {

                resp.setConge((congeResult));
                resp.setMessage("User Saved Successfully");
                resp.setStatusCode(200);
            }

        }catch (Exception e){
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    public congeResReq approuverConge(long congeId) {
        congeResReq reqRes = new congeResReq();
        try {
            Optional<Conge> congeOptional = congeRepository.findById(congeId);
            if (congeOptional.isPresent()) {
                Conge existingConge = congeOptional.get();
                existingConge.setStatuts("Approved");

                Conge congeSaved = congeRepository.save(existingConge);
                reqRes.setConge(congeSaved);
                reqRes.setStatusCode(200);
                reqRes.setMessage("Conge approved successfully");
            } else {
                reqRes.setStatusCode(404);
                reqRes.setMessage("Conge not found for update");
            }
        } catch (Exception e) {
            reqRes.setStatusCode(500);
            reqRes.setMessage("Error occurred while updating Conge: " + e.getMessage());
            e.printStackTrace(); // Optional: Log the error for debugging
        }
        return reqRes;
    }

    public congeResReq getAllEmployeConges(Employe employe) {

        congeResReq resp = new congeResReq();

        try {
            List<Conge> result = congeRepository.findByEmploye(employe);
            if (!result.isEmpty()) {
                List<CongeResponse> congeResponse = result.stream()
                        .map(conge -> {
                            CongeResponse dto = new CongeResponse();
                            dto.setCongeId(conge.getCongeId());
                            dto.setType(conge.getType());
                            dto.setStatuts(conge.getStatuts());
                            dto.setDateDebut(conge.getDateDebut());
                            dto.setDateFin(conge.getDateFin());
                            return dto;
                        }).collect(Collectors.toList());

                resp.setCongeDataList(congeResponse);
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

    public congeResReq getAllConges() {

        congeResReq resp = new congeResReq();

        try {
            List<Conge> result = congeRepository.findAll();
            if (!result.isEmpty()) {
                List<CongeResponse> congeResponse = result.stream()
                        .map(conge -> {
                            CongeResponse dto = new CongeResponse();
                            dto.setCongeId(conge.getCongeId());
                            dto.setType(conge.getType());
                            dto.setStatuts(conge.getStatuts());
                            dto.setDateDebut(conge.getDateDebut());
                            dto.setDateFin(conge.getDateFin());
                            dto.setNom(conge.getEmploye().getNom());
                            dto.setPrenom(conge.getEmploye().getPrenom());
                            return dto;
                        }).collect(Collectors.toList());

                resp.setCongeDataList(congeResponse);
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
}
