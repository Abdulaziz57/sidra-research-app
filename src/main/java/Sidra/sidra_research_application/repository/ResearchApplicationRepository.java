package Sidra.sidra_research_application.repository;


import Sidra.sidra_research_application.entity.ResearchApplication;
import Sidra.sidra_research_application.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResearchApplicationRepository extends JpaRepository<ResearchApplication, Long> {
    List<ResearchApplication> findByUserId(Long userId);
}

