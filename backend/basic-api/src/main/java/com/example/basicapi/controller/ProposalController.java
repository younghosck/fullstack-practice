package com.example.basicapi.controller;

import com.example.basicapi.domain.Proposal;
import com.example.basicapi.domain.ProposalRequest;
import com.example.basicapi.service.ProposalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:3000"
})
@RestController
@RequestMapping("/proposals")
public class ProposalController {

    private final ProposalService proposalService;

    public ProposalController(ProposalService proposalService) {
        this.proposalService = proposalService;
    }

    @GetMapping
    public List<Proposal> listAll() {
        return proposalService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Proposal> getOne(@PathVariable Long id) {
        return proposalService.getById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Proposal> create(@RequestBody ProposalRequest request) {
        Proposal created = proposalService.createProposal(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
