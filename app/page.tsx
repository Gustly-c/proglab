'use client'
import React, { JSX, useEffect, useRef, useState } from 'react'

type Todo = {
  id: number
  text: string
  done: boolean
}

export default function Page(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([])
  const [text, setText] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all')
  const idRef = useRef<number>(Date.now())

  useEffect(() => {
    try {
      const raw = localStorage.getItem('todos')
      if (raw) setTodos(JSON.parse(raw))
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function addTodo(e?: React.FormEvent) {
    e?.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    const next: Todo = { id: idRef.current++, text: trimmed, done: false }
    setTodos((s) => [next, ...s])
    setText('')
  }

  function toggle(id: number) {
    setTodos((s) => s.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function remove(id: number) {
    setTodos((s) => s.filter((t) => t.id !== id))
  }

  function clearCompleted() {
    setTodos((s) => s.filter((t) => !t.done))
  }

  const filtered = todos.filter((t) => (filter === 'all' ? true : filter === 'active' ? !t.done : t.done))
  const remaining = todos.filter((t) => !t.done).length

  return (
    <main style={{ fontFamily: 'Inter, Segoe UI, Roboto, system-ui', padding: 28, maxWidth: 760, margin: '0 auto' }}>
      <style>{`
        .card {
          background: linear-gradient(180deg, #fffefc, #fbfbff);
          border-radius: 12px;
          padding: 18px;
          box-shadow: 0 6px 20px rgba(17,24,39,0.06);
        }
        .title {
          margin: 0 0 6px 0;
          font-size: 22px;
          letter-spacing: -0.2px;
        }
        .subtitle { margin: 0 0 14px 0; color: #556; font-size: 13px }
        .bar {
          display:flex; gap:10px; align-items:center; margin-bottom:14px;
        }
        .input {
          flex:1; padding:10px 12px; font-size:15px; border-radius:10px; border:1px solid #e6e9ee;
          outline:none; transition: box-shadow .15s, border-color .15s;
        }
        .input:focus { box-shadow: 0 4px 18px rgba(59,130,246,0.12); border-color:#3b82f6; }
        .addBtn {
          background: linear-gradient(180deg,#3b82f6,#2563eb); color:white; border:none;
          padding:10px 14px; border-radius:10px; font-weight:600; cursor:pointer;
          box-shadow: 0 6px 20px rgba(37,99,235,0.18);
        }
        .addBtn:active { transform: translateY(1px); }
        .controls { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; gap:12px; flex-wrap:wrap }
        .filters { display:flex; gap:8px; }
        .chip {
          padding:7px 10px; border-radius:999px; font-size:13px; cursor:pointer; border:1px solid transparent;
          background:transparent;
        }
        .chip.active { background:#eef2ff; border-color:#c7d2fe; color:#3730a3; font-weight:600 }
        .todos { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px }
        .todo {
          display:flex; align-items:center; gap:12px; padding:12px; border-radius:10px;
          background: linear-gradient(180deg,#ffffff,#fbfdff);
          border:1px solid #f0f3f7;
          transition: transform .12s, box-shadow .12s, opacity .18s;
          animation: pop .16s ease;
        }
        @keyframes pop { from { transform: translateY(-6px); opacity:0 } to { transform:none; opacity:1 } }
        .todo:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(2,6,23,0.06) }
        .text { flex:1; font-size:15px; color:#0f172a }
        .text.done { text-decoration:line-through; color:#8b94a6 }
        .tiny { font-size:13px; color:#667085 }
        .danger { background:transparent; border:none; color:#ef4444; cursor:pointer; font-weight:600 }
        .empty { color:#94a3b8; padding:18px; text-align:center; border-radius:8px; background:#fbfcff; border:1px dashed #e6eef9 }
        .clear { background:transparent; border:none; color:#475569; cursor:pointer; font-size:13px }
        .count { font-size:13px; color:#475569 }
        .clearInputBtn { background:transparent; border:none; cursor:pointer; color:#64748b; font-size:14px; padding:6px }
      `}</style>

      <div className="card">
        <h1 className="title">Простой список задач</h1>
        <p className="subtitle">Добавляй, помечай, удаляй — и всё красиво.</p>

        <form onSubmit={addTodo} style={{ marginBottom: 12 }}>
          <div className="bar">
            <input
              className="input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Что нужно сделать? Нажми Enter чтобы добавить"
              aria-label="Новая задача"
            />
            {text && (
              <button type="button" className="clearInputBtn" onClick={() => setText('')} title="Очистить поле">
                ✕
              </button>
            )}
            <button type="submit" className="addBtn">
              Добавить
            </button>
          </div>
        </form>

        <div className="controls">
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div className="filters" role="tablist" aria-label="Фильтр задач">
              <button className={`chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
                Все
              </button>
              <button className={`chip ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>
                Активные
              </button>
              <button className={`chip ${filter === 'done' ? 'active' : ''}`} onClick={() => setFilter('done')}>
                Выполненные
              </button>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="clear" onClick={clearCompleted} title="Удалить все выполненные">
                Удалить выполненные
              </button>
              <button
                className="clear"
                onClick={() => {
                  if (todos.length) {
                    if (confirm('Очистить все задачи?')) setTodos([])
                  }
                }}
                title="Очистить всё"
              >
                Очистить всё
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div className="count">{remaining} — осталось</div>
            <div className="tiny">{todos.length} всего</div>
          </div>
        </div>

        <ul className="todos">
          {filtered.length === 0 && <li className="empty">Задач нет — добавь первую 😉</li>}
          {filtered.map((t) => (
            <li key={t.id} className="todo" role="listitem" aria-label={t.text}>
              <input
                id={`cb-${t.id}`}
                type="checkbox"
                checked={t.done}
                onChange={() => toggle(t.id)}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
                aria-label={`Отметить ${t.text}`}
              />
              <span className={`text ${t.done ? 'done' : ''}`}>{t.text}</span>
              <button
                onClick={() => remove(t.id)}
                aria-label={`Удалить ${t.text}`}
                className="danger"
                title="Удалить задачу"
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}