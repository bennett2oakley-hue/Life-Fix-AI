import { FormEvent, useMemo, useState } from "react";

type Fix = {
  id: string;
  problem: string;
  category: string;
  createdAt: string;
  urgency: "Low" | "Medium" | "High";
  title: string;
  summary: string;
  steps: string[];
  watch: string[];
};

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

function readHistory(): Fix[] {
  try {
    const saved = localStorage.getItem("life-fix-history");
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeHistory(history: Fix[]) {
  try {
    localStorage.setItem("life-fix-history", JSON.stringify(history));
    return true;
  } catch {
    return false;
  }
}

function makeFix(problem: string, category: string): Fix {
  const text = problem.toLowerCase();
  const urgent = /fire|gas leak|smoke|electrical spark|danger|bleeding|self-harm|suicide|poison/.test(text);
  const money = category === "Money & Bills" || /bill|rent|debt|money|payment|cash/.test(text);
  const home = category === "Home & Repairs" || /leak|plumb|toilet|sink|water|heater|roof|wall|door|electric|breaker/.test(text);
  const tech = category === "Technology" || /phone|computer|wifi|internet|app|password|account|login/.test(text);
  const work = category === "Work & Jobs" || /job|work|resume|interview|employer|boss/.test(text);
  const travel = category === "Travel" || /hotel|flight|trip|travel|reservation|airport/.test(text);

  let title = "A practical plan for your problem";
  let summary = "Let's turn the problem into a few manageable actions, starting with the safest and simplest option.";
  let steps = [
    "Write down exactly what is happening, what changed, and what outcome you need.",
    "Handle the lowest-risk, lowest-cost step first and check whether the problem improves.",
    "If that does not work, move to the next step rather than changing several things at once.",
    "Record what worked so you have a repeatable fix next time.",
  ];
  let watch = [
    "Do not spend money before confirming that the purchase or service is actually necessary.",
    "If the situation becomes unsafe or outside your experience, stop and get qualified help.",
  ];

  if (urgent) {
    title = "Safety first";
    summary = "The details you entered may involve an immediate safety risk. Get people to a safe place and use emergency or professional help when appropriate.";
    steps = [
      "Stop the activity that could make the situation worse.",
      "Move yourself and other people away from the immediate hazard if you can do so safely.",
      "Contact the appropriate emergency service, utility provider, or qualified professional for the situation.",
      "Only return to the problem after it has been declared safe.",
    ];
    watch = ["Life Fix AI is not an emergency service. Never use this app instead of emergency assistance."];
  } else if (money) {
    title = "A money problem you can work through";
    summary = "Start by protecting essentials, getting the exact numbers, and contacting the company before the situation snowballs.";
    steps = [
      "List the amount due, due date, current balance, and the consequence of missing the payment.",
      "Protect essentials first: housing, utilities, food, transportation, and necessary medical needs.",
      "Contact the biller and ask about hardship plans, extensions, payment arrangements, or fee waivers.",
      "Write down the name of the person you spoke with, the date, and any agreement made.",
    ];
    watch = ["Avoid high-cost borrowing when a payment arrangement or assistance program is available."];
  } else if (home) {
    title = "Troubleshoot it without making it worse";
    summary = "Start with the obvious, safe checks before buying parts or calling someone out.";
    steps = [
      "Shut off power, water, or another supply first if the problem could create a hazard.",
      "Inspect the simplest likely cause: loose connection, blocked opening, tripped breaker, worn seal, or visible damage.",
      "Make one small change at a time and test the result.",
      "If the fix requires specialized tools, permits, or work inside a live electrical or gas system, call a qualified professional.",
    ];
    watch = ["Never work on live electrical wiring or gas equipment unless you are qualified to do so."];
  } else if (tech) {
    title = "A simple tech troubleshooting path";
    summary = "We can narrow most everyday tech problems down by checking the basics in order.";
    steps = [
      "Restart the device or app and confirm the problem is still happening.",
      "Check the connection, permissions, storage, updates, and account status.",
      "Try the same action once on another device or network to isolate the cause.",
      "If an account is involved, use the service's official recovery or support process rather than sharing your password.",
    ];
    watch = ["Never give Life Fix AI or anyone else your passwords, verification codes, or recovery phrases."];
  } else if (work) {
    title = "Turn the work problem into a next move";
    summary = "Get clear on the immediate goal, then create one small action you can complete today.";
    steps = [
      "Define the immediate outcome you need: a job lead, interview, conversation, deadline, or problem resolution.",
      "Gather the information you need before contacting anyone, such as your resume, dates, account details, or notes.",
      "Take one direct action today, such as applying, following up, asking a clear question, or documenting the issue.",
      "Keep a short record of who you contacted, when, and what the next step is.",
    ];
    watch = ["Do not share sensitive personal information with an unverified employer or recruiter."];
  } else if (travel) {
    title = "Get the travel problem under control";
    summary = "Separate what must be fixed immediately from what can wait until after you are safely on your way.";
    steps = [
      "Confirm the reservation, booking number, time, location, and the exact problem.",
      "Contact the official provider first and ask for the available recovery options.",
      "Keep screenshots, receipts, confirmation numbers, and names of representatives you speak with.",
      "If you are stranded or unsafe, prioritize transportation and a safe place to stay before cost optimization.",
    ];
    watch = ["Use official airline, hotel, rental, or transportation contact channels when handling account or payment information."];
  }

  return {
    id: crypto.randomUUID(),
    problem,
    category,
    createdAt: new Date().toISOString(),
    urgency: urgent ? "High" : category === "Money & Bills" ? "Medium" : "Low",
    title,
    summary,
    steps,
    watch,
  };
}

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
  URL.revokeObjectURL(url);
}

export default function App() {
  const [problem, setProblem] = useState("");
  const [category, setCategory] = useState("Other");
  const [history, setHistory] = useState<Fix[]>(readHistory);
  const [active, setActive] = useState<Fix | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const recent = useMemo(() => history.slice(0, 5), [history]);

  function save(fix: Fix) {
    const next = [fix, ...history.filter((item) => item.id !== fix.id)].slice(0, 50);
    setHistory(next);
    writeHistory(next);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!problem.trim()) return;
    const fix = makeFix(problem.trim(), category);
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
    writeHistory(next);
    if (active?.id === id) setActive(null);
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
              <textarea id="problem" value={problem} onChange={(e) => setProblem(e.target.value)} placeholder="Example: My kitchen sink is draining slowly and I don't know what to try first." rows={5} />
              <div className="form-row">
                <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Problem category">
                  {categories.map(([name]) => <option key={name}>{name}</option>)}
                </select>
                <button className="primary" disabled={!problem.trim()}>Build my fix →</button>
              </div>
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
            <div className="result-actions">
              <button className="secondary" onClick={() => downloadFix(active)}>Save plan to device</button>
              <button className="secondary" onClick={() => { navigator.clipboard?.writeText([`LIFE FIX AI: ${active.title}`, `Problem: ${active.problem}`, "", "PLAN", ...active.steps.map((s, i) => `${i + 1}. ${s}`), "", "WATCH OUT FOR", ...active.watch].join("\n")); }}>Copy plan</button>
              <button className="primary" onClick={() => { setActive(null); setShowHistory(false); }}>Fix another problem</button>
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
