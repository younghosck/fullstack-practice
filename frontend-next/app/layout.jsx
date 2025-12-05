export const metadata = {
    title: "공개제안 클론 (Next.js)",
    description: "Next.js + Spring Boot 연동 연습 프로젝트",
};

export default function RootLayout({ children }) {
    return (
        <html lang="ko">
            <body>{children}</body>
        </html>
    );
}