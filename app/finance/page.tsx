'use client'
import React, { JSX } from 'react'

type OperationType = 'income' | 'refund'

type Operation = {
  id: number
  time: string
  description: string
  amount: number
  type: OperationType
  method: 'Наличные' | 'Kaspi QR' | 'Карта'
}

const OPERATIONS: Operation[] = [
  { id: 1, time: '18:05', description: 'Ночной безлимит (ПК-зона)', amount: 2500, type: 'income', method: 'Kaspi QR' },
  { id: 2, time: '18:22', description: 'PS5 Co-op (2 часа)', amount: 1500, type: 'income', method: 'Карта' },
  { id: 3, time: '18:40', description: 'Часовой стандарт (ПК)', amount: 600, type: 'income', method: 'Наличные' },
  { id: 4, time: '19:05', description: 'Возврат по переносу брони', amount: -600, type: 'refund', method: 'Kaspi QR' },
  { id: 5, time: '19:18', description: 'VIP-комната “Киберночь”', amount: 5000, type: 'income', method: 'Карта' },
]

export default function Page(): JSX.Element {
  const totalIncome = OPERATIONS.filter((o) => o.type === 'income').reduce((s, o) => s + o.amount, 0)
  const totalRefunds = OPERATIONS.filter((o) => o.type === 'refund').reduce((s, o) => s + o.amount, 0)
  const net = totalIncome + totalRefunds
  const avgCheck = OPERATIONS.filter((o) => o.type === 'income').length
    ? Math.round(totalIncome / OPERATIONS.filter((o) => o.type === 'income').length)
    : 0

  return (
    <main
      style={{
        fontFamily: 'Inter, Segoe UI, Roboto, system-ui',
        minHeight: '100vh',
        padding: 28,
        maxWidth: 1100,
        margin: '0 auto',
        color: '#e5e7eb',
      }}
    >
      <style>{`
        body { background:#020617; }

        .shell {
          border-radius: 22px;
          padding: 22px 22px 24px;
          background: rgba(15,23,42,0.96);
          border: 1px solid rgba(148,163,184,0.25);
          box-shadow: 0 18px 55px rgba(15,23,42,0.9);
          backdrop-filter: blur(18px);
        }

        .page-title {
          font-size:22px;
          letter-spacing:-0.03em;
          margin:0 0 4px 0;
          display:flex;
          align-items:center;
          gap:10px;
        }

        .page-sub {
          margin:0 0 18px 0;
          font-size:13px;
          color:#9ca3af;
        }

        .badge-soft {
          font-size:11px;
          padding:3px 8px;
          border-radius:999px;
          background:rgba(15,23,42,0.9);
          border:1px solid rgba(129,140,248,0.6);
        }

        .grid-top {
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          gap:14px;
          margin-bottom:16px;
        }

        @media (max-width: 760px) {
          .grid-top { grid-template-columns:minmax(0,1fr); }
        }

        .metric-card {
          border-radius:18px;
          padding:12px 12px 14px;
          background:radial-gradient(circle at 0 0,rgba(248,250,252,0.05),transparent 60%);
          border:1px solid rgba(55,65,81,0.9);
        }

        .metric-label {
          font-size:11px;
          color:#9ca3af;
          margin-bottom:4px;
        }

        .metric-value {
          font-size:20px;
          font-weight:600;
          display:flex;
          align-items:baseline;
          gap:6px;
        }

        .metric-chip {
          font-size:10px;
          padding:2px 6px;
          border-radius:999px;
        }

        .metric-chip.green {
          background:rgba(34,197,94,0.14);
          color:#bbf7d0;
        }

        .metric-chip.red {
          background:rgba(248,113,113,0.14);
          color:#fecaca;
        }

        .metric-foot {
          font-size:10px;
          color:#64748b;
          margin-top:2px;
        }

        .layout-bottom {
          display:grid;
          grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);
          gap:16px;
        }

        @media (max-width: 900px) {
          .layout-bottom { grid-template-columns:minmax(0,1fr); }
        }

        .block {
          border-radius:18px;
          padding:14px 14px 16px;
          background:#020617;
          border:1px solid rgba(55,65,81,0.9);
        }

        .block-title {
          font-size:14px;
          font-weight:600;
          margin-bottom:6px;
        }

        .block-sub {
          font-size:11px;
          color:#9ca3af;
          margin-bottom:10px;
        }

        table {
          width:100%;
          border-collapse:collapse;
          font-size:12px;
        }

        th, td {
          padding:7px 6px;
          text-align:left;
        }

        thead th {
          font-weight:500;
          color:#9ca3af;
          border-bottom:1px solid rgba(55,65,81,0.9);
        }

        tbody tr {
          border-bottom:1px solid rgba(15,23,42,0.9);
        }

        tbody tr:last-child {
          border-bottom:none;
        }

        tbody tr:hover {
          background:#020617;
        }

        .amount-pos { color:#bbf7d0; font-weight:500; }
        .amount-neg { color:#fecaca; font-weight:500; }

        .op-type {
          font-size:11px;
          border-radius:999px;
          padding:3px 7px;
        }

        .op-income {
          background:rgba(34,197,94,0.14);
          color:#bbf7d0;
        }

        .op-refund {
          background:rgba(248,113,113,0.14);
          color:#fecaca;
        }

        .pill-method {
          font-size:10px;
          padding:3px 7px;
          border-radius:999px;
          border:1px solid rgba(75,85,99,0.9);
        }

        .mini-list {
          list-style:none;
          padding:0;
          margin:0;
          display:flex;
          flex-direction:column;
          gap:7px;
          font-size:11px;
          color:#9ca3af;
        }

        .mini-item strong {
          color:#e5e7eb;
        }

        .spark-bar {
          margin-top:8px;
          height:40px;
          border-radius:12px;
          background:linear-gradient(90deg,rgba(79,70,229,0.5),rgba(6,182,212,0.35));
          position:relative;
          overflow:hidden;
        }

        .spark-bar::after {
          content:'';
          position:absolute;
          inset:0;
          background-image:linear-gradient(90deg, rgba(15,23,42,0.25) 1px, transparent 1px);
          background-size:12px 100%;
        }
      `}</style>

      <div className="shell">
        <h1 className="page-title">
          Касса и выручка
          <span className="badge-soft">Панель смены</span>
        </h1>
        <p className="page-sub">
          Мини-аналитика по текущей смене: выручка, возвраты, средний чек и последние операции. Страница для администратора или владельца клуба.
        </p>

        <div className="grid-top">
          <div className="metric-card">
            <div className="metric-label">Выручка за смену</div>
            <div className="metric-value">
              {totalIncome.toLocaleString('ru-RU')} ₸
              <span className="metric-chip green">Онлайн</span>
            </div>
            <div className="metric-foot">Без учёта возвратов и скидок</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Возвраты и корректировки</div>
            <div className="metric-value">
              {totalRefunds.toLocaleString('ru-RU')} ₸
              <span className="metric-chip red">Коррекция</span>
            </div>
            <div className="metric-foot">Причины: переносы броней, отмена ночных пакетов</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Чистая выручка и средний чек</div>
            <div className="metric-value">
              {net.toLocaleString('ru-RU')} ₸
            </div>
            <div className="metric-foot">Средний чек: ~{avgCheck.toLocaleString('ru-RU')} ₸ за заказ</div>
          </div>
        </div>

        <div className="layout-bottom">
          <section className="block">
            <div className="block-title">Последние операции</div>
            <div className="block-sub">Оплаты, ночные пакеты, возвраты. Основано на действиях за текущую смену.</div>
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Время</th>
                    <th>Операция</th>
                    <th>Сумма</th>
                    <th>Тип</th>
                    <th>Способ оплаты</th>
                  </tr>
                </thead>
                <tbody>
                  {OPERATIONS.map((o) => (
                    <tr key={o.id}>
                      <td>{o.time}</td>
                      <td>{o.description}</td>
                      <td>
                        {o.amount >= 0 ? (
                          <span className="amount-pos">+{o.amount.toLocaleString('ru-RU')} ₸</span>
                        ) : (
                          <span className="amount-neg">{o.amount.toLocaleString('ru-RU')} ₸</span>
                        )}
                      </td>
                      <td>
                        <span
                          className={
                            'op-type ' + (o.type === 'income' ? 'op-income' : 'op-refund')
                          }
                        >
                          {o.type === 'income' ? 'Поступление' : 'Возврат'}
                        </span>
                      </td>
                      <td>
                        <span className="pill-method">{o.method}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="block">
            <div className="block-title">Краткая сводка по платежам</div>
            <div className="block-sub">
              Помогает понять, как чаще платят гости и на что приходится основная выручка.
            </div>

            <ul className="mini-list">
              <li className="mini-item">
                <strong>Kaspi QR:</strong> удобно для ночных пакетов и больших сумм.
              </li>
              <li className="mini-item">
                <strong>Карта:</strong> стандарт для PS-турниров и VIP-комнаты.
              </li>
              <li className="mini-item">
                <strong>Наличные:</strong> чаще всего — часовые тарифы и быстрые катки.
              </li>
            </ul>

            <div className="spark-bar" />
          </aside>
        </div>
      </div>
    </main>
  )
}
