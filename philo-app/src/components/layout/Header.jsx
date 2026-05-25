import { COLORS, FONTS } from "../../styles/theme";

export default function Header({ vue, onRetour }) {
  return (
    <div style={{ background: COLORS.bgHeader, padding: "24px 20px 20px", borderBottom: `1px solid ${COLORS.borderSub}` }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {vue !== "accueil" && (
          <button className="back-btn" onClick={onRetour} style={{ marginBottom: 12 }} aria-label="Retour à l'accueil">
            ← Retour à l'accueil
          </button>
        )}
        <div
          className={vue !== "accueil" ? "title-clickable" : ""}
          onClick={vue !== "accueil" ? onRetour : undefined}
          role={vue !== "accueil" ? "button" : undefined}
          aria-label={vue !== "accueil" ? "Retour à l'accueil" : undefined}
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          <div style={{ fontSize: 32 }}>📚</div>
          <div>
            <h1 style={{ fontFamily: FONTS.serif, fontSize: 26, fontWeight: 900, margin: 0, letterSpacing: "-0.5px", background: COLORS.gradientTitle, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Fiches Bac Philo
            </h1>
            <p style={{ margin: 0, fontSize: 13, color: COLORS.textSub, fontFamily: FONTS.sans }}>
              Terminale Générale — Toutes les notions, citations & méthodes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
