// Resilient lead submission. The result screen must NEVER block on the network
// and must never lose a captured lead: we queue the payload to localStorage
// first, POST asynchronously with retries, and clear the queue entry on success.
// flushQueue() re-attempts any pending leads on next load.

const QUEUE_KEY = "aq_lead_queue";
const ENDPOINT = "/api/lead";

function newId() {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  } catch {}
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function readQueue() {
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeQueue(items) {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(items));
  } catch {}
}

function enqueue(payload) {
  const items = readQueue();
  items.push(payload);
  writeQueue(items);
}

function dequeue(id) {
  writeQueue(readQueue().filter((p) => p._id !== id));
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function tryPost(payload, retries) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
      if (res.ok) return true;
    } catch {
      /* network error — fall through to retry */
    }
    if (attempt < retries) await sleep(600 * (attempt + 1));
  }
  return false;
}

/**
 * Fire-and-forget submission. Returns a promise resolving to true/false, but
 * callers should NOT await it before rendering the result.
 */
export async function submitLead(payload, { retries = 2 } = {}) {
  if (typeof window === "undefined") return false;
  const withId = { _id: newId(), ...payload };
  enqueue(withId);
  const ok = await tryPost(withId, retries);
  if (ok) dequeue(withId._id);
  return ok;
}

/** Retry any leads that never made it through (call on mount). */
export async function flushQueue() {
  if (typeof window === "undefined") return;
  const items = readQueue();
  for (const payload of items) {
    const ok = await tryPost(payload, 1);
    if (ok) dequeue(payload._id);
  }
}
