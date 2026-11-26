import { FormEvent, useMemo, useState } from "react";
import { createFix, readFixHistory, writeFixHistory, MAX_PROBLEM_LENGTH, type Fix } from "./lib/fix-engine";

const categories = [
  ["Home & Repairs", "🔧", "Leaks, repairs, appliances, rooms"],
  ["Money & Bills", "💵", "Bills, payments, debt, budgeting"],
  ["Work & Jobs", "💼", "Job searches, work problems, next steps"],
  ["Technology", "💻", "Phones, accounts, Wi-Fi, apps"],
  ["Travel", "🧳", "Trips, bookings, travel problems"],
  ["Relationships", "💬", "Communication and difficult situations"],
  ["Organization", "📋", "Tasks, clutter, planning, routines"],
  ["Other", "🧰", "Anything that does not fit a category"],
] as const;

function downloadFix(fix: Fix) {
  const lines = [
    "LIFE FIX AI",
    fix.title,
    "",
    `Problem: ${fix.problem}`,
    `Category: ${fix.category}`,
    `Priority: ${fix.urgency}`,
    "",
    "PLAN",
    ...fix.steps.map((step, i) => `${i + 1}. ${step}`),
    "",
    "WATCH OUT FOR",
    ...fix.watch.map((item) => `• ${item}`),
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "life-fix-plan.txt";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function App() {
  const [problem, setProblem] = useState("");
  const [category, setCategory] = useState("Other");
  const [history, setHistory] = useState<Fix[]>(readFixHistory);
  const [active, setActive] = useState<Fix | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [storageWarning, setStorageWarning] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  const recent = useMemo(() => history.slice(0, 5), [history]);

  function save(fix: Fix) {
    const next = [fix, ...history.filter((item) => item.id !== fix.id)].slice(0, 50);
    setHistory(next);
    setStorageWarning(!writeFixHistory(next));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!problem.trim()) return;
    const fix = createFix(problem.trim(), category);
    save(fix);
    setActive(fix);
    setShowHistory(false);
    setProblem("");
  }

  function chooseCategory(nextCategory: string) {
    setCategory(nextCategory);
    setShowHistory(false);
    setActive(null);
    document.getElementById("problem")?.focus();
  }

  function deleteFix(id: string) {
    const next = history.filter((fix) => fix.id !== id);
    setHistory(next);
    setStorageWarning(!writeFixHistory(next));
    if (active?.id === id) setActive(null);
  }

  async function copyPlan(fix: Fix) {
    const text = [`LIFE FIX AI: ${fix.title}`, `Problem: ${fix.problem}`, "", "PLAN", ...fix.steps.map((step, i) => `${i + 1}. ${step}`), "", "WATCH OUT FOR", ...fix.watch].join("\n");
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      setCopyStatus("Plan copied.");
    } catch {
      setCopyStatus("Clipboard access is unavailable. Use Save plan to device instead.");
    }
  }

  function clearHistory() {
    setHistory([]);
    try {
      localStorage.removeItem("life-fix-history");
    } catch {
      // Storage may be unavailable in privacy-restricted browser modes.
    }
    setActive(null);
  }

  return (
    <div className="app">
      <header className="topbar">
        <button className="brand" onClick={() => { setActive(null); setShowHistory(false); }} aria-label="Life Fix AI home">
          <span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M19.8 5.2a7 7 0 0 0-8.1 8.1l-6.1 6.1a3.2 3.2 0 0 0 4.5 4.5l6.1-6.1a7 7 0 0 0 8.1-8.1l-4.2 4.2-4.3-1.2-1.2-4.3 4.2-3.2Z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><path d="m24.8 4.2.7 2.2 2.3.7-2.3.7-.7 2.2-.7-2.2-2.3-.7 2.3-.7.7-2.2Z" fill="currentColor"/></svg></span>
          <span>Life Fix <b>AI</b></span>
        </button>
        <nav>
          <button onClick={() => { setActive(null); setShowHistory(false); }}>New fix</button>
          <button onClick={() => { setActive(null); setShowHistory(true); }}>My fixes{history.length ? ` (${history.length})` : ""}</button>
        </nav>
      </header>

      <main className="container">
        {!showHistory && !active && (
          <section className="hero">
            <div className="eyebrow">PRACTICAL HELP, WITHOUT THE RUNAROUND</div>
            <h1>When life feels broken,<br /><span>let's fix what we can.</span></h1>
            <p className="hero-copy">When life needs fixing, Life Fix AI helps you turn everyday problems into clear, practical next steps.</p>

            <form className="fix-card" onSubmit={submit}>
              <label htmlFor="problem">What are you dealing with?</label>
              <textarea id="problem" maxLength={MAX_PROBLEM_LENGTH} value={problem} onChange={(e) => setProblem(e.target.value)} placeholder="Example: My kitchen sink is draining slowly and I don't know what to try first." rows={5} />
              <div className="form-row">
                <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Problem category">
                  {categories.map(([name]) => <option key={name}>{name}</option>)}
                </select>
                <button className="primary" disabled={!problem.trim()}>Build my fix →</button>
              </div>
              <p className="form-hint" aria-live="polite">{problem.length}/{MAX_PROBLEM_LENGTH} characters{storageWarning ? " · Your browser could not save history; your current plan is still available." : ""}</p>
            </form>

            <div className="category-section">
              <div className="section-head"><h2>Start with a category</h2><span>Tap one to get going</span></div>
              <div className="category-grid">
                {categories.map(([name, icon, description]) => (
                  <button className="category-card" key={name} onClick={() => chooseCategory(name)}>
                    <span className="category-icon">{icon}</span>
                    <strong>{name}</strong>
                    <small>{description}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="safety"><span>⚠️</span><span><b>Safety first:</b> Life Fix AI provides general information, not emergency, medical, legal, financial, or professional advice.</span></div>

            {recent.length > 0 && (
              <section className="recent">
                <div className="section-head"><h2>Recent fixes</h2><button onClick={() => setShowHistory(true)}>View all</button></div>
                <div className="recent-grid">{recent.map((fix) => (
                  <button className="recent-card" key={fix.id} onClick={() => setActive(fix)}>
                    <small>{fix.category}</small><strong>{fix.title}</strong><span>{fix.problem}</span>
                  </button>
                ))}</div>
              </section>
            )}
          </section>
        )}

        {active && !showHistory && (
          <section className="result">
            <button className="back" onClick={() => setActive(null)}>← Start another fix</button>
            <div className="result-head">
              <div><span className="pill">{active.category}</span><span className={`urgency ${active.urgency.toLowerCase()}`}>{active.urgency} priority</span></div>
              <h1>{active.title}</h1><p>{active.summary}</p>
            </div>
            {active.urgency === "High" && <div className="danger">🛑 <b>Safety notice:</b> Stop and get appropriate emergency or professional assistance if there is immediate danger.</div>}
            <div className="problem-box"><small>YOUR PROBLEM</small><p>{active.problem}</p></div>
            <div className="result-grid">
              <article className="panel"><h2>✓ Step-by-step plan</h2><ol>{active.steps.map((step, i) => <li key={step}><span>{i + 1}</span><p>{step}</p></li>)}</ol></article>
              <article className="panel"><h2>⚠ Things to watch</h2><ul>{active.watch.map((item) => <li key={item}>{item}</li>)}</ul></article>
            </div>
            <div className="result-actions" aria-live="polite">
              <button className="secondary" onClick={() => downloadFix(active)}>Save plan to device</button>
              <button className="secondary" onClick={() => void copyPlan(active)}>Copy plan</button>
              <button className="primary" onClick={() => { setActive(null); setShowHistory(false); setCopyStatus(""); }}>Fix another problem</button>
              {copyStatus && <p role="status" className="copy-status">{copyStatus}</p>}
            </div>
          </section>
        )}

        {showHistory && (
          <section className="history">
            <div className="section-head"><div><div className="eyebrow">YOUR SAVED FIXES</div><h1>Fix history</h1></div>{history.length > 0 && <button className="danger-text" onClick={clearHistory}>Clear history</button>}</div>
            {history.length === 0 ? <div className="empty"><div>🧰</div><h2>No saved fixes yet</h2><p>Your fixes stay on this device so you can come back to them.</p><button className="primary" onClick={() => setShowHistory(false)}>Create your first fix</button></div> :
              <div className="history-list">{history.map((fix) => (
                <div className="history-item" key={fix.id}>
                  <button className="history-open" onClick={() => { setActive(fix); setShowHistory(false); }}><div><span className="pill">{fix.category}</span><h2>{fix.title}</h2><p>{fix.problem}</p></div><span>→</span></button>
                  <button className="delete" onClick={() => deleteFix(fix.id)} aria-label={`Delete ${fix.title}`}>×</button>
                </div>
              ))}</div>}
          </section>
        )}
      </main>

      <footer><div><b>Life Fix <span>AI</span></b><p>Practical, step-by-step help for everyday problems.</p></div><p>© {new Date().getFullYear()} Life Fix AI · Your fixes stay in this browser.</p></footer>
    </div>
  );
}
