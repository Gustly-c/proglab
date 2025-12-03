'use client'
import React, { JSX, useState } from 'react'

type Zone = 'pc' | 'ps' | 'vip'

type Slot = {
  id: number
  nickname: string
  seat: string
  zone: Zone
  from: string
  to: string
  status: 'Играет' | 'Ожидает' | 'Завершил'
}

const SLOTS: Slot[] = [
  { id: 1, nickname: 'XxDarkSoulxX', seat: 'PC-07', zone: 'pc', from: '18:00', to: '20:00', status: 'Играет' },
  { id: 2, nickname: 'Luna',         seat: 'PS5-02', zone: 'ps', from: '18:30', to: '19:30', status: 'Играет' },
  { id: 3, nickname: 'PlayerOne',    seat: 'PC-03',  zone: 'pc', from: '19:00', to: '21:00', status: 'Ожидает' },
  { id: 4, nickname: 'Ghost',        seat: 'VIP-01', zone: 'vip',from: '19:00', to: '22:00', status: 'Играет' },
  { id: 5, nickname: 'NoName',       seat: 'PS5-01', zone: 'ps', from: '20:00', to: '21:00', status: 'Ожидает' },
]

export default function Page(): JSX.Element {
  const [zoneFilter, setZoneFilter] = useState<Zone | 'all'>('all')

  const filteredSlots =
    zoneFilter === 'all' ? SLOTS : SLOTS.filter((s) => s.zone === zoneFilter)

  const busyPc = SLOTS.filter((s) => s.zone === 'pc' && s.status !== 'Завершил').length
  const busyPs = SLOTS.filter((s) => s.zone === 'ps' && s.status !== 'Завершил').length
  const busyVip = SLOTS.filter((s) => s.zone === 'vip' && s.status !== 'Завершил').length

  return (
    <main
      style={{
        fontFamily: 'Inter, Segoe UI, Roboto, system-ui',
        minHeight: '100vh',
        padding: 28,
        maxWidth: 1120,
        margin: '0 auto',
        color: '#e5e7eb',
        position: 'relative',
      }}
    >
      <style>{`
        body { background:#020617; }

        .bg-glow {
          position: fixed;
          inset: 0;
          pointer-events:none;
          z-index:-1;
          background:
            radial-gradient(circle at 0% 0%, rgba(129,140,248,0.24), transparent 55%),
            radial-gradient(circle at 100% 100%, rgba(56,189,248,0.18), transparent 55%),
            radial-gradient(circle at 100% 0%, rgba(244,63,94,0.12), transparent 55%),
            linear-gradient(180deg, #020617 0%, #020617 40%, #020617 100%);
        }

        .shell {
          border-radius: 22px;
          padding: 22px 22px 26px;
          background: radial-gradient(circle at 0 0, rgba(248,250,252,0.06), transparent 55%)
                      , rgba(15,23,42,0.94);
          border: 1px solid rgba(148,163,184,0.18);
          box-shadow:
            0 18px 55px rgba(15,23,42,0.9),
            0 0 0 1px rgba(15,23,42,0.9);
          backdrop-filter: blur(18px);
        }

        .top {
          display:flex;
          gap:18px;
          align-items:stretch;
          flex-wrap:wrap;
          margin-bottom:18px;
        }

        .hero {
          flex:1.4;
          min-width:260px;
          border-radius:18px;
          padding:20px 20px 18px;
          background:
            radial-gradient(circle at 20% 0%, rgba(129,140,248,0.45), transparent 60%),
            radial-gradient(circle at 100% 100%, rgba(56,189,248,0.35), transparent 60%),
            linear-gradient(135deg,#020617 0%,#020617 40%,#020617 100%);
          border: 1px solid rgba(148,163,184,0.28);
          position:relative;
          overflow:hidden;
        }

        .hero::after {
          content:'';
          position:absolute;
          inset:0;
          background:
            radial-gradient(circle at 80% 0%, rgba(59,130,246,0.16), transparent 55%);
          mix-blend-mode:screen;
          opacity:0.8;
          pointer-events:none;
        }

        .hero-title {
          margin:0 0 4px 0;
          font-size:24px;
          letter-spacing:-0.03em;
          display:flex;
          align-items:center;
          gap:8px;
        }

        .hero-badge {
          font-size:11px;
          padding:3px 7px;
          border-radius:999px;
          border:1px solid rgba(129,140,248,0.7);
          color:#e0e7ff;
          background:rgba(15,23,42,0.7);
        }

        .hero-sub {
          margin:0 0 12px 0;
          font-size:13px;
          color:#9ca3af;
        }

        .hero-row {
          display:flex;
          gap:12px;
          align-items:center;
          flex-wrap:wrap;
          margin-top:8px;
        }

        .hero-btn-main {
          border:none;
          border-radius:999px;
          padding:9px 16px;
          font-size:13px;
          font-weight:600;
          cursor:pointer;
          color:white;
          background:
            linear-gradient(120deg,#4f46e5,#6366f1,#22c55e);
          background-size:180% 180%;
          box-shadow:0 10px 35px rgba(79,70,229,0.55);
          transition: transform .12s, box-shadow .12s, background-position .6s;
        }
        .hero-btn-main:hover {
          transform:translateY(-1px);
          background-position: 100% 0;
          box-shadow:0 14px 40px rgba(79,70,229,0.7);
        }

        .hero-btn-ghost {
          border-radius:999px;
          padding:8px 14px;
          border:1px solid rgba(148,163,184,0.6);
          background:rgba(15,23,42,0.7);
          color:#e5e7eb;
          cursor:pointer;
          font-size:13px;
        }

        .hero-tagline {
          display:flex;
          gap:10px;
          align-items:center;
          margin-top:12px;
          font-size:11px;
          color:#9ca3af;
        }

        .hero-dot {
          width:7px;
          height:7px;
          border-radius:999px;
          background:radial-gradient(circle,#22c55e,#16a34a);
          box-shadow:0 0 0 5px rgba(34,197,94,0.25);
        }

        .hero-mini {
          font-size:11px;
          color:#cbd5f5;
        }

        .hero-aside {
          flex:1;
          min-width:240px;
          border-radius:18px;
          padding:14px 14px 12px;
          background:
            radial-gradient(circle at 0 0, rgba(248,250,252,0.12), transparent 55%),
            linear-gradient(145deg, #020617, #020617);
          border:1px solid rgba(148,163,184,0.25);
        }

        .hero-aside-title {
          margin:0 0 10px 0;
          font-size:13px;
          color:#cbd5f5;
          display:flex;
          justify-content:space-between;
          align-items:center;
        }

        .pill {
          display:inline-flex;
          align-items:center;
          gap:6px;
          padding:5px 9px;
          border-radius:999px;
          font-size:11px;
          border:1px solid rgba(129,140,248,0.6);
          background:rgba(15,23,42,0.7);
          color:#e5e7eb;
        }

        .pill-dot {
          width:8px;
          height:8px;
          border-radius:999px;
          background:radial-gradient(circle,#22c55e,#16a34a);
        }

        .stats {
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          gap:10px;
        }

        .stat-card {
          border-radius:14px;
          padding:10px 10px 9px;
          background:radial-gradient(circle at 0 0,rgba(148,163,184,0.18),transparent 60%);
          border:1px solid rgba(148,163,184,0.35);
        }

        .stat-label {
          font-size:11px;
          color:#9ca3af;
          margin-bottom:2px;
        }

        .stat-value {
          font-size:17px;
          font-weight:600;
          display:flex;
          align-items:baseline;
          gap:5px;
        }

        .stat-chip {
          font-size:10px;
          padding:2px 6px;
          border-radius:999px;
          background:rgba(22,163,74,0.14);
          color:#bbf7d0;
        }

        .stat-chip-red {
          background:rgba(248,113,113,0.14);
          color:#fecaca;
        }

        .stat-foot {
          font-size:10px;
          color:#64748b;
          margin-top:3px;
        }

        .bottom {
          display:grid;
          grid-template-columns: minmax(0,1.7fr) minmax(0,1fr);
          gap:18px;
          margin-top:6px;
        }

        @media (max-width: 900px) {
          .bottom {
            grid-template-columns:minmax(0,1fr);
          }
        }

        .block {
          border-radius:18px;
          padding:14px 14px 16px;
          background:radial-gradient(circle at 0 0, rgba(248,250,252,0.06), transparent 60%);
          border:1px solid rgba(148,163,184,0.2);
        }

        .block-header {
          display:flex;
          justify-content:space-between;
          align-items:center;
          margin-bottom:10px;
          gap:10px;
        }

        .block-title {
          font-size:14px;
          font-weight:600;
          display:flex;
          align-items:center;
          gap:8px;
        }

        .block-sub {
          font-size:11px;
          color:#9ca3af;
        }

        .badge-soft {
          font-size:11px;
          padding:3px 7px;
          border-radius:999px;
          background:rgba(15,23,42,0.9);
          border:1px solid rgba(148,163,184,0.5);
        }

        .filter-tabs {
          display:inline-flex;
          gap:6px;
          padding:3px;
          border-radius:999px;
          background:rgba(15,23,42,0.8);
          border:1px solid rgba(51,65,85,0.8);
        }

        .filter-tab {
          padding:4px 9px;
          border-radius:999px;
          font-size:11px;
          border:none;
          cursor:pointer;
          background:transparent;
          color:#9ca3af;
        }

        .filter-tab.active {
          background:rgba(15,23,42,0.9);
          color:#e5e7eb;
          box-shadow:0 0 0 1px rgba(129,140,248,0.5), 0 8px 22px rgba(15,23,42,0.7);
        }

        table {
          width:100%;
          border-collapse:collapse;
          font-size:12px;
        }

        thead tr {
          color:#9ca3af;
        }

        th, td {
          padding:7px 6px;
          text-align:left;
        }

        thead th {
          font-weight:500;
          border-bottom:1px solid rgba(51,65,85,0.9);
        }

        tbody tr {
          border-bottom:1px solid rgba(15,23,42,0.9);
        }

        tbody tr:last-child {
          border-bottom:none;
        }

        tbody tr:hover {
          background:rgba(15,23,42,0.9);
        }

        .seat {
          font-size:11px;
          color:#9ca3af;
        }

        .status-pill {
          font-size:11px;
          border-radius:999px;
          padding:3px 7px;
          display:inline-flex;
          align-items:center;
          gap:4px;
        }

        .status-live {
          background:rgba(34,197,94,0.12);
          color:#bbf7d0;
        }

        .status-wait {
          background:rgba(59,130,246,0.12);
          color:#bfdbfe;
        }

        .status-done {
          background:rgba(148,163,184,0.2);
          color:#e5e7eb;
        }

        .zone-pill {
          font-size:10px;
          border-radius:999px;
          padding:2px 6px;
          border:1px solid rgba(148,163,184,0.5);
          color:#e5e7eb;
        }

        .zone-pill.pc { border-color:#6366f1; }
        .zone-pill.ps { border-color:#ec4899; }
        .zone-pill.vip { border-color:#22c55e; }

        .tasks-list {
          list-style:none;
          padding:0;
          margin:0;
          display:flex;
          flex-direction:column;
          gap:8px;
          font-size:12px;
        }

        .task-item {
          display:flex;
          gap:8px;
          padding:9px 9px;
          border-radius:12px;
          background:rgba(15,23,42,0.9);
          border:1px solid rgba(51,65,85,0.9);
        }

        .task-dot {
          width:10px;
          margin-top:1px;
        }

        .task-dot-inner {
          width:7px;
          height:7px;
          border-radius:999px;
          background:radial-gradient(circle,#22c55e,#16a34a);
        }

        .task-title {
          font-size:12px;
        }

        .task-meta {
          font-size:10px;
          color:#9ca3af;
          margin-top:2px;
        }

        .task-tag {
          display:inline-flex;
          align-items:center;
          gap:4px;
          border-radius:999px;
          padding:2px 6px;
          background:rgba(79,70,229,0.18);
          color:#c7d2fe;
          font-size:10px;
          margin-top:4px;
        }

        .timeline {
          margin-top:10px;
          border-radius:12px;
          padding:9px 10px;
          background:rgba(15,23,42,0.9);
          border:1px dashed rgba(75,85,99,0.9);
          font-size:11px;
          color:#9ca3af;
        }

        .timeline strong {
          color:#e5e7eb;
        }

        .logo-chip {
          display:inline-flex;
          align-items:center;
          gap:6px;
          padding:5px 9px;
          border-radius:999px;
          font-size:11px;
          background:rgba(15,23,42,0.8);
          border:1px solid rgba(51,65,85,0.9);
        }

        .logo-icon {
          width:18px;
          height:18px;
          border-radius:7px;
          background:
            conic-gradient(from 200deg, #4f46e5, #22c55e, #06b6d4, #f97316,#4f46e5);
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .logo-icon-inner {
          width:12px;
          height:12px;
          border-radius:4px;
          background:#020617;
          box-shadow:0 0 0 1px rgba(15,23,42,0.9);
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:9px;
          color:#e5e7eb;
          font-weight:700;
        }

        .sparkline {
          margin-top:4px;
          height:26px;
          border-radius:9px;
          background:linear-gradient(90deg, rgba(79,70,229,0.45), rgba(6,182,212,0.35));
          position:relative;
          overflow:hidden;
        }

        .sparkline::after {
          content:'';
          position:absolute;
          inset:0;
          background-image:linear-gradient(90deg, rgba(15,23,42,0.2) 1px, transparent 1px);
          background-size:10px 100%;
          opacity:0.25;
        }
      `}</style>

      <div className="bg-glow" />

      <div className="shell">
        {/* Верхняя часть: заголовок + сводка по смене */}
        <div className="top">
          <section className="hero">
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <h1 className="hero-title">
                    <span>CyberFox Club</span>
                    <span className="hero-badge">Панель смены</span>
                  </h1>
                  <p className="hero-sub">
                    Следи за загрузкой ПК и консолей, бронированиями и задачами администратора — всё в одном окне.
                  </p>
                </div>
                <div className="logo-chip">
                  <div className="logo-icon">
                    <div className="logo-icon-inner">CF</div>
                  </div>
                  <span>CRM компьютерного клуба</span>
                </div>
              </div>

              <div className="hero-row">
                <button className="hero-btn-main">+ Новое бронирование</button>
                <button className="hero-btn-ghost">Открыть кассу</button>
              </div>

              <div className="hero-tagline">
                <span className="hero-dot" />
                <span>Онлайн: 3 группы игроков · Режим смены до 08:00</span>
              </div>
              <div className="hero-mini">
                Горячие тарифы: Ночь фулл ПК · PS5 Co-op · VIP-комната с проектором
              </div>
            </div>
          </section>

          <aside className="hero-aside">
            <div className="hero-aside-title">
              <span>Сводка по смене</span>
              <span className="pill">
                <span className="pill-dot" />
                Сейчас в игре
              </span>
            </div>

            <div className="stats">
              <div className="stat-card">
                <div className="stat-label">ПК-зона</div>
                <div className="stat-value">
                  {busyPc}/10
                  <span className="stat-chip">Онлайн</span>
                </div>
                <div className="stat-foot">Киберкатка в самом разгаре</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">PS-зона</div>
                <div className="stat-value">
                  {busyPs}/4
                  <span className="stat-chip-red">Турнир</span>
                </div>
                <div className="stat-foot">FIFA, UFC, Mortal Kombat</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">VIP-комната</div>
                <div className="stat-value">
                  {busyVip}/1
                  <span className="stat-chip">Занята</span>
                </div>
                <div className="stat-foot">Пакет &laquo;Ночная сессия&raquo;</div>
              </div>
            </div>

            <div className="sparkline" />
          </aside>
        </div>

        {/* Нижняя часть: бронирования + задачи администратора */}
        <div className="bottom">
          <section className="block" aria-label="Список активных сеансов">
            <header className="block-header">
              <div>
                <div className="block-title">
                  Активные сеансы
                  <span className="badge-soft">Сегодня</span>
                </div>
                <div className="block-sub">
                  Кто сейчас играет, на каком месте и до скольки — быстрое представление для администратора.
                </div>
              </div>
              <div className="filter-tabs" role="tablist">
                <button
                  className={`filter-tab ${zoneFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setZoneFilter('all')}
                >
                  Все
                </button>
                <button
                  className={`filter-tab ${zoneFilter === 'pc' ? 'active' : ''}`}
                  onClick={() => setZoneFilter('pc')}
                >
                  ПК
                </button>
                <button
                  className={`filter-tab ${zoneFilter === 'ps' ? 'active' : ''}`}
                  onClick={() => setZoneFilter('ps')}
                >
                  PS
                </button>
                <button
                  className={`filter-tab ${zoneFilter === 'vip' ? 'active' : ''}`}
                  onClick={() => setZoneFilter('vip')}
                >
                  VIP
                </button>
              </div>
            </header>

            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Ник игрока</th>
                    <th>Место</th>
                    <th>Зона</th>
                    <th>Время</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSlots.map((slot) => (
                    <tr key={slot.id}>
                      <td>
                        {slot.nickname}
                        <div className="seat">Бронь #{slot.id.toString().padStart(3, '0')}</div>
                      </td>
                      <td>{slot.seat}</td>
                      <td>
                        <span className={`zone-pill ${slot.zone}`}>
                          {slot.zone === 'pc' && 'ПК-зона'}
                          {slot.zone === 'ps' && 'PS-зона'}
                          {slot.zone === 'vip' && 'VIP'}
                        </span>
                      </td>
                      <td>
                        {slot.from} — {slot.to}
                      </td>
                      <td>
                        <span
                          className={`status-pill ${
                            slot.status === 'Играет'
                              ? 'status-live'
                              : slot.status === 'Ожидает'
                              ? 'status-wait'
                              : 'status-done'
                          }`}
                        >
                          {slot.status === 'Играет' && '●'}
                          {slot.status === 'Ожидает' && '◎'}
                          {slot.status === 'Завершил' && '✔'}
                          {slot.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredSlots.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ paddingTop: 14, paddingBottom: 12, textAlign: 'center', color: '#6b7280' }}>
                        В этой зоне пока нет бронирований — самое время запустить акцию 🎮
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <aside className="block" aria-label="Задачи администратора">
            <header className="block-header">
              <div>
                <div className="block-title">
                  Задачи администратора
                  <span className="badge-soft">Чек-лист смены</span>
                </div>
                <div className="block-sub">
                  Минимальный набор дел, чтобы смена прошла идеально.
                </div>
              </div>
            </header>

            <ul className="tasks-list">
              <li className="task-item">
                <div className="task-dot">
                  <div className="task-dot-inner" />
                </div>
                <div>
                  <div className="task-title">Проверить чистоту и состояние всех ПК и геймпадов</div>
                  <div className="task-meta">До 19:00 · отметить проблемные места в журнале</div>
                  <div className="task-tag">Гигиена и комфорт</div>
                </div>
              </li>
              <li className="task-item">
                <div className="task-dot">
                  <div className="task-dot-inner" />
                </div>
                <div>
                  <div className="task-title">Запустить вечерний турнир по CS2 / Valorant</div>
                  <div className="task-meta">Анонс в Telegram + напомнить игрокам в зале</div>
                  <div className="task-tag">Маркетинг · Турниры</div>
                </div>
              </li>
              <li className="task-item">
                <div className="task-dot">
                  <div className="task-dot-inner" />
                </div>
                <div>
                  <div className="task-title">Сверить онлайн-бронь с фактическим присутствием</div>
                  <div className="task-meta">Отметить неявки, освободить места под walk-in гостей</div>
                  <div className="task-tag">Контроль посадки</div>
                </div>
              </li>
            </ul>

            <div className="timeline">
              <strong>План на ночь:</strong> c 00:00 по 06:00 — ночной тариф, с 06:00 по 07:30 — уборка и перезапуск
              всех станций, к 08:00 смена готова к открытию.
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
