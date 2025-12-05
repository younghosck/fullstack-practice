const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

async function fetchProposal(id) {
    const res = await fetch(`${API_BASE_URL}/proposals/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch proposal");
    }

    return res.json();
}

export default async function ProposalDetailPage({ params }) {
    const { id } = params;
    const proposal = await fetchProposal(id);

    return (
        <div className="app">
            <header className="header">
                <h1>제안 상세 보기</h1>
            </header>

            <main className="main">
                <section className="card" style={{ gridColumn: "1 / span 2" }}>
                    <h2 className="proposal-title">{proposal.title}</h2>
                    <p className="proposal-content" style={{ whiteSpace: "pre-wrap" }}>
                        {proposal.content}
                    </p>

                    <div style={{ marginTop: "1.5rem" }}>
                        <a href="/">
                            <button className="link-button">목록으로 돌아가기</button>
                        </a>
                    </div>
                </section>
            </main>
        </div>
    );
}