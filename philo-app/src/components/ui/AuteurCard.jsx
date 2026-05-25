import { FONTS, COLORS } from "../../styles/theme";

export default function AuteurCard({ auteur, onClick }) {
  return (
    <button className="auteur-card" onClick={() => onClick(auteur.nom)} aria-label={`Voir la fiche de ${auteur.nom}`}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 4 }}>
        <div>
          <span style={{ fontFamily: FONTS.serif, fontSize: 16, fontWeight: 700, color: COLORS.accent }}>{auteur.nom}</span>
          <span style={{ fontSize: 12, color: COLORS.textMuted, marginLeft: 8 }}>{auteur.periode}</span>
        </div>
        <span style={{ fontSize: 11, color: COLORS.textMuted }}>→</span>
      </div>
      <p style={{ fontSize: 13, color: COLORS.textBody, margin: "6px 0 4px", lineHeight: 1.5, fontFamily: FONTS.sans }}>{auteur.apport}</p>
      <div style={{ fontSize: 11, color: COLORS.textMuted }}>📖 {auteur.oeuvres.join(" · ")}</div>
    </button>
  );
}
