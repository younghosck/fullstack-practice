package com.example.basicapi.domain;

public class ProposalRequest {

    private String title;
    private String content;

    public ProposalRequest() {
    }

    public ProposalRequest(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
