import { useEffect, useState } from "react";
import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

function ProposalList({ proposals }) {
  if (proposals.length === 0) {
    return <p className="empty">등록된 제안이 없습니다.</p>;
  }

  return (
    <ul className="proposal-list">
      {proposals.map((p) => (
        <li key={p.id} className="proposal-item">
          <h3 className="proposal-title">{p.title}</h3>
          <p className="proposal-content">{p.content}</p>
        </li>
      ))}
    </ul>
  );
}

function ProposalForm({ onSubmit, submitting }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해 주세요.");
      return;
    }

    await onSubmit({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <form className="proposal-form" onSubmit={handleSubmit}>
      <h2>새 제안 등록</h2>
      <div className="form-group">
        <label htmlFor="title">제안 제목</label>
        <input
          id="title"
          type="text"
          placeholder="예) 횡단보도 신설 요청"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={submitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="content">제안 내용</label>
        <textarea
          id="content"
          rows={5}
          placeholder="제안하고 싶은 내용을 구체적으로 적어주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={submitting}
        />
      </div>

      <button type="submit" className="submit-button" disabled={submitting}>
        {submitting ? "등록 중..." : "제안 등록"}
      </button>
    </form>
  );
}

function App() {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // ✅ 초기 로딩 시 백엔드에서 제안 목록 가져오기
  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE_URL}/proposals`);
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data = await res.json();
        setProposals(data);
      } catch (err) {
        console.error(err);
        setError("제안 목록을 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  // ✅ 새 제안 등록 시 백엔드로 POST
  const handleAddProposal = async (newProposal) => {
    try {
      setSubmitting(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/proposals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProposal),
      });

      if (!res.ok) {
        throw new Error(`Failed to create: ${res.status}`);
      }

      const created = await res.json();

      // 백엔드가 생성된 Proposal 객체를 반환한다고 가정
      setProposals((prev) => [...prev, created]);
    } catch (err) {
      console.error(err);
      setError("제안 등록 중 문제가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>공개제안 클론 서비스 (Vite + React + Spring)</h1>
        <p className="subtitle">
          프론트엔드(Vite)와 백엔드(Spring Boot)를 실제로 연동한 연습용 화면입니다.
        </p>
      </header>

      <main className="main">
        <section className="left">
          <h2>제안 목록</h2>
          {loading && <p>불러오는 중...</p>}
          {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
          {!loading && !error && <ProposalList proposals={proposals} />}
        </section>

        <section className="right">
          <ProposalForm onSubmit={handleAddProposal} submitting={submitting} />
        </section>
      </main>
    </div>
  );
}

export default App;