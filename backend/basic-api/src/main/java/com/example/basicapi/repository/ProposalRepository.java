package com.example.basicapi.repository;

import com.example.basicapi.domain.Proposal;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class ProposalRepository {

    private final AtomicLong idSequence = new AtomicLong(1);
    private final List<Proposal> proposals = new CopyOnWriteArrayList<>();

    public List<Proposal> findAll() {
        return new ArrayList<>(proposals);
    }

    public Optional<Proposal> findById(Long id) {
        return proposals.stream()
                .filter(proposal -> proposal.getId().equals(id))
                .findFirst();
    }

    public Proposal save(Proposal proposal) {
        if (proposal.getId() == null) {
            proposal.setId(idSequence.getAndIncrement());
        } else {
            proposals.removeIf(existing -> existing.getId().equals(proposal.getId()));
        }
        proposals.add(proposal);
        return proposal;
    }
}
