import { METHODES } from "../../data/methodes";
import { FONTS, COLORS } from "../../styles/theme";

export default function MethodeView({ methodeKey }) {
  const m = METHODES[methodeKey];

  return (
    <>
      <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16, padding: 20, marginBottom: 20 }}>
        <div style={{ fontSize: 36, marginBottom: 8 }} aria-hidden="true">{m.emoji}</div>
        <h2 style={{ fontFamily: FONTS.serif, fontSize: 24, fontWeight: 900, color: COLORS.textMain, margin: "0 0 10px" }}>{m.titre}</h2>
        <p style={{ fontSize: 14, color: "#c4c4c4", lineHeight: 1.6, margin: 0, fontFamily: FONTS.sans }}>{m.intro}</p>
      </div>

      <h3 style={{ fontFamily: FONTS.serif, fontSize: 17, color: COLORS.accent, marginBottom: 12 }}>Les étapes</h3>
      {m.etapes.map((e) => (
        <div key={e.num} className="etape-card">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: COLORS.gradientPrimary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }} aria-hidden="true">{e.num}</div>
            <div style={{ fontFamily: FONTS.serif, fontSize: 15, fontWeight: 700, color: COLORS.textMain }}>{e.titre}</div>
          </div>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {e.contenu.map((c, i) => (
              <li key={i} style={{ fontSize: 13.5, color: "#c4c4c4", marginBottom: 5, lineHeight: 1.5, fontFamily: FONTS.sans }}>{c}</li>
            ))}
          </ul>
        </div>
      ))}

      <h3 style={{ fontFamily: FONTS.serif, fontSize: 17, color: COLORS.danger, marginTop: 20, marginBottom: 12 }}>⚠️ Pièges à éviter</h3>
      <div style={{ background: "rgba(248, 113, 113, 0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 12, padding: 16 }}>
        {m.piegesToEviter.map((p, i) => (
          <div key={i} className="piege-item">
            <span style={{ color: COLORS.danger, fontSize: 14, flexShrink: 0 }} aria-hidden="true">✕</span>
            <span style={{ fontSize: 13.5, color: "#c4c4c4", fontFamily: FONTS.sans }}>{p}</span>
          </div>
        ))}
      </div>
    </>
  );
}
