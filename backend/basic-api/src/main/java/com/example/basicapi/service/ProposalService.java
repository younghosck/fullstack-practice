package com.example.basicapi.service;

import com.example.basicapi.domain.Proposal;
import com.example.basicapi.domain.ProposalRequest;
import com.example.basicapi.repository.ProposalRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProposalService {

    private final ProposalRepository proposalRepository;

    public ProposalService(ProposalRepository proposalRepository) {
        this.proposalRepository = proposalRepository;
    }

    public List<Proposal> getAll() {
        return proposalRepository.findAll();
    }

    public Optional<Proposal> getById(Long id) {
        return proposalRepository.findById(id);
    }

    public Proposal createProposal(ProposalRequest request) {
        Proposal proposal = new Proposal(null, request.getTitle(), request.getContent());
        return proposalRepository.save(proposal);
    }
}
