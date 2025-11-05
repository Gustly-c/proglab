"use client";

import React from "react";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  createdAt: string;
};

type ClientProps = {
  initialCustomers: Customer[];
};

export default function ClientCustomerList({ initialCustomers }: ClientProps) {
  const [query, setQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState<"name" | "createdAt">("name");
  const [direction, setDirection] = React.useState<"asc" | "desc">("asc");
  const [customers, setCustomers] = React.useState<Customer[]>(initialCustomers);

  React.useEffect(() => {
    setCustomers(initialCustomers);
  }, [initialCustomers]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = customers.filter((c) =>
      `${c.name} ${c.email} ${c.company ?? ""}`.toLowerCase().includes(q)
    );
    list = list.sort((a, b) => {
      let av: string | number = a[sortBy];
      let bv: string | number = b[sortBy];
      if (sortBy === "createdAt") {
        av = new Date(String(av)).getTime();
        bv = new Date(String(bv)).getTime();
      }
      if (av < bv) return direction === "asc" ? -1 : 1;
      if (av > bv) return direction === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [customers, query, sortBy, direction]);

  return (
    <section>
      <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center" }}>
        <input
          aria-label="Поиск клиентов"
          placeholder="Поиск по имени, email или компании"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            padding: "8px 10px",
            border: "1px solid #ddd",
            borderRadius: 6,
          }}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "name" | "createdAt")}
          style={{ padding: "8px 10px", borderRadius: 6, border: "1px solid #ddd" }}
        >
          <option value="name">Сортировать: Имя</option>
          <option value="createdAt">Сортировать: Дата добавления</option>
        </select>

        <button
          onClick={() => setDirection((d) => (d === "asc" ? "desc" : "asc"))}
          title="Поменять направление сортировки"
          style={{
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #ddd",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          {direction === "asc" ? "↑" : "↓"}
        </button>
      </div>

      <div style={{ border: "1px solid #eee", borderRadius: 8, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead style={{ background: "#fafafa", textAlign: "left" }}>
            <tr>
              <th style={{ padding: 12, borderBottom: "1px solid #f0f0f0" }}>Имя</th>
              <th style={{ padding: 12, borderBottom: "1px solid #f0f0f0" }}>Email</th>
              <th style={{ padding: 12, borderBottom: "1px solid #f0f0f0" }}>Компания</th>
              <th style={{ padding: 12, borderBottom: "1px solid #f0f0f0" }}>Добавлен</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: 18, color: "#666" }}>
                  Ничего не найдено.
                </td>
              </tr>
            )}

            {filtered.map((c) => (
              <tr key={c.id} style={{ borderTop: "1px solid #fafafa" }}>
                <td style={{ padding: 12 }}>{c.name}</td>
                <td style={{ padding: 12, color: "#333" }}>{c.email}</td>
                <td style={{ padding: 12 }}>{c.company ?? "-"}</td>
                <td style={{ padding: 12, color: "#666" }}>
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
