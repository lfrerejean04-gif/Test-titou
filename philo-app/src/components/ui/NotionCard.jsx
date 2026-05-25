import { FONTS, COLORS } from "../../styles/theme";

export default function NotionCard({ notion, onClick, compact = false, children }) {
  return (
    <div style={{ position: "relative" }}>
      <button
        className="card-notion"
        onClick={() => onClick(notion)}
        aria-label={`Ouvrir la fiche notion : ${notion.titre}`}
        style={{
          background: `linear-gradient(135deg, ${notion.couleur}22, ${notion.couleur}08)`,
          border: `1px solid ${notion.couleur}44`,
          borderRadius: 12,
          padding: compact ? 12 : "14px 40px 14px 14px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: compact ? 18 : 22 }} aria-hidden="true">{notion.emoji}</span>
          <span style={{ fontFamily: FONTS.serif, fontSize: compact ? 14 : 15, fontWeight: 700, color: COLORS.textMain }}>
            {notion.titre}
          </span>
        </div>
        {!compact && (
          <div style={{ fontSize: 11, color: COLORS.textSub, marginTop: 6 }}>
            {notion.idees.length} idées · {notion.citations.length} citations · {notion.auteurs.length} auteurs
          </div>
        )}
      </button>
      {children}
    </div>
  );
}
