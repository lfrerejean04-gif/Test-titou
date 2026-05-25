import { AUTEURS_CLES } from "../../data/auteurs";
import { FONTS, COLORS } from "../../styles/theme";
import { TABS } from "../../constants/views";
import NavButtons from "../ui/NavButtons";
import CitationCard from "../ui/CitationCard";

export default function NotionView({
  notion, onglet, onOngletChange,
  notionPrecedente, notionSuivante,
  progression, onToggleProgression,
  onOuvrirNotion, onOuvrirAuteur,
}) {
  return (
    <>
      <NavButtons precedente={notionPrecedente} suivante={notionSuivante} onNavigate={onOuvrirNotion} />

      {/* En-tête notion */}
      <div style={{ background: `linear-gradient(135deg, ${notion.couleur}33, ${notion.couleur}11)`, border: `1px solid ${notion.couleur}55`, borderRadius: 16, padding: 20, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <div style={{ fontSize: 40 }} aria-hidden="true">{notion.emoji}</div>
          <button
            className="prog-btn"
            onClick={(e) => onToggleProgression(notion.id, e)}
            aria-label={progression[notion.id] ? "Retirer des notions révisées" : "Marquer cette notion comme révisée"}
            style={{ fontSize: 13, color: progression[notion.id] ? COLORS.success : "#6b7280", fontFamily: FONTS.sans, display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", border: `1px solid ${progression[notion.id] ? COLORS.success : COLORS.border}`, borderRadius: 7 }}
          >
            {progression[notion.id] ? "✓ Révisée" : "○ Marquer révisée"}
          </button>
        </div>
        <h2 style={{ fontFamily: FONTS.serif, fontSize: 24, fontWeight: 900, color: COLORS.textMain, margin: "8px 0 10px" }}>{notion.titre}</h2>
        <p style={{ fontSize: 14, color: "#c4c4c4", lineHeight: 1.6, margin: 0, fontFamily: FONTS.sans }}>{notion.definition}</p>
      </div>

      {/* Onglets */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18, overflowX: "auto" }} role="tablist" aria-label="Sections de la fiche notion">
        {[
          { key: TABS.IDEES, label: "💡 Idées" },
          { key: TABS.DISTINCTIONS, label: "⚖️ Distinctions" },
          { key: TABS.CITATIONS, label: "💬 Citations" },
          { key: TABS.AUTEURS, label: "🎓 Auteurs" },
        ].map((o) => (
          <button key={o.key} className="onglet-btn" onClick={() => onOngletChange(o.key)}
            role="tab" aria-selected={onglet === o.key}
            style={{ padding: "8px 14px", borderRadius: 20, cursor: "pointer", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",
              background: onglet === o.key ? notion.couleur : "rgba(255,255,255,0.08)",
              color: onglet === o.key ? "#fff" : "#a0aec0" }}>
            {o.label}
          </button>
        ))}
      </div>

      {/* Contenu onglets */}
      <div role="tabpanel">
        {onglet === TABS.IDEES && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {notion.idees.map((idee, i) => (
              <div key={i} style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 16 }}>
                <div style={{ fontFamily: FONTS.serif, fontSize: 15, fontWeight: 700, color: COLORS.textMain, marginBottom: 6 }}>
                  <span style={{ color: notion.couleur, marginRight: 8 }} aria-hidden="true">▶</span>{idee.titre}
                </div>
                <p style={{ fontSize: 13.5, color: "#c4c4c4", margin: 0, lineHeight: 1.65, fontFamily: FONTS.sans }}>{idee.contenu}</p>
              </div>
            ))}
          </div>
        )}

        {onglet === TABS.DISTINCTIONS && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {notion.distinctions.map((d, i) => (
              <div key={i} style={{ borderLeft: `4px solid ${notion.couleur}`, paddingLeft: 14, paddingTop: 6, paddingBottom: 6 }}>
                <div style={{ fontFamily: FONTS.serif, fontSize: 15, fontWeight: 700, color: COLORS.textMain }}>{d.terme}</div>
                <p style={{ fontSize: 13.5, color: "#c4c4c4", margin: "4px 0 0", lineHeight: 1.55, fontFamily: FONTS.sans }}>{d.def}</p>
              </div>
            ))}
          </div>
        )}

        {onglet === TABS.CITATIONS && (
          <div>
            {notion.citations.map((c, i) => (
              <CitationCard key={i} citation={c} borderColor={notion.couleur} />
            ))}
          </div>
        )}

        {onglet === TABS.AUTEURS && (
          <div style={{ background: COLORS.bgSubtle, borderRadius: 12, padding: 16 }}>
            <p style={{ fontSize: 13, color: COLORS.textSub, margin: "0 0 12px", fontFamily: FONTS.sans }}>
              Auteurs à connaître — cliquez pour voir leur fiche :
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
              {notion.auteurs.map((nomAuteur, i) => (
                <button key={i} className="auteur-tag-btn" onClick={() => onOuvrirAuteur(nomAuteur)}
                  aria-label={`Voir la fiche de ${nomAuteur}`}
                  style={{ background: `${notion.couleur}33`, border: `1px solid ${notion.couleur}66`, color: COLORS.textMain, fontSize: 13 }}>
                  {nomAuteur} →
                </button>
              ))}
            </div>
            <div style={{ borderTop: `1px solid ${COLORS.borderSub}`, paddingTop: 14 }}>
              {AUTEURS_CLES.filter(a => notion.auteurs.includes(a.nom)).map((a) => (
                <div key={a.nom} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  <button onClick={() => onOuvrirAuteur(a.nom)} aria-label={`Ouvrir la fiche de ${a.nom}`}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}>
                    <div style={{ fontFamily: FONTS.serif, fontWeight: 700, color: COLORS.accent, fontSize: 14 }}>
                      {a.nom} <span style={{ fontWeight: 400, color: COLORS.textMuted, fontSize: 12 }}>{a.periode}</span>
                    </div>
                  </button>
                  <p style={{ fontSize: 13, color: "#b0b0b0", margin: "4px 0 0", fontFamily: FONTS.sans }}>{a.apport}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
