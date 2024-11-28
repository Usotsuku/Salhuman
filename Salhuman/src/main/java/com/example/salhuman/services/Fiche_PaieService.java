package com.example.salhuman.services;

import com.example.salhuman.models.Element_Salaire;
import com.example.salhuman.models.Employe;
import com.example.salhuman.models.Fiche_Paie;
import com.example.salhuman.models.Heure_Travaille;
import com.example.salhuman.repositories.Fiche_PaieRepository;
import com.example.salhuman.security.dto.ElementSalaireResponse;
import com.example.salhuman.security.dto.FichePaieResReq;
import com.example.salhuman.security.dto.FichePaieResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class Fiche_PaieService {

    @Autowired
    private Fiche_PaieRepository fichePaieRepository;

    public FichePaieResReq getAllFichePaies() {
        FichePaieResReq resp = new FichePaieResReq();

        try {
            List<Fiche_Paie> result = fichePaieRepository.findAll();
            if (!result.isEmpty()) {
                List<FichePaieResponse> fichePaieResponses = result.stream()
                        .map(fiche -> mapToFichePaieResponse(fiche))
                        .collect(Collectors.toList());

                resp.setFichePaieDataList(fichePaieResponses);
                resp.setStatusCode(200);
                resp.setMessage("Successful");
            } else {
                resp.setStatusCode(404);
                resp.setMessage("No Fiche de Paie found");
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setMessage("Error occurred: " + e.getMessage());
        }

        return resp;
    }

    private FichePaieResponse mapToFichePaieResponse(Fiche_Paie fiche) {
        FichePaieResponse dto = new FichePaieResponse();
        dto.setFicheId(fiche.getFicheId());
        dto.setPeriode(fiche.getPeriode());
        dto.setMontant_brut(fiche.getMontant_brut());
        dto.setMontant_net(fiche.getMontant_net());
        dto.setAmo(fiche.getAmo());
        dto.setCnss(fiche.getCnss());
        dto.setImpotSurRevenu(fiche.getImpotSurRevenu());
        dto.setEmployeId(fiche.getEmploye().getEmployeId());
        dto.setNom(fiche.getEmploye().getNom());
        dto.setPrenom(fiche.getEmploye().getPrenom());
        dto.setDate_embauche(fiche.getEmploye().getDate_embauche());
        dto.setElements_Salaires(mapToElementSalaireResponses(fiche.getElements_Salaires()));
        return dto;
    }

    private List<ElementSalaireResponse> mapToElementSalaireResponses(List<Element_Salaire> elementsSalaires) {
        return elementsSalaires.stream()
                .map(element -> {
                    ElementSalaireResponse elementResponse = new ElementSalaireResponse();
                    elementResponse.setElementSalaireId(element.getElementId());
                    elementResponse.setType(element.getType());
                    elementResponse.setMontant(element.getMontant());
                    return elementResponse;
                }).collect(Collectors.toList());
    }

    public FichePaieResReq getAllFichePaieByPeriode(String periode) {
        FichePaieResReq resp = new FichePaieResReq();

        try {
            List<Fiche_Paie> result = fichePaieRepository.findAllByPeriode(periode);
            if (!result.isEmpty()) {
                List<FichePaieResponse> fichePaieResponses = result.stream()
                        .map(this::mapToFichePaieResponse)
                        .collect(Collectors.toList());

                resp.setFichePaieDataList(fichePaieResponses);
                resp.setStatusCode(200);
                resp.setMessage("Successful");
            } else {
                resp.setStatusCode(404);
                resp.setMessage("No Fiche de Paie found for periode: " + periode);
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setMessage("Error occurred: " + e.getMessage());
        }

        return resp;
    }

    public FichePaieResReq getFichePaieById(long id) {
        FichePaieResReq resp = new FichePaieResReq();

        try {
            Fiche_Paie fichePaieById = fichePaieRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Fiche de Paie Not found"));

            resp.setFiche_paie(mapToFichePaieResponse(fichePaieById));
            resp.setStatusCode(200);
            resp.setMessage("Fiche de Paie with id '" + id + "' found successfully");
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setMessage("Error occurred: " + e.getMessage());
        }

        return resp;
    }


    public FichePaieResReq getAllFichePaieByEmploye(Long employeId) {
        FichePaieResReq resp = new FichePaieResReq();

        try {
            List<Fiche_Paie> result = fichePaieRepository.findAllByEmployeId(employeId);
            if (!result.isEmpty()) {
                List<FichePaieResponse> fichePaieResponses = result.stream()
                        .map(fiche -> mapToFichePaieResponse(fiche))
                        .collect(Collectors.toList());

                resp.setFichePaieDataList(fichePaieResponses);
                resp.setStatusCode(200);
                resp.setMessage("Successful");
            } else {
                resp.setStatusCode(404);
                resp.setMessage("No Fiche de Paie found for employeId: " + employeId);
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setMessage("Error occurred: " + e.getMessage());
        }

        return resp;
    }

    public FichePaieResReq getFichePaieByMonth(Long employeId, String periode) {
        FichePaieResReq resp = new FichePaieResReq();

        try {
            Fiche_Paie fichePaie = fichePaieRepository.findByEmployeIdAndPeriode(employeId, periode);
            if (fichePaie != null) {
                resp.setFiche_paie(mapToFichePaieResponse(fichePaie));
                resp.setStatusCode(200);
                resp.setMessage("Fiche de Paie with employeId '" + employeId + "' and periode '" + periode + "' found successfully");
            } else {
                resp.setStatusCode(404);
                resp.setMessage("Fiche de Paie not found for employeId: " + employeId + " and periode: " + periode);
            }
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setMessage("Error occurred: " + e.getMessage());
        }

        return resp;
    }


    public void CalculerSalaire(Employe employe) {
        Calendar calendar = Calendar.getInstance();
        Date currentDate = calendar.getTime();

        calendar.set(Calendar.DAY_OF_MONTH, 1);
        Date startDate = calendar.getTime();
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        Date endDate = calendar.getTime();

        List<Heure_Travaille> heuresTravaillees = employe.getHeures_Travailles();

        int totalHoursWorked = 0;
        for (Heure_Travaille heureTravaille : heuresTravaillees) {
            Date heureTravailleDate = heureTravaille.getDate();
            if (heureTravailleDate.after(startDate) && heureTravailleDate.before(endDate)) {
                totalHoursWorked += heureTravaille.getNb_heures();
            }
        }

        float salary_brut = employe.getSalaire();

        float amo = salary_brut * 0.0185f; // AMO: 1.85%
        float cnss = salary_brut * 0.0452f; // CNSS: 4.52%
        float impot = 0;

        if (salary_brut > 18000) {
            impot = salary_brut * 0.38f; // 38% if salary > 180000
        } else if (salary_brut > 8000) {
            impot = salary_brut * 0.30f; // 30% if salary > 80000
        } else if (salary_brut > 6000) {
            impot = salary_brut * 0.20f; // 20% if salary > 60000
        } else if (salary_brut > 3000) {
            impot = salary_brut * 0.10f; // 10% if salary > 30000
        }

        float netSalary = salary_brut - amo - cnss - impot;

        Fiche_Paie fiche = new Fiche_Paie();
        fiche.setPeriode(getMonthAsString(calendar.get(Calendar.MONTH)) + " " + calendar.get(Calendar.YEAR));
        fiche.setMontant_brut(salary_brut);
        fiche.setMontant_net(netSalary);
        fiche.setAmo(amo);
        fiche.setCnss(cnss);
        fiche.setImpotSurRevenu(impot);

        employe.getFiches().add(fiche);

        int currentMonth = calendar.get(Calendar.MONTH);

        // Additional Hours Worked Prime
        if (totalHoursWorked > 44) {
            float additionalHours = totalHoursWorked - 44;
            float additionalPay = additionalHours * ((netSalary / 44) + (netSalary / 44) * 0.25f);
            Element_Salaire heureSup = new Element_Salaire();
            heureSup.setType("Heures Supplémentaires");
            heureSup.setMontant(additionalPay);
            heureSup.setFiche_paie(fiche);
            fiche.getElements_Salaires().add(heureSup);
        }

        // 13th Month Prime
        if (currentMonth == Calendar.DECEMBER) {
            Element_Salaire prime13thMonth = new Element_Salaire();
            prime13thMonth.setType("Prime 13ème Mois");
            prime13thMonth.setMontant(netSalary);
            prime13thMonth.setFiche_paie(fiche);
            fiche.getElements_Salaires().add(prime13thMonth);
        }

        // Seniority Prime
        long employmentDurationInMillis = currentDate.getTime() - employe.getDate_embauche().getTime();
        long employmentDurationInYears = employmentDurationInMillis / (1000L * 60 * 60 * 24 * 365);
        if (employmentDurationInYears >= 2) {
            float seniorityPrimeRate = (employmentDurationInYears >= 5) ? 0.10f : 0.05f;
            float seniorityPrimeAmount = netSalary * seniorityPrimeRate;
            Element_Salaire seniorityPrime = new Element_Salaire();
            seniorityPrime.setType("Prime d'ancienneté");
            seniorityPrime.setMontant(seniorityPrimeAmount);
            seniorityPrime.setFiche_paie(fiche);
            fiche.getElements_Salaires().add(seniorityPrime);
        }

        fichePaieRepository.save(fiche);
    }

    private String getMonthAsString(int month) {
        String[] months = {"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"};
        return months[month];
    }
}
