# Public Proposal Clone Service – MVP Requirements

## 1. Overview
A simplified clone of the e-People Public Proposal service.  
Users can browse public proposals, view details, and submit new proposals.

## 2. Core MVP Features
### 2.1 Public Proposal List
- Displays paginated list of proposals.
- Shows title, category, created date, and status.

### 2.2 Proposal Detail Page
- Shows full content of proposal.
- Shows processing status.

### 2.3 Submit Proposal
- User fills out:
  - Title
  - Content
  - Category
- Form validation required.

### 2.4 Backend API
- GET /proposals
- GET /proposals/{id}
- POST /proposals

### 2.5 Database
- Proposal table with:
  - id
  - title
  - content
  - category
  - createdAt
  - updatedAt

## 3. Non-MVP Features (Later)
- User login
- File upload
- Proposal comments
- AI-enhanced preview (excluded for now)