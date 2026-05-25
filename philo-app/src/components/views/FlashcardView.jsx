import { FONTS, COLORS } from "../../styles/theme";
import CitationCard from "../ui/CitationCard";
import ProgressBar from "../ui/ProgressBar";

export default function FlashcardView({
  notion, index, total,
  revelée, onReveler,
  nbRevisees, progression,
  onToggleProgression, onOuvrirNotion, onNext,
}) {
  return (
    <>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h2 style={{ fontFamily: FONTS.serif, fontSize: 22, color: COLORS.textMain, margin: "0 0 4px" }}>🃏 Mode révision</h2>
        <p style={{ fontSize: 13, color: COLORS.textSub, margin: 0, fontFamily: FONTS.sans }}>
          {index + 1} / {total}
        </p>
      </div>

      <div style={{ background: `linear-gradient(135deg, ${notion.couleur}33, ${notion.couleur}11)`, border: `1px solid ${notion.couleur}55`, borderRadius: 20, padding: "32px 24px", marginBottom: 20, minHeight: 220, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }} aria-hidden="true">{notion.emoji}</div>
        <h3 style={{ fontFamily: FONTS.serif, fontSize: 26, fontWeight: 900, color: COLORS.textMain, margin: "0 0 20px" }}>{notion.titre}</h3>
        {revelée ? (
          <p style={{ fontSize: 14, color: "#c4c4c4", lineHeight: 1.65, margin: 0, fontFamily: FONTS.sans, maxWidth: 560 }}>{notion.definition}</p>
        ) : (
          <button
            onClick={onReveler}
            style={{ padding: "10px 28px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, color: "#a0aec0", cursor: "pointer", fontSize: 14, fontFamily: FONTS.sans }}
            aria-label="Révéler la définition"
          >
            Afficher la définition
          </button>
        )}
      </div>

      {revelée && notion.citations[0] && (
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontSize: 12, color: COLORS.textMuted, margin: "0 0 8px", fontFamily: FONTS.sans, textTransform: "uppercase", letterSpacing: "0.05em" }}>Citation clé</p>
          <CitationCard citation={notion.citations[0]} borderColor={notion.couleur} />
        </div>
      )}

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {revelée && (
          <>
            <button
              onClick={() => onToggleProgression(notion.id)}
              style={{ flex: 1, minWidth: 140, padding: "10px 14px", background: progression[notion.id] ? "rgba(16,185,129,0.15)" : COLORS.bgCard, border: `1px solid ${progression[notion.id] ? COLORS.success : COLORS.border}`, borderRadius: 10, color: progression[notion.id] ? COLORS.success : "#a0aec0", cursor: "pointer", fontSize: 13, fontFamily: FONTS.sans }}
              aria-label={progression[notion.id] ? "Retirer des notions révisées" : "Marquer cette notion comme révisée"}
            >
              {progression[notion.id] ? "✓ Révisée" : "○ Marquer révisée"}
            </button>
            <button
              onClick={() => onOuvrirNotion(notion)}
              style={{ flex: 1, minWidth: 140, padding: "10px 14px", background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 10, color: "#a0aec0", cursor: "pointer", fontSize: 13, fontFamily: FONTS.sans }}
              aria-label="Voir la fiche complète de cette notion"
            >
              📖 Fiche complète
            </button>
          </>
        )}
        <button
          onClick={onNext}
          style={{ flex: 2, minWidth: 160, padding: "10px 20px", background: COLORS.gradientPrimary, border: "none", borderRadius: 10, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: FONTS.sans }}
          aria-label={revelée ? "Passer à la notion suivante" : "Passer cette notion"}
        >
          {revelée ? "→ Notion suivante" : "→ Passer"}
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: FONTS.sans }}>Notions révisées</span>
          <span style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: FONTS.sans }}>{nbRevisees} / {total}</span>
        </div>
        <ProgressBar value={nbRevisees} max={total} height={5} width="100%" />
      </div>
    </>
  );
}
