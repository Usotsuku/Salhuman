package com.example.salhuman.repositories;

import com.example.salhuman.models.Fiche_Paie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Fiche_PaieRepository extends JpaRepository<Fiche_Paie,Long> {
    @Query("SELECT f FROM Fiche_Paie f WHERE f.employe.employeId = :employeId")
    List<Fiche_Paie> findAllByEmployeId(@Param("employeId") Long employeId);

    @Query("SELECT f FROM Fiche_Paie f WHERE f.employe.employeId = :employeId AND f.periode = :periode")
    Fiche_Paie findByEmployeIdAndPeriode(@Param("employeId") Long employeId, @Param("periode") String periode);

    List<Fiche_Paie> findAllByPeriode(String periode);


}
