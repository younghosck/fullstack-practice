"use client";

import { useState } from "react";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export default function NewProposalPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            alert("제목과 내용을 모두 입력해 주세요.");
            return;
        }

        try {
            setSubmitting(true);
            setMessage("");

            const res = await fetch(`${API_BASE_URL}/proposals`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content }),
            });

            if (!res.ok) {
                throw new Error(`Failed: ${res.status}`);
            }

            setMessage("제안이 성공적으로 등록되었습니다!");
            setTitle("");
            setContent("");
        } catch (err) {
            console.error(err);
            setMessage("제안 등록 중 문제가 발생했습니다.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="app">
            <header className="header">
                <h1>새 제안 작성</h1>
                <p className="subtitle">
                    이 페이지는 클라이언트 컴포넌트로 렌더링되며, 제출 시 백엔드로 POST를
                    보냅니다.
                </p>
            </header>

            <main className="main">
                <section className="card" style={{ gridColumn: "1 / span 2" }}>
                    <form className="proposal-form" onSubmit={handleSubmit}>
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
                                rows={6}
                                placeholder="제안하고 싶은 내용을 구체적으로 적어주세요."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                disabled={submitting}
                            />
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <a href="/">
                                <button type="button" className="link-button">
                                    목록으로 돌아가기
                                </button>
                            </a>
                            <button
                                type="submit"
                                className="button-primary"
                                disabled={submitting}
                            >
                                {submitting ? "등록 중..." : "제안 등록"}
                            </button>
                        </div>

                        {message && (
                            <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
                                {message}
                            </p>
                        )}
                    </form>
                </section>
            </main>
        </div>
    );
}