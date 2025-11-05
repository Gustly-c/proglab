import React from "react";
import ClientCustomerList from "./ClientCustomerList";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  createdAt: string;
};

/** Mock server-side fetch — replace with real fetch/database call as needed */
async function getCustomers(): Promise<Customer[]> {
  // Simulate latency
  await new Promise((r) => setTimeout(r, 50));
  return [
    {
      id: "1",
      name: "Иван Иванов",
      email: "ivan@example.com",
      phone: "+7 999 111 22 33",
      company: "ООО Ромашка",
      createdAt: "2024-05-12",
    },
    {
      id: "2",
      name: "Мария Петрова",
      email: "maria@example.com",
      phone: "+7 999 222 33 44",
      company: "ЗАО Лилия",
      createdAt: "2024-06-01",
    },
    {
      id: "3",
      name: "Андрей Смирнов",
      email: "andrey@example.com",
      phone: "+7 999 333 44 55",
      company: "ИП Смирнов",
      createdAt: "2024-04-20",
    },
  ];
}

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif", maxWidth: 960, margin: "0 auto" }}>
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>Клиенты</h1>
        <p style={{ color: "#666", marginTop: 6 }}>
          Список клиентов — поиск и сортировка выполняются в браузере.
        </p>
      </header>

      {/* Client component handles interactivity */}
      <ClientCustomerList initialCustomers={customers} />
    </main>
  );
}
