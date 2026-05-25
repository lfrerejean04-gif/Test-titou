import { FONTS, COLORS } from "../../styles/theme";

export default function CitationCard({ citation, borderColor }) {
  return (
    <div className="citation-card" style={{ borderColor }}>
      <p style={{ fontStyle: "italic", fontSize: 14, color: "#e8e6e1", margin: "0 0 6px", lineHeight: 1.6, fontFamily: FONTS.serif }}>
        « {citation.texte} »
      </p>
      <div style={{ fontSize: 12, color: COLORS.textSub }}>
        — <strong style={{ color: COLORS.accent }}>{citation.auteur}</strong>, <em>{citation.source}</em>
      </div>
    </div>
  );
}
