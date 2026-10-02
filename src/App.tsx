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

const starterFixes: Fix[] = JSON.parse(localStorage.getItem("life-fix-history") || "[]");

const categories = [
  "Home & Repairs",
  "Money & Bills",
  "Work & Jobs",
  "Technology",
  "Travel",
  "Relationships",
  "Organization",
  "Other",
];

function makeFix(problem: string, category: string): Fix {
  const text = problem.toLowerCase();
  const urgent = /fire|gas leak|smoke|electrical spark|danger|bleeding|self-harm|suicide|poison/.test(text);
  const money = category === "Money & Bills" || /bill|rent|debt|money|payment|cash/.test(text);
  const home = category === "Home & Repairs" || /leak|plumb|toilet|sink|water|heater|roof|wall|door|electric|breaker/.test(text);
  const tech = category === "Technology" || /phone|computer|wifi|internet|app|password|account|login/.test(text);

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

export default function App() {
  const [problem, setProblem] = useState("");
  const [category, setCategory] = useState("Other");
  const [history, setHistory] = useState<Fix[]>(starterFixes);
  const [active, setActive] = useState<Fix | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const recent = useMemo(() => history.slice(0, 5), [history]);

  function save(fix: Fix) {
    const next = [fix, ...history].slice(0, 25);
    setHistory(next);
    localStorage.setItem("life-fix-history", JSON.stringify(next));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!problem.trim()) return;
    const fix = makeFix(problem.trim(), category);
    save(fix);
    setActive(fix);
    setProblem("");
  }

  function clearHistory() {
    setHistory([]);
    localStorage.removeItem("life-fix-history");
    setActive(null);
  }

  return (
    <div className="app">
      <header className="topbar">
        <button className="brand" onClick={() => { setActive(null); setShowHistory(false); }} aria-label="Life Fix AI home">
          <span className="brand-mark">🔧</span>
          <span>Life Fix <b>AI</b></span>
        </button>
        <nav>
          <button onClick={() => setShowHistory(false)}>New fix</button>
          <button onClick={() => setShowHistory(true)}>My fixes{history.length ? ` (${history.length})` : ""}</button>
        </nav>
      </header>

      <main className="container">
        {!showHistory && !active && (
          <section className="hero">
            <div className="eyebrow">PRACTICAL HELP, WITHOUT THE RUNAROUND</div>
            <h1>Got a problem?<br /><span>Let's fix it.</span></h1>
            <p className="hero-copy">Tell Life Fix AI what is going wrong. Get a clear plan, the next steps, and the things to watch out for.</p>

            <form className="fix-card" onSubmit={submit}>
              <label htmlFor="problem">What are you dealing with?</label>
              <textarea
                id="problem"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Example: My kitchen sink is draining slowly and I don't know what to try first."
                rows={5}
              />
              <div className="form-row">
                <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Problem category">
                  {categories.map((item) => <option key={item}>{item}</option>)}
                </select>
                <button className="primary" disabled={!problem.trim()}>Build my fix →</button>
              </div>
            </form>

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
            <button className="primary" onClick={() => setActive(null)}>Fix another problem</button>
          </section>
        )}

        {showHistory && (
          <section className="history">
            <div className="section-head"><div><div className="eyebrow">YOUR SAVED FIXES</div><h1>Fix history</h1></div>{history.length > 0 && <button className="danger-text" onClick={clearHistory}>Clear history</button>}</div>
            {history.length === 0 ? <div className="empty"><div>🧰</div><h2>No saved fixes yet</h2><p>Your fixes will stay on this device so you can come back to them.</p><button className="primary" onClick={() => setShowHistory(false)}>Create your first fix</button></div> :
              <div className="history-list">{history.map((fix) => <button className="history-item" key={fix.id} onClick={() => { setActive(fix); setShowHistory(false); }}><div><span className="pill">{fix.category}</span><h2>{fix.title}</h2><p>{fix.problem}</p></div><span>→</span></button>)}</div>}
          </section>
        )}
      </main>

      <footer><div><b>Life Fix <span>AI</span></b><p>Practical, step-by-step help for everyday problems.</p></div><p>© {new Date().getFullYear()} Life Fix AI · Your information stays in this browser.</p></footer>
    </div>
  );
}
