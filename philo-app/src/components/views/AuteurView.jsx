import { NOTIONS } from "../../data/notions";
import { FONTS, COLORS } from "../../styles/theme";
import NotionCard from "../ui/NotionCard";

export default function AuteurView({ auteur, onOuvrirNotion }) {
  const notionsLiees = NOTIONS.filter(n => n.auteurs.includes(auteur.nom));

  return (
    <>
      <div style={{ background: "linear-gradient(135deg, rgba(212,168,255,0.15), rgba(212,168,255,0.05))", border: "1px solid rgba(212,168,255,0.3)", borderRadius: 16, padding: 20, marginBottom: 20 }}>
        <div style={{ fontSize: 36, marginBottom: 8 }} aria-hidden="true">🎓</div>
        <h2 style={{ fontFamily: FONTS.serif, fontSize: 24, fontWeight: 900, color: COLORS.textMain, margin: "0 0 4px" }}>{auteur.nom}</h2>
        <p style={{ fontSize: 13, color: COLORS.textSub, margin: "0 0 14px", fontFamily: FONTS.sans }}>{auteur.periode}</p>
        <p style={{ fontSize: 14, color: "#c4c4c4", lineHeight: 1.65, margin: 0, fontFamily: FONTS.sans }}>{auteur.apport}</p>
      </div>

      <div style={{ marginBottom: 24 }}>
        <h3 style={{ fontFamily: FONTS.serif, fontSize: 17, color: COLORS.accent, marginBottom: 12 }}>📖 Œuvres principales</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {auteur.oeuvres.map((o, i) => (
            <span key={i} style={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "6px 12px", fontSize: 13, color: "#c4c4c4", fontFamily: FONTS.sans, fontStyle: "italic" }}>{o}</span>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ fontFamily: FONTS.serif, fontSize: 17, color: COLORS.accent, marginBottom: 12 }}>🧩 Notions associées</h3>
        {notionsLiees.length === 0 ? (
          <p style={{ color: COLORS.textMuted, fontFamily: FONTS.sans, fontSize: 13 }}>Cet auteur ne figure pas dans la liste des auteurs associés aux notions.</p>
        ) : (
          <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {notionsLiees.map(n => (
              <NotionCard key={n.id} notion={n} onClick={onOuvrirNotion} compact />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
