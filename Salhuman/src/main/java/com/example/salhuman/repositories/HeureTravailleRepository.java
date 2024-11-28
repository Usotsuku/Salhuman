package com.example.salhuman.repositories;
import com.example.salhuman.models.Employe;
import com.example.salhuman.models.Heure_Travaille;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface HeureTravailleRepository extends JpaRepository<Heure_Travaille, Long> {


    List<Heure_Travaille> findByEmploye(Optional<Employe> employe);
    @Query("SELECT h FROM Heure_Travaille h WHERE h.employe.employeId = :employeId AND h.date BETWEEN :startDate AND :endDate")
    List<Heure_Travaille> findByEmployeIdAndDateBetween(Long employeId, Date startDate, Date endDate);

    @Query("SELECT h FROM Heure_Travaille h WHERE h.employe.employeId = :employeId AND h.date BETWEEN :startDate AND :endDate")
    List<Heure_Travaille> findByEmployeIdAndDateRange(
            @Param("employeId") Long employeId,
            @Param("startDate") Date startDate,
            @Param("endDate") Date endDate);
}

