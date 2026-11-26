export type Fix = {
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

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export const HISTORY_KEY = "life-fix-history";
export const MAX_HISTORY_ITEMS = 50;
export const MAX_PROBLEM_LENGTH = 2000;

function isFix(value: unknown): value is Fix {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<Fix>;
  return typeof item.id === "string"
    && typeof item.problem === "string"
    && typeof item.category === "string"
    && typeof item.createdAt === "string"
    && (item.urgency === "Low" || item.urgency === "Medium" || item.urgency === "High")
    && typeof item.title === "string"
    && typeof item.summary === "string"
    && Array.isArray(item.steps) && item.steps.every((step) => typeof step === "string")
    && Array.isArray(item.watch) && item.watch.every((entry) => typeof entry === "string");
}

export function readFixHistory(storage?: StorageLike): Fix[] {
  try {
    const target = storage ?? (typeof localStorage !== "undefined" ? localStorage : undefined);
    if (!target) return [];
    const saved = target.getItem(HISTORY_KEY);
    if (!saved) return [];
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isFix).slice(0, MAX_HISTORY_ITEMS);
  } catch {
    return [];
  }
}

export function writeFixHistory(history: Fix[], storage?: StorageLike): boolean {
  try {
    const target = storage ?? (typeof localStorage !== "undefined" ? localStorage : undefined);
    if (!target) return false;
    target.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY_ITEMS)));
    return true;
  } catch {
    return false;
  }
}

function createId(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch {
    // Fall through for older or restricted browser environments.
  }
  return `fix-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

export function createFix(problem: string, category: string): Fix {
  const normalizedProblem = problem.trim().slice(0, MAX_PROBLEM_LENGTH);
  const text = normalizedProblem.toLowerCase();
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
    id: createId(),
    problem: normalizedProblem,
    category,
    createdAt: new Date().toISOString(),
    urgency: urgent ? "High" : category === "Money & Bills" ? "Medium" : "Low",
    title,
    summary,
    steps,
    watch,
  };
}
