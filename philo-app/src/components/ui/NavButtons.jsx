export default function NavButtons({ precedente, suivante, onNavigate }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 16 }}>
      <button className="nav-btn" onClick={() => onNavigate(precedente)} disabled={!precedente}
        aria-label={precedente ? `Notion précédente : ${precedente.titre}` : "Première notion"}>
        ← {precedente ? precedente.titre : "—"}
      </button>
      <button className="nav-btn" onClick={() => onNavigate(suivante)} disabled={!suivante}
        aria-label={suivante ? `Notion suivante : ${suivante.titre}` : "Dernière notion"}
        style={{ textAlign: "right" }}>
        {suivante ? suivante.titre : "—"} →
      </button>
    </div>
  );
}
