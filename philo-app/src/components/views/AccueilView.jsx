import { NOTIONS } from "../../data/notions";
import { METHODES } from "../../data/methodes";
import { FONTS, COLORS } from "../../styles/theme";
import NotionCard from "../ui/NotionCard";
import AuteurCard from "../ui/AuteurCard";
import ProgressBar from "../ui/ProgressBar";

export default function AccueilView({
  recherche, onRechercheChange,
  notionsFiltrees, auteursFiltres,
  nbRevisees, progression,
  onToggleProgression, onOuvrirNotion, onOuvrirMethode, onOuvrirAuteur, onStartFlashcard,
}) {
  return (
    <>
      {/* Barre de recherche */}
      <div style={{ position: "relative", marginBottom: 20 }}>
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: COLORS.textMuted, pointerEvents: "none" }} aria-hidden="true">🔍</span>
        <input
          type="search"
          className="recherche-input"
          placeholder="Rechercher une notion, un auteur, une idée…"
          value={recherche}
          onChange={(e) => onRechercheChange(e.target.value)}
          aria-label="Rechercher dans les notions et les auteurs"
        />
      </div>

      {/* Progression + bouton flashcard */}
      {!recherche && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 24, padding: "14px 16px", background: COLORS.bgSubtle, borderRadius: 12, border: `1px solid ${COLORS.borderSub}` }}>
          <div>
            <div style={{ fontSize: 13, color: COLORS.textMain, fontFamily: FONTS.sans }}>
              <span style={{ fontWeight: 700, color: COLORS.accent }}>{nbRevisees}</span>
              <span style={{ color: COLORS.textSub }}> / {NOTIONS.length} notions révisées</span>
            </div>
            <div style={{ marginTop: 7 }}>
              <ProgressBar value={nbRevisees} max={NOTIONS.length} />
            </div>
          </div>
          <button
            onClick={onStartFlashcard}
            style={{ padding: "9px 18px", background: COLORS.gradientPrimary, border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: FONTS.sans }}
            aria-label="Démarrer le mode révision flashcards"
          >
            🃏 Mode révision
          </button>
        </div>
      )}

      {/* Méthodes */}
      {!recherche && (
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: FONTS.serif, fontSize: 18, color: COLORS.textMain, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 8, marginBottom: 14 }}>
            📝 Méthodes d'Examen
          </h2>
          <div className="grid-2col-methodes" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {Object.entries(METHODES).map(([key, m]) => (
              <button key={key} className="card-notion" onClick={() => onOuvrirMethode(key)}
                aria-label={`Ouvrir la méthode : ${m.titre}`}
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: 18 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{m.emoji}</div>
                <div style={{ fontFamily: FONTS.serif, fontSize: 17, fontWeight: 700, color: COLORS.textMain }}>{m.titre}</div>
                <div style={{ fontSize: 12, color: COLORS.textSub, marginTop: 4 }}>Méthode complète + pièges à éviter</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Notions */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: FONTS.serif, fontSize: 18, color: COLORS.textMain, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 8, marginBottom: 14 }}>
          🧩 Les Notions du Programme
          {recherche && (
            <span style={{ fontSize: 13, color: COLORS.textSub, fontWeight: 400, marginLeft: 8 }}>
              ({notionsFiltrees.length} résultat{notionsFiltrees.length !== 1 ? "s" : ""})
            </span>
          )}
        </h2>
        {notionsFiltrees.length === 0 ? (
          <p style={{ color: COLORS.textMuted, fontFamily: FONTS.sans, fontSize: 14 }}>
            Aucune notion trouvée pour « {recherche} »
          </p>
        ) : (
          <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {notionsFiltrees.map((n) => (
              <NotionCard key={n.id} notion={n} onClick={onOuvrirNotion}>
                <button
                  className="prog-btn"
                  onClick={(e) => onToggleProgression(n.id, e)}
                  aria-label={progression[n.id] ? `Retirer ${n.titre} des révisées` : `Marquer ${n.titre} comme révisée`}
                  title={progression[n.id] ? "Révisée" : "Marquer comme révisée"}
                  style={{ position: "absolute", top: 10, right: 10, fontSize: 17, color: progression[n.id] ? COLORS.success : "#4b5563", padding: "2px 4px" }}
                >
                  {progression[n.id] ? "✓" : "○"}
                </button>
              </NotionCard>
            ))}
          </div>
        )}
      </div>

      {/* Auteurs Clés */}
      {(!recherche || auteursFiltres.length > 0) && (
        <div>
          <h2 style={{ fontFamily: FONTS.serif, fontSize: 18, color: COLORS.textMain, borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 8, marginBottom: 14 }}>
            🎓 Auteurs Clés
            {recherche && (
              <span style={{ fontSize: 13, color: COLORS.textSub, fontWeight: 400, marginLeft: 8 }}>
                ({auteursFiltres.length} résultat{auteursFiltres.length !== 1 ? "s" : ""})
              </span>
            )}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {auteursFiltres.map((a) => (
              <AuteurCard key={a.nom} auteur={a} onClick={onOuvrirAuteur} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
