'use client'
import React, { JSX } from 'react'

type Zone = 'pc' | 'ps' | 'vip'

type Tariff = {
  id: number
  name: string
  description: string
  price: number
  duration: string
  zone: Zone | 'multi'
  tag?: string
}

const TARIFFS: Tariff[] = [
  {
    id: 1,
    name: 'Часовой стандарт',
    description: 'Базовый тариф для будних дней. Оптимален для одиночных каток и коротких сессий.',
    price: 600,
    duration: '1 час',
    zone: 'pc',
    tag: 'будни',
  },
  {
    id: 2,
    name: 'Ночной безлимит',
    description: 'С 00:00 до 06:00, полная свобода на всех ПК. Идеален для стаканов и марафонов.',
    price: 2500,
    duration: 'Ночь',
    zone: 'multi',
    tag: 'хит',
  },
  {
    id: 3,
    name: 'PS5 Co-op',
    description: 'Тариф для двоих на одной консоли: FIFA, UFC, Mortal Kombat и другие хиты.',
    price: 1500,
    duration: '2 часа',
    zone: 'ps',
  },
  {
    id: 4,
    name: 'VIP-комната “Киберночь”',
    description: 'Отдельная комната с проектором, диваном и улучшенным звуком. До 4 человек.',
    price: 5000,
    duration: 'Ночь',
    zone: 'vip',
  },
  {
    id: 5,
    name: 'Студенческий час',
    description: 'Скидка по студенческому билету в будни до 18:00. Нужен документ.',
    price: 450,
    duration: '1 час',
    zone: 'pc',
  },
]

export default function Page(): JSX.Element {
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
          margin:0 0 6px 0;
          display:flex;
          align-items:center;
          gap:10px;
        }

        .page-sub {
          margin:0 0 18px 0;
          font-size:13px;
          color:#9ca3af;
        }

        .zone-pill {
          padding:5px 9px;
          border-radius:999px;
          font-size:11px;
          background:#020617;
          border:1px solid rgba(51,65,85,0.9);
          display:inline-flex;
          align-items:center;
          gap:6px;
        }

        .dot-pc { width:7px; height:7px; border-radius:999px; background:#6366f1; }
        .dot-ps { width:7px; height:7px; border-radius:999px; background:#ec4899; }
        .dot-vip { width:7px; height:7px; border-radius:999px; background:#22c55e; }
        .dot-multi { width:7px; height:7px; border-radius:999px; background:linear-gradient(90deg,#6366f1,#22c55e,#ec4899); }

        .grid {
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          gap:16px;
        }

        @media (max-width: 950px) {
          .grid {
            grid-template-columns:repeat(2,minmax(0,1fr));
          }
        }

        @media (max-width: 680px) {
          .grid {
            grid-template-columns:minmax(0,1fr);
          }
        }

        .card {
          border-radius:18px;
          padding:14px 14px 16px;
          background:radial-gradient(circle at 0 0,rgba(248,250,252,0.06),transparent 60%);
          border:1px solid rgba(55,65,81,0.9);
        }

        .card-header {
          display:flex;
          justify-content:space-between;
          align-items:flex-start;
          gap:10px;
          margin-bottom:8px;
        }

        .card-title {
          font-size:14px;
          font-weight:600;
        }

        .card-tag {
          font-size:10px;
          padding:3px 6px;
          border-radius:999px;
          background:rgba(34,197,94,0.18);
          color:#bbf7d0;
        }

        .card-tag-hit {
          background:rgba(129,140,248,0.2);
          color:#e0e7ff;
        }

        .card-desc {
          font-size:12px;
          color:#9ca3af;
          margin-bottom:10px;
          min-height:42px;
        }

        .card-bottom {
          display:flex;
          justify-content:space-between;
          align-items:flex-end;
          gap:10px;
        }

        .price {
          font-size:18px;
          font-weight:600;
        }

        .price span {
          font-size:12px;
          color:#9ca3af;
        }

        .duration {
          font-size:11px;
          color:#9ca3af;
          margin-top:2px;
        }

        .btn-ghost {
          border-radius:999px;
          padding:7px 12px;
          font-size:11px;
          border:1px solid rgba(148,163,184,0.7);
          background:#020617;
          color:#e5e7eb;
          cursor:pointer;
        }

        .table-wrap {
          margin-top:20px;
          border-radius:16px;
          border:1px solid rgba(51,65,85,0.9);
          background:#020617;
          padding:10px 12px 12px;
        }

        .table-title {
          font-size:13px;
          margin-bottom:8px;
          color:#cbd5f5;
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
      `}</style>

      <div className="shell">
        <h1 className="page-title">
          Тарифы и пакеты
        </h1>
        <p className="page-sub">
          Страница для администратора: все тарифы клуба в одном месте. Удобно менять цены, обсуждать акции и не путаться в ночных пакетах.
        </p>

        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <div className="zone-pill">
            <span className="dot-pc" />
            ПК-зона
          </div>
          <div className="zone-pill">
            <span className="dot-ps" />
            PS-зона
          </div>
          <div className="zone-pill">
            <span className="dot-vip" />
            VIP-комната
          </div>
          <div className="zone-pill">
            <span className="dot-multi" />
            Мультизона / общий тариф
          </div>
        </div>

        <div className="grid">
          {TARIFFS.map((t) => (
            <article key={t.id} className="card">
              <div className="card-header">
                <div>
                  <div className="card-title">{t.name}</div>
                </div>
                {t.tag && (
                  <div className={`card-tag ${t.tag === 'хит' ? 'card-tag-hit' : ''}`}>
                    {t.tag === 'хит' ? 'Хит продаж' : t.tag}
                  </div>
                )}
              </div>
              <p className="card-desc">{t.description}</p>
              <div className="card-bottom">
                <div>
                  <div className="price">
                    {t.price.toLocaleString('ru-RU')} ₸ <span>/ {t.duration}</span>
                  </div>
                  <div className="duration">
                    Зона:{' '}
                    {t.zone === 'pc'
                      ? 'ПК'
                      : t.zone === 'ps'
                      ? 'PS'
                      : t.zone === 'vip'
                      ? 'VIP-комната'
                      : 'несколько зон'}
                  </div>
                </div>
                <button className="btn-ghost" type="button">
                  Редактировать тариф
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="table-wrap">
          <div className="table-title">Сводка по зонам и базовой цене</div>
          <table>
            <thead>
              <tr>
                <th>Зона</th>
                <th>Базовая цена / час</th>
                <th>Ночные тарифы</th>
                <th>Комментарии</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ПК-зона</td>
                <td>600 ₸</td>
                <td>Есть (Ночной безлимит + Студенческий пакет)</td>
                <td>Можно поднимать в выходные на 10–20%</td>
              </tr>
              <tr>
                <td>PS-зона</td>
                <td>800 ₸</td>
                <td>PS5 Co-op + турниры</td>
                <td>Подходит под мини-ивенты на выходных</td>
              </tr>
              <tr>
                <td>VIP-комната</td>
                <td>1200 ₸</td>
                <td>Ночной пакет + ивенты</td>
                <td>Использовать под дни рождения и стримы</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
