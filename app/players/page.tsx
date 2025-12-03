'use client'
import React, { JSX, useState } from 'react'

type PlayerStatus = 'active' | 'negative' | 'banned'

type Player = {
  id: number
  nickname: string
  name: string
  telegram?: string
  phone?: string
  status: PlayerStatus
  balance: number
  visits: number
}

const PLAYERS: Player[] = [
  { id: 1, nickname: 'DarkSoul', name: 'Иван Петров', telegram: '@dark_soul', phone: '+7 700 111 22 33', status: 'active', balance: 1200, visits: 34 },
  { id: 2, nickname: 'Luna', name: 'Мария Ким', telegram: '@luna', phone: '+7 700 222 33 44', status: 'negative', balance: -600, visits: 12 },
  { id: 3, nickname: 'Ghost', name: 'Арман С.', telegram: '@ghost_arm', phone: '+7 777 333 44 55', status: 'active', balance: 0, visits: 7 },
  { id: 4, nickname: 'ToxicKid', name: 'Никита Ж.', telegram: '@toxic', phone: '+7 701 999 88 77', status: 'banned', balance: -200, visits: 5 },
]

export default function Page(): JSX.Element {
  const [filter, setFilter] = useState<'all' | PlayerStatus>('all')
  const [query, setQuery] = useState('')

  const filtered = PLAYERS.filter((p) => {
    if (filter !== 'all' && p.status !== filter) return false
    if (!query.trim()) return true
    const q = query.toLowerCase()
    return (
      p.nickname.toLowerCase().includes(q) ||
      p.name.toLowerCase().includes(q) ||
      (p.telegram?.toLowerCase().includes(q) ?? false) ||
      (p.phone?.toLowerCase().includes(q) ?? false)
    )
  })

  const totalActive = PLAYERS.filter((p) => p.status === 'active').length
  const totalBanned = PLAYERS.filter((p) => p.status === 'banned').length
  const totalNegative = PLAYERS.filter((p) => p.balance < 0).length

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
          border: 1px solid rgba(148,163,184,0.2);
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
          background:rgba(15,23,42,0.8);
          border:1px solid rgba(129,140,248,0.6);
          color:#e5e7eb;
        }

        .top-row {
          display:flex;
          gap:14px;
          align-items:flex-start;
          flex-wrap:wrap;
          margin-bottom:16px;
        }

        .search-box {
          flex:1.6;
          min-width:230px;
        }

        .search-input-wrap {
          display:flex;
          align-items:center;
          gap:8px;
          padding:8px 10px;
          border-radius:999px;
          background:#020617;
          border:1px solid rgba(51,65,85,0.9);
        }

        .search-input {
          flex:1;
          border:none;
          outline:none;
          background:transparent;
          color:#e5e7eb;
          font-size:13px;
        }

        .search-icon {
          font-size:13px;
          opacity:.8;
        }

        .clear-btn {
          border:none;
          background:transparent;
          cursor:pointer;
          color:#6b7280;
          font-size:14px;
        }

        .filter-tabs {
          display:flex;
          gap:6px;
          padding:3px;
          border-radius:999px;
          background:#020617;
          border:1px solid rgba(51,65,85,0.9);
        }

        .filter-tab {
          border:none;
          background:transparent;
          padding:4px 9px;
          border-radius:999px;
          font-size:11px;
          color:#9ca3af;
          cursor:pointer;
        }

        .filter-tab.active {
          background:rgba(15,23,42,0.98);
          color:#e5e7eb;
          box-shadow:0 0 0 1px rgba(129,140,248,0.7);
        }

        .stats-bar {
          display:flex;
          gap:10px;
          flex-wrap:wrap;
          margin-bottom:14px;
        }

        .stat-chip {
          padding:7px 10px;
          border-radius:12px;
          font-size:11px;
          background:#020617;
          border:1px solid rgba(55,65,81,0.9);
          display:flex;
          align-items:baseline;
          gap:6px;
        }

        .stat-chip strong {
          font-size:13px;
        }

        .stat-chip span {
          color:#9ca3af;
        }

        .stat-chip.negative strong { color:#f97316; }
        .stat-chip.banned strong { color:#ef4444; }
        .stat-chip.active strong { color:#22c55e; }

        table {
          width:100%;
          border-collapse:collapse;
          font-size:12px;
        }

        th, td {
          padding:8px 7px;
          text-align:left;
        }

        thead th {
          font-weight:500;
          color:#9ca3af;
          border-bottom:1px solid rgba(51,65,85,0.9);
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

        .nick {
          font-weight:500;
        }

        .name-sub {
          font-size:11px;
          color:#9ca3af;
        }

        .contact {
          font-size:11px;
          color:#9ca3af;
          display:flex;
          flex-direction:column;
          gap:2px;
        }

        .status-pill {
          font-size:11px;
          border-radius:999px;
          padding:3px 7px;
          display:inline-flex;
          align-items:center;
          gap:4px;
        }

        .status-active {
          background:rgba(34,197,94,0.16);
          color:#bbf7d0;
        }
        .status-negative {
          background:rgba(249,115,22,0.16);
          color:#fed7aa;
        }
        .status-banned {
          background:rgba(248,113,113,0.16);
          color:#fecaca;
        }

        .balance-pos { color:#bbf7d0; font-weight:500; }
        .balance-zero { color:#e5e7eb; }
        .balance-neg { color:#fecaca; font-weight:500; }

        .empty-row {
          text-align:center;
          padding:18px 10px;
          color:#6b7280;
        }
      `}</style>

      <div className="shell">
        <h1 className="page-title">
          Игроки клуба
          <span className="badge-soft">Управление клиентами</span>
        </h1>
        <p className="page-sub">
          Здесь администратор видит всех игроков, их контакты, баланс и статус. Удобно держать под контролем постоянных гостей и проблемные случаи.
        </p>

        <div className="top-row">
          <div className="search-box">
            <div className="search-input-wrap">
              <span className="search-icon">🔍</span>
              <input
                className="search-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск по нику, имени, телефону или Telegram…"
              />
              {query && (
                <button className="clear-btn" type="button" onClick={() => setQuery('')}>
                  ✕
                </button>
              )}
            </div>
          </div>
          <div>
            <div className="filter-tabs">
              <button
                className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                Все
              </button>
              <button
                className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
                onClick={() => setFilter('active')}
              >
                Активные
              </button>
              <button
                className={`filter-tab ${filter === 'negative' ? 'active' : ''}`}
                onClick={() => setFilter('negative')}
              >
                В минусе
              </button>
              <button
                className={`filter-tab ${filter === 'banned' ? 'active' : ''}`}
                onClick={() => setFilter('banned')}
              >
                В бане
              </button>
            </div>
          </div>
        </div>

        <div className="stats-bar">
          <div className="stat-chip active">
            <strong>{totalActive}</strong>
            <span>постоянных игроков</span>
          </div>
          <div className="stat-chip negative">
            <strong>{totalNegative}</strong>
            <span>с отрицательным балансом</span>
          </div>
          <div className="stat-chip banned">
            <strong>{totalBanned}</strong>
            <span>в бан-листе</span>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Ник / имя</th>
                <th>Контакты</th>
                <th>Статус</th>
                <th>Баланс</th>
                <th>Визиты</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="empty-row">
                    Игроки по выбранным условиям не найдены. Попробуй изменить фильтр или поиск.
                  </td>
                </tr>
              )}
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="nick">{p.nickname}</div>
                    <div className="name-sub">{p.name}</div>
                  </td>
                  <td>
                    <div className="contact">
                      {p.telegram && <span>Telegram: {p.telegram}</span>}
                      {p.phone && <span>Тел: {p.phone}</span>}
                    </div>
                  </td>
                  <td>
                    <span
                      className={[
                        'status-pill',
                        p.status === 'active'
                          ? 'status-active'
                          : p.status === 'negative'
                          ? 'status-negative'
                          : 'status-banned',
                      ].join(' ')}
                    >
                      {p.status === 'active' && '● Активный'}
                      {p.status === 'negative' && '⚠ В минусе'}
                      {p.status === 'banned' && '⛔ Бан'}
                    </span>
                  </td>
                  <td>
                    {p.balance > 0 && <span className="balance-pos">+{p.balance} ₸</span>}
                    {p.balance === 0 && <span className="balance-zero">0 ₸</span>}
                    {p.balance < 0 && <span className="balance-neg">{p.balance} ₸</span>}
                  </td>
                  <td>{p.visits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
