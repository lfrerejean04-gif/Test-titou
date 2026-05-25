import { useState } from "react";

const STORAGE_KEY = "philo-progression";

export function useProgression() {
  const [progression, setProgression] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }
    catch { return {}; }
  });

  const toggle = (notionId, e) => {
    if (e) e.stopPropagation();
    const next = { ...progression, [notionId]: !progression[notionId] };
    setProgression(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const nbRevisees = Object.values(progression).filter(Boolean).length;

  return { progression, toggle, nbRevisees };
}
