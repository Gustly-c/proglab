import React, { JSX } from "react";
import Link from "next/link";

type Integration = {
    id: string;
    name: string;
    description: string;
    connected: boolean;
};

const INTEGRATIONS: Integration[] = [
    {
        id: "github",
        name: "GitHub",
        description: "Sync repositories, issues and PRs.",
        connected: false,
    },
    {
        id: "slack",
        name: "Slack",
        description: "Send notifications and receive commands.",
        connected: true,
    },
    {
        id: "stripe",
        name: "Stripe",
        description: "Manage payments and subscriptions.",
        connected: false,
    },
    {
        id: "google-drive",
        name: "Google Drive",
        description: "Import/export files and backups.",
        connected: true,
    },
    {
        id: "figma",
        name: "Figma",
        description: "Sync design files and assets.",
        connected: false,
    },
];

export default function Page(): JSX.Element {
    return (
        <main style={styles.page}>
            <header style={styles.header}>
                <h1 style={styles.title}>Integrations</h1>
                <p style={styles.lead}>Connect external services to extend your app.</p>
            </header>

            <section style={styles.grid}>
                {INTEGRATIONS.map((it) => (
                    <article key={it.id} style={styles.card}>
                        <div style={styles.cardHeader}>
                            <div style={styles.logo}>{it.name.charAt(0)}</div>
                            <div style={{ flex: 1 }}>
                                <div style={styles.nameRow}>
                                    <h2 style={styles.name}>{it.name}</h2>
                                    <span
                                        style={{
                                            ...styles.badge,
                                            background: it.connected ? "#16a34a" : "#e5e7eb",
                                            color: it.connected ? "white" : "#374151",
                                        }}
                                    >
                                        {it.connected ? "Connected" : "Not connected"}
                                    </span>
                                </div>
                                <p style={styles.desc}>{it.description}</p>
                            </div>
                        </div>

                        <div style={styles.actions}>
                            <Link href={`/integrations/${it.id}`} style={styles.button}>
                                Configure
                            </Link>
                            <Link
                                href={`/integrations/${it.id}/connect`}
                                style={{
                                    ...styles.link,
                                    borderColor: it.connected ? "#9ca3af" : "#2563eb",
                                    color: it.connected ? "#374151" : "#2563eb",
                                }}
                            >
                                {it.connected ? "Reconnect" : "Connect"}
                            </Link>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
}

const styles: { [k: string]: React.CSSProperties } = {
    page: {
        padding: 24,
        fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        color: "#111827",
    },
    header: {
        marginBottom: 20,
    },
    title: { margin: 0, fontSize: 28 },
    lead: { margin: "6px 0 0", color: "#6b7280" },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 16,
        marginTop: 16,
    },
    card: {
        padding: 16,
        borderRadius: 8,
        border: "1px solid #e6e6e6",
        background: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 140,
    },
    cardHeader: { display: "flex", gap: 12, alignItems: "flex-start" },
    logo: {
        width: 44,
        height: 44,
        borderRadius: 8,
        background: "#111827",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 18,
    },
    nameRow: { display: "flex", gap: 8, alignItems: "center" },
    name: { margin: 0, fontSize: 16 },
    badge: {
        padding: "4px 8px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
    },
    desc: { margin: "8px 0 0", color: "#6b7280", fontSize: 13 },
    actions: {
        marginTop: 16,
        display: "flex",
        gap: 8,
        alignItems: "center",
    },
    button: {
        textDecoration: "none",
        background: "#111827",
        color: "white",
        padding: "8px 12px",
        borderRadius: 6,
        fontSize: 13,
    },
    link: {
        textDecoration: "none",
        padding: "8px 12px",
        borderRadius: 6,
        fontSize: 13,
        border: "1px solid",
        background: "transparent",
    },
};