import { useState } from "react";
import "./App.css";

const initialProposals = [
  {
    id: 1,
    title: "횡단보도 신설 요청",
    content: "OO초등학교 앞 차량 통행이 많아 아이들 안전이 우려됩니다.",
  },
  {
    id: 2,
    title: "공원 내 야간 조명 설치",
    content: "동네 공원이 너무 어두워서 야간 이용이 어렵습니다.",
  },
];

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

function ProposalForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해 주세요.");
      return;
    }

    onSubmit({ title, content });
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
        />
      </div>

      <button type="submit" className="submit-button">
        제안 등록
      </button>
    </form>
  );
}

function App() {
  const [proposals, setProposals] = useState(initialProposals);

  const handleAddProposal = (newProposal) => {
    const nextId =
      proposals.length > 0 ? proposals[proposals.length - 1].id + 1 : 1;
    setProposals([...proposals, { id: nextId, ...newProposal }]);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>공개제안 클론 서비스 (Vite + React)</h1>
        <p className="subtitle">
          국민신문고 공개제안 기능을 연습용으로 단순화한 화면입니다.
        </p>
      </header>

      <main className="main">
        <section className="left">
          <h2>제안 목록</h2>
          <ProposalList proposals={proposals} />
        </section>

        <section className="right">
          <ProposalForm onSubmit={handleAddProposal} />
        </section>
      </main>
    </div>
  );
}

export default App;