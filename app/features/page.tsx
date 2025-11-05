import React, { JSX } from "react";
import Link from "next/link";

export const metadata = {
    title: "Features",
    description: "Overview of application features",
};

type Feature = {
    id: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
};

const FEATURES: Feature[] = [
    {
        id: "fast",
        title: "Fast",
        description: "Optimized for performance with server-side rendering and caching.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: "secure",
        title: "Secure",
        description: "Built-in patterns for secure data handling and authentication.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 2l7 4v6c0 5-3.5 9.7-7 10-3.5-.3-7-5-7-10V6l7-4z" stroke="currentColor" strokeWidth="1.2" fill="none" />
            </svg>
        ),
    },
    {
        id: "scalable",
        title: "Scalable",
        description: "Easy to extend with modular features and routes.",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M19 12a7 7 0 01-14 0" stroke="currentColor" strokeWidth="1.2" />
            </svg>
        ),
    },
];

export default function FeaturesPage(): JSX.Element {
    return (
        <main style={styles.page}>
            <header style={styles.header}>
                <h1 style={styles.title}>Features</h1>
                <p style={styles.lead}>Краткое описание возможностей приложения.</p>
                <nav>
                    <Link href="/" style={styles.homeLink}>
                        ← На главную
                    </Link>
                </nav>
            </header>

            <section style={styles.grid}>
                {FEATURES.map((f) => (
                    <article key={f.id} style={styles.card} aria-labelledby={`feature-${f.id}`}>
                        <div style={styles.iconWrapper}>{f.icon}</div>
                        <h2 id={`feature-${f.id}`} style={styles.cardTitle}>
                            {f.title}
                        </h2>
                        <p style={styles.cardDesc}>{f.description}</p>
                    </article>
                ))}
            </section>
        </main>
    );
}

const styles: { [k: string]: React.CSSProperties } = {
    page: {
        padding: "48px 20px",
        maxWidth: 1000,
        margin: "0 auto",
        fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        color: "#111827",
    },
    header: {
        marginBottom: 28,
    },
    title: {
        fontSize: 36,
        margin: 0,
        fontWeight: 700,
    },
    lead: {
        marginTop: 8,
        color: "#374151",
    },
    homeLink: {
        display: "inline-block",
        marginTop: 12,
        color: "#2563eb",
        textDecoration: "none",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 16,
    },
    card: {
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        padding: 18,
        background: "#fff",
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    },
    iconWrapper: {
        width: 44,
        height: 44,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
        color: "#111827",
    },
    cardTitle: {
        fontSize: 18,
        margin: "0 0 8px 0",
    },
    cardDesc: {
        margin: 0,
        color: "#6b7280",
        fontSize: 14,
        lineHeight: 1.4,
    },
};