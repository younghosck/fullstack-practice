const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

async function fetchProposals() {
    const res = await fetch(`${API_BASE_URL}/proposals`, {
        // SSR + RSC에서 캐시 정책 명시 (개발 편의를 위해 no-store)
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch proposals");
    }

    return res.json();
}

export default async function HomePage() {
    const proposals = await fetchProposals();

    return (
        <div className="app">
            <header className="header">
                <h1>공개제안 클론 (Next.js + Spring)</h1>
                <p className="subtitle">
                    이 페이지는 서버에서 제안 목록을 렌더링하는 SSR 페이지입니다.
                </p>
            </header>

            <main className="main">
                <section className="card">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h2>제안 목록</h2>
                        <a href="/proposals/new">
                            <button className="link-button">새 제안 작성</button>
                        </a>
                    </div>

                    {proposals.length === 0 ? (
                        <p className="empty">등록된 제안이 없습니다.</p>
                    ) : (
                        <ul className="proposal-list">
                            {proposals.map((p) => (
                                <li key={p.id} className="proposal-item">
                                    <a href={`/proposals/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                                        <h3 className="proposal-title">{p.title}</h3>
                                        <p className="proposal-content">{p.content}</p>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <section className="card">
                    <h2>설명</h2>
                    <p style={{ fontSize: "0.9rem", color: "#555" }}>
                        이 프로젝트는 Vite + React로 만든 공개제안 UI를 Next.js App Router로
                        옮기고, Spring Boot 백엔드와 연동하는 연습을 위한 것입니다.
                    </p>
                    <ul style={{ fontSize: "0.9rem", color: "#555" }}>
                        <li>이 페이지는 서버에서 렌더링됩니다 (SSR).</li>
                        <li>제안 작성 페이지는 클라이언트 컴포넌트로 동작합니다.</li>
                    </ul>
                </section>
            </main>
        </div>
    );
}