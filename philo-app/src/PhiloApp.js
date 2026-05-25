import { useState } from "react";
import { NOTIONS } from "./data/notions";
import { METHODES } from "./data/methodes";
import { AUTEURS_CLES } from "./data/auteurs";

export default function App() {
  const [vue, setVue] = useState("accueil");
  const [notionActive, setNotionActive] = useState(null);
  const [methodeActive, setMethodeActive] = useState(null);
  const [onglet, setOnglet] = useState("idees");
  const [recherche, setRecherche] = useState("");
  const [auteurActive, setAuteurActive] = useState(null);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardRevelee, setFlashcardRevelee] = useState(false);
  const [progression, setProgression] = useState(() => {
    try { return JSON.parse(localStorage.getItem("philo-progression") || "{}"); } catch { return {}; }
  });

  const ouvrirNotion = (notion) => { setNotionActive(notion); setVue("notion"); setOnglet("idees"); };
  const ouvrirMethode = (m) => { setMethodeActive(m); setVue("methode"); };
  const ouvrirAuteur = (nomAuteur) => {
    const a = AUTEURS_CLES.find(a => a.nom === nomAuteur);
    if (a) { setAuteurActive(a); setVue("auteur"); }
  };
  const retour = () => {
    setVue("accueil"); setNotionActive(null); setMethodeActive(null);
    setAuteurActive(null); setRecherche("");
  };

  const notionIndex = notionActive ? NOTIONS.findIndex(n => n.id === notionActive.id) : -1;
  const notionPrecedente = notionIndex > 0 ? NOTIONS[notionIndex - 1] : null;
  const notionSuivante = notionIndex < NOTIONS.length - 1 ? NOTIONS[notionIndex + 1] : null;

  const toggleProgression = (notionId, e) => {
    if (e) e.stopPropagation();
    const newProg = { ...progression, [notionId]: !progression[notionId] };
    setProgression(newProg);
    localStorage.setItem("philo-progression", JSON.stringify(newProg));
  };
  const nbRevisees = Object.values(progression).filter(Boolean).length;

  const notionsFiltrees = NOTIONS.filter(n =>
    !recherche ||
    n.titre.toLowerCase().includes(recherche.toLowerCase()) ||
    n.definition.toLowerCase().includes(recherche.toLowerCase())
  );
  const auteursFiltres = AUTEURS_CLES.filter(a =>
    !recherche ||
    a.nom.toLowerCase().includes(recherche.toLowerCase()) ||
    a.apport.toLowerCase().includes(recherche.toLowerCase())
  );

  const flashcardNotion = NOTIONS[flashcardIndex % NOTIONS.length];

  return (
    <div style={{ fontFamily: "'Georgia', serif", minHeight: "100vh", background: "#0f0f13", color: "#e8e6e1" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Sans+3:wght@300;400;600&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1a1a24; }
        ::-webkit-scrollbar-thumb { background: #444; border-radius: 3px; }

        .card-notion {
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer; background: none; border: none; text-align: left; width: 100%;
        }
        .card-notion:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.5); }
        .card-notion:focus-visible { outline: 2px solid #7C3AED; outline-offset: 3px; border-radius: 12px; }

        .onglet-btn { transition: all 0.2s; border: none; cursor: pointer; }
        .onglet-btn:hover { opacity: 0.85; }
        .onglet-btn:focus-visible { outline: 2px solid #7C3AED; outline-offset: 2px; border-radius: 20px; }

        .citation-card { border-left: 3px solid; padding: 12px 16px; margin: 8px 0; background: rgba(255,255,255,0.04); border-radius: 0 8px 8px 0; }
        .etape-card { border-radius: 12px; padding: 16px; margin: 10px 0; background: rgba(255,255,255,0.05); }
        .piege-item { display: flex; gap: 8px; align-items: flex-start; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.07); }

        .auteur-card {
          background: rgba(255,255,255,0.04); border-radius: 12px; padding: 14px;
          border: 1px solid rgba(255,255,255,0.08); transition: all 0.2s;
          width: 100%; text-align: left; cursor: pointer;
        }
        .auteur-card:hover { background: rgba(255,255,255,0.08); }
        .auteur-card:focus-visible { outline: 2px solid #7C3AED; outline-offset: 2px; border-radius: 12px; }

        .back-btn {
          cursor: pointer; display: inline-flex; align-items: center; gap: 6px;
          opacity: 0.7; transition: opacity 0.2s; background: none; border: none;
          color: #a0aec0; font-size: 14px; padding: 0;
        }
        .back-btn:hover { opacity: 1; }
        .back-btn:focus-visible { outline: 2px solid #7C3AED; outline-offset: 2px; }

        .nav-btn {
          background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px; padding: 8px 14px; color: #a0aec0; cursor: pointer;
          font-size: 12px; font-family: 'Source Sans 3', sans-serif;
          transition: all 0.2s; white-space: nowrap; overflow: hidden;
          text-overflow: ellipsis; max-width: 46%;
        }
        .nav-btn:hover:not(:disabled) { background: rgba(255,255,255,0.14); color: #f0e6c8; }
        .nav-btn:disabled { opacity: 0.25; cursor: not-allowed; }
        .nav-btn:focus-visible { outline: 2px solid #7C3AED; outline-offset: 2px; }

        .prog-btn { background: none; border: none; cursor: pointer; border-radius: 6px; transition: opacity 0.2s; }
        .prog-btn:hover { opacity: 0.8; }
        .prog-btn:focus-visible { outline: 2px solid #7C3AED; outline-offset: 2px; }

        .auteur-tag-btn { border: none; cursor: pointer; border-radius: 20px; padding: 6px 14px; font-family: 'Source Sans 3', sans-serif; transition: opacity 0.2s; }
        .auteur-tag-btn:hover { opacity: 0.75; }
        .auteur-tag-btn:focus-visible { outline: 2px solid #7C3AED; outline-offset: 2px; }

        .recherche-input {
          width: 100%; padding: 12px 16px 12px 42px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px; color: #e8e6e1; font-size: 14px;
          font-family: 'Source Sans 3', sans-serif; outline: none; transition: border-color 0.2s;
        }
        .recherche-input:focus { border-color: rgba(124,58,237,0.55); }
        .recherche-input::placeholder { color: #6b7280; }

        .title-clickable { cursor: pointer; }
        .title-clickable:hover h1 { opacity: 0.85; }

        @media (max-width: 640px) {
          .grid-2col { grid-template-columns: 1fr !important; }
          .grid-2col-methodes { grid-template-columns: 1fr !important; }
          .nav-btn { font-size: 11px; padding: 6px 10px; }
        }
      `}</style>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #1a0a2e 0%, #0d1b2a 100%)", padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {vue !== "accueil" && (
            <button className="back-btn" onClick={retour} style={{ marginBottom: 12 }} aria-label="Retour à l'accueil">
              ← Retour à l'accueil
            </button>
          )}
          <div
            className={vue !== "accueil" ? "title-clickable" : ""}
            onClick={vue !== "accueil" ? retour : undefined}
            role={vue !== "accueil" ? "button" : undefined}
            aria-label={vue !== "accueil" ? "Retour à l'accueil" : undefined}
            style={{ display: "flex", alignItems: "center", gap: 12 }}
          >
            <div style={{ fontSize: 32 }}>📚</div>
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 900, margin: 0, letterSpacing: "-0.5px", background: "linear-gradient(90deg, #f0e6c8, #d4a8ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Fiches Bac Philo
              </h1>
              <p style={{ margin: 0, fontSize: 13, color: "#8892a4", fontFamily: "'Source Sans 3', sans-serif" }}>
                Terminale Générale — Toutes les notions, citations & méthodes
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px" }}>

        {/* ACCUEIL */}
        {vue === "accueil" && (
          <>
            {/* Barre de recherche */}
            <div style={{ position: "relative", marginBottom: 20 }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#6b7280", pointerEvents: "none" }} aria-hidden="true">🔍</span>
              <input
                type="search"
                className="recherche-input"
                placeholder="Rechercher une notion, un auteur, une idée…"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                aria-label="Rechercher dans les notions et les auteurs"
              />
            </div>

            {/* Progression + bouton flashcard */}
            {!recherche && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 24, padding: "14px 16px", background: "rgba(255,255,255,0.04)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)" }}>
                <div>
                  <div style={{ fontSize: 13, color: "#f0e6c8", fontFamily: "'Source Sans 3', sans-serif" }}>
                    <span style={{ fontWeight: 700, color: "#d4a8ff" }}>{nbRevisees}</span>
                    <span style={{ color: "#8892a4" }}> / {NOTIONS.length} notions révisées</span>
                  </div>
                  <div style={{ width: 160, height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, marginTop: 7 }}>
                    <div style={{ width: `${(nbRevisees / NOTIONS.length) * 100}%`, height: "100%", background: "linear-gradient(90deg, #7C3AED, #1D4ED8)", borderRadius: 2, transition: "width 0.3s" }} aria-hidden="true" />
                  </div>
                </div>
                <button
                  onClick={() => { setFlashcardIndex(0); setFlashcardRevelee(false); setVue("flashcard"); }}
                  style={{ padding: "9px 18px", background: "linear-gradient(135deg, #7C3AED, #1D4ED8)", border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Source Sans 3', sans-serif" }}
                  aria-label="Démarrer le mode révision flashcards"
                >
                  🃏 Mode révision
                </button>
              </div>
            )}

            {/* Méthodes */}
            {!recherche && (
              <div style={{ marginBottom: 28 }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#f0e6c8", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8, marginBottom: 14 }}>
                  📝 Méthodes d'Examen
                </h2>
                <div className="grid-2col-methodes" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {Object.entries(METHODES).map(([key, m]) => (
                    <button key={key} className="card-notion" onClick={() => ouvrirMethode(key)}
                      aria-label={`Ouvrir la méthode : ${m.titre}`}
                      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: 18 }}>
                      <div style={{ fontSize: 28, marginBottom: 8 }}>{m.emoji}</div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: "#f0e6c8" }}>{m.titre}</div>
                      <div style={{ fontSize: 12, color: "#8892a4", marginTop: 4 }}>Méthode complète + pièges à éviter</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Notions */}
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#f0e6c8", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8, marginBottom: 14 }}>
                🧩 Les Notions du Programme
                {recherche && (
                  <span style={{ fontSize: 13, color: "#8892a4", fontWeight: 400, marginLeft: 8 }}>
                    ({notionsFiltrees.length} résultat{notionsFiltrees.length !== 1 ? "s" : ""})
                  </span>
                )}
              </h2>
              {notionsFiltrees.length === 0 ? (
                <p style={{ color: "#6b7280", fontFamily: "'Source Sans 3', sans-serif", fontSize: 14 }}>
                  Aucune notion trouvée pour « {recherche} »
                </p>
              ) : (
                <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {notionsFiltrees.map((n) => (
                    <div key={n.id} style={{ position: "relative" }}>
                      <button className="card-notion" onClick={() => ouvrirNotion(n)}
                        aria-label={`Ouvrir la fiche notion : ${n.titre}`}
                        style={{ background: `linear-gradient(135deg, ${n.couleur}22, ${n.couleur}08)`, border: `1px solid ${n.couleur}44`, borderRadius: 12, padding: "14px 40px 14px 14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 22 }} aria-hidden="true">{n.emoji}</span>
                          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: "#f0e6c8" }}>{n.titre}</span>
                        </div>
                        <div style={{ fontSize: 11, color: "#8892a4", marginTop: 6 }}>
                          {n.idees.length} idées · {n.citations.length} citations · {n.auteurs.length} auteurs
                        </div>
                      </button>
                      <button
                        className="prog-btn"
                        onClick={(e) => toggleProgression(n.id, e)}
                        aria-label={progression[n.id] ? `Retirer ${n.titre} des révisées` : `Marquer ${n.titre} comme révisée`}
                        title={progression[n.id] ? "Révisée" : "Marquer comme révisée"}
                        style={{ position: "absolute", top: 10, right: 10, fontSize: 17, color: progression[n.id] ? "#10b981" : "#4b5563", padding: "2px 4px" }}
                      >
                        {progression[n.id] ? "✓" : "○"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Auteurs Clés */}
            {(!recherche || auteursFiltres.length > 0) && (
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#f0e6c8", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8, marginBottom: 14 }}>
                  🎓 Auteurs Clés
                  {recherche && (
                    <span style={{ fontSize: 13, color: "#8892a4", fontWeight: 400, marginLeft: 8 }}>
                      ({auteursFiltres.length} résultat{auteursFiltres.length !== 1 ? "s" : ""})
                    </span>
                  )}
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {auteursFiltres.map((a) => (
                    <button key={a.nom} className="auteur-card" onClick={() => ouvrirAuteur(a.nom)} aria-label={`Voir la fiche de ${a.nom}`}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 4 }}>
                        <div>
                          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: "#d4a8ff" }}>{a.nom}</span>
                          <span style={{ fontSize: 12, color: "#6b7280", marginLeft: 8 }}>{a.periode}</span>
                        </div>
                        <span style={{ fontSize: 11, color: "#6b7280" }}>→</span>
                      </div>
                      <p style={{ fontSize: 13, color: "#c4c4c4", margin: "6px 0 4px", lineHeight: 1.5, fontFamily: "'Source Sans 3', sans-serif" }}>{a.apport}</p>
                      <div style={{ fontSize: 11, color: "#6b7280" }}>📖 {a.oeuvres.join(" · ")}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* FICHE NOTION */}
        {vue === "notion" && notionActive && (
          <>
            {/* Navigation prev / next */}
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 16 }}>
              <button className="nav-btn" onClick={() => ouvrirNotion(notionPrecedente)} disabled={!notionPrecedente}
                aria-label={notionPrecedente ? `Notion précédente : ${notionPrecedente.titre}` : "Première notion"}>
                ← {notionPrecedente ? notionPrecedente.titre : "—"}
              </button>
              <button className="nav-btn" onClick={() => ouvrirNotion(notionSuivante)} disabled={!notionSuivante}
                aria-label={notionSuivante ? `Notion suivante : ${notionSuivante.titre}` : "Dernière notion"}
                style={{ textAlign: "right" }}>
                {notionSuivante ? notionSuivante.titre : "—"} →
              </button>
            </div>

            {/* En-tête notion */}
            <div style={{ background: `linear-gradient(135deg, ${notionActive.couleur}33, ${notionActive.couleur}11)`, border: `1px solid ${notionActive.couleur}55`, borderRadius: 16, padding: 20, marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <div style={{ fontSize: 40 }} aria-hidden="true">{notionActive.emoji}</div>
                <button
                  className="prog-btn"
                  onClick={(e) => toggleProgression(notionActive.id, e)}
                  aria-label={progression[notionActive.id] ? "Retirer des notions révisées" : "Marquer cette notion comme révisée"}
                  style={{ fontSize: 13, color: progression[notionActive.id] ? "#10b981" : "#6b7280", fontFamily: "'Source Sans 3', sans-serif", display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", border: `1px solid ${progression[notionActive.id] ? "#10b981" : "rgba(255,255,255,0.12)"}`, borderRadius: 7 }}
                >
                  {progression[notionActive.id] ? "✓ Révisée" : "○ Marquer révisée"}
                </button>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: "#f0e6c8", margin: "8px 0 10px" }}>{notionActive.titre}</h2>
              <p style={{ fontSize: 14, color: "#c4c4c4", lineHeight: 1.6, margin: 0, fontFamily: "'Source Sans 3', sans-serif" }}>{notionActive.definition}</p>
            </div>

            {/* Onglets */}
            <div style={{ display: "flex", gap: 8, marginBottom: 18, overflowX: "auto" }} role="tablist" aria-label="Sections de la fiche notion">
              {[
                { key: "idees", label: "💡 Idées" },
                { key: "distinctions", label: "⚖️ Distinctions" },
                { key: "citations", label: "💬 Citations" },
                { key: "auteurs", label: "🎓 Auteurs" },
              ].map((o) => (
                <button key={o.key} className="onglet-btn" onClick={() => setOnglet(o.key)}
                  role="tab" aria-selected={onglet === o.key}
                  style={{ padding: "8px 14px", borderRadius: 20, cursor: "pointer", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",
                    background: onglet === o.key ? notionActive.couleur : "rgba(255,255,255,0.08)",
                    color: onglet === o.key ? "#fff" : "#a0aec0" }}>
                  {o.label}
                </button>
              ))}
            </div>

            {/* Contenu onglets */}
            <div role="tabpanel">
              {onglet === "idees" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {notionActive.idees.map((idee, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 16 }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: "#f0e6c8", marginBottom: 6 }}>
                        <span style={{ color: notionActive.couleur, marginRight: 8 }} aria-hidden="true">▶</span>{idee.titre}
                      </div>
                      <p style={{ fontSize: 13.5, color: "#c4c4c4", margin: 0, lineHeight: 1.65, fontFamily: "'Source Sans 3', sans-serif" }}>{idee.contenu}</p>
                    </div>
                  ))}
                </div>
              )}

              {onglet === "distinctions" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {notionActive.distinctions.map((d, i) => (
                    <div key={i} style={{ borderLeft: `4px solid ${notionActive.couleur}`, paddingLeft: 14, paddingTop: 6, paddingBottom: 6 }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: "#f0e6c8" }}>{d.terme}</div>
                      <p style={{ fontSize: 13.5, color: "#c4c4c4", margin: "4px 0 0", lineHeight: 1.55, fontFamily: "'Source Sans 3', sans-serif" }}>{d.def}</p>
                    </div>
                  ))}
                </div>
              )}

              {onglet === "citations" && (
                <div>
                  {notionActive.citations.map((c, i) => (
                    <div key={i} className="citation-card" style={{ borderColor: notionActive.couleur }}>
                      <p style={{ fontStyle: "italic", fontSize: 14, color: "#e8e6e1", margin: "0 0 6px", lineHeight: 1.6, fontFamily: "'Playfair Display', serif" }}>« {c.texte} »</p>
                      <div style={{ fontSize: 12, color: "#8892a4" }}>— <strong style={{ color: "#d4a8ff" }}>{c.auteur}</strong>, <em>{c.source}</em></div>
                    </div>
                  ))}
                </div>
              )}

              {onglet === "auteurs" && (
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 16 }}>
                  <p style={{ fontSize: 13, color: "#8892a4", margin: "0 0 12px", fontFamily: "'Source Sans 3', sans-serif" }}>
                    Auteurs à connaître — cliquez pour voir leur fiche :
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                    {notionActive.auteurs.map((nomAuteur, i) => (
                      <button key={i} className="auteur-tag-btn" onClick={() => ouvrirAuteur(nomAuteur)}
                        aria-label={`Voir la fiche de ${nomAuteur}`}
                        style={{ background: `${notionActive.couleur}33`, border: `1px solid ${notionActive.couleur}66`, color: "#f0e6c8", fontSize: 13 }}>
                        {nomAuteur} →
                      </button>
                    ))}
                  </div>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 14 }}>
                    {AUTEURS_CLES.filter(a => notionActive.auteurs.includes(a.nom)).map((a) => (
                      <div key={a.nom} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <button onClick={() => ouvrirAuteur(a.nom)} aria-label={`Ouvrir la fiche de ${a.nom}`}
                          style={{ background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}>
                          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#d4a8ff", fontSize: 14 }}>
                            {a.nom} <span style={{ fontWeight: 400, color: "#6b7280", fontSize: 12 }}>{a.periode}</span>
                          </div>
                        </button>
                        <p style={{ fontSize: 13, color: "#b0b0b0", margin: "4px 0 0", fontFamily: "'Source Sans 3', sans-serif" }}>{a.apport}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* FICHE AUTEUR */}
        {vue === "auteur" && auteurActive && (
          <>
            <div style={{ background: "linear-gradient(135deg, rgba(212,168,255,0.15), rgba(212,168,255,0.05))", border: "1px solid rgba(212,168,255,0.3)", borderRadius: 16, padding: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 36, marginBottom: 8 }} aria-hidden="true">🎓</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: "#f0e6c8", margin: "0 0 4px" }}>{auteurActive.nom}</h2>
              <p style={{ fontSize: 13, color: "#8892a4", margin: "0 0 14px", fontFamily: "'Source Sans 3', sans-serif" }}>{auteurActive.periode}</p>
              <p style={{ fontSize: 14, color: "#c4c4c4", lineHeight: 1.65, margin: 0, fontFamily: "'Source Sans 3', sans-serif" }}>{auteurActive.apport}</p>
            </div>

            <div style={{ marginBottom: 24 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#d4a8ff", marginBottom: 12 }}>📖 Œuvres principales</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {auteurActive.oeuvres.map((o, i) => (
                  <span key={i} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "6px 12px", fontSize: 13, color: "#c4c4c4", fontFamily: "'Source Sans 3', sans-serif", fontStyle: "italic" }}>{o}</span>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#d4a8ff", marginBottom: 12 }}>🧩 Notions associées</h3>
              {(() => {
                const notionsLiees = NOTIONS.filter(n => n.auteurs.includes(auteurActive.nom));
                return notionsLiees.length === 0 ? (
                  <p style={{ color: "#6b7280", fontFamily: "'Source Sans 3', sans-serif", fontSize: 13 }}>Cet auteur ne figure pas dans la liste des auteurs associés aux notions.</p>
                ) : (
                  <div className="grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    {notionsLiees.map(n => (
                      <button key={n.id} className="card-notion" onClick={() => ouvrirNotion(n)}
                        aria-label={`Ouvrir la notion : ${n.titre}`}
                        style={{ background: `linear-gradient(135deg, ${n.couleur}22, ${n.couleur}08)`, border: `1px solid ${n.couleur}44`, borderRadius: 12, padding: 12 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 18 }} aria-hidden="true">{n.emoji}</span>
                          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: "#f0e6c8" }}>{n.titre}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                );
              })()}
            </div>
          </>
        )}

        {/* METHODE */}
        {vue === "methode" && methodeActive && (() => {
          const m = METHODES[methodeActive];
          return (
            <>
              <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16, padding: 20, marginBottom: 20 }}>
                <div style={{ fontSize: 36, marginBottom: 8 }} aria-hidden="true">{m.emoji}</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: "#f0e6c8", margin: "0 0 10px" }}>{m.titre}</h2>
                <p style={{ fontSize: 14, color: "#c4c4c4", lineHeight: 1.6, margin: 0, fontFamily: "'Source Sans 3', sans-serif" }}>{m.intro}</p>
              </div>

              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#d4a8ff", marginBottom: 12 }}>Les étapes</h3>
              {m.etapes.map((e) => (
                <div key={e.num} className="etape-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }} aria-hidden="true">{e.num}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: "#f0e6c8" }}>{e.titre}</div>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {e.contenu.map((c, i) => (
                      <li key={i} style={{ fontSize: 13.5, color: "#c4c4c4", marginBottom: 5, lineHeight: 1.5, fontFamily: "'Source Sans 3', sans-serif" }}>{c}</li>
                    ))}
                  </ul>
                </div>
              ))}

              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#f87171", marginTop: 20, marginBottom: 12 }}>⚠️ Pièges à éviter</h3>
              <div style={{ background: "rgba(248, 113, 113, 0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 12, padding: 16 }}>
                {m.piegesToEviter.map((p, i) => (
                  <div key={i} className="piege-item">
                    <span style={{ color: "#f87171", fontSize: 14, flexShrink: 0 }} aria-hidden="true">✕</span>
                    <span style={{ fontSize: 13.5, color: "#c4c4c4", fontFamily: "'Source Sans 3', sans-serif" }}>{p}</span>
                  </div>
                ))}
              </div>
            </>
          );
        })()}

        {/* FLASHCARD */}
        {vue === "flashcard" && (
          <>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#f0e6c8", margin: "0 0 4px" }}>🃏 Mode révision</h2>
              <p style={{ fontSize: 13, color: "#8892a4", margin: 0, fontFamily: "'Source Sans 3', sans-serif" }}>
                {(flashcardIndex % NOTIONS.length) + 1} / {NOTIONS.length}
              </p>
            </div>

            <div style={{ background: `linear-gradient(135deg, ${flashcardNotion.couleur}33, ${flashcardNotion.couleur}11)`, border: `1px solid ${flashcardNotion.couleur}55`, borderRadius: 20, padding: "32px 24px", marginBottom: 20, minHeight: 220, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }} aria-hidden="true">{flashcardNotion.emoji}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 900, color: "#f0e6c8", margin: "0 0 20px" }}>{flashcardNotion.titre}</h3>
              {flashcardRevelee ? (
                <p style={{ fontSize: 14, color: "#c4c4c4", lineHeight: 1.65, margin: 0, fontFamily: "'Source Sans 3', sans-serif", maxWidth: 560 }}>{flashcardNotion.definition}</p>
              ) : (
                <button
                  onClick={() => setFlashcardRevelee(true)}
                  style={{ padding: "10px 28px", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, color: "#a0aec0", cursor: "pointer", fontSize: 14, fontFamily: "'Source Sans 3', sans-serif" }}
                  aria-label="Révéler la définition"
                >
                  Afficher la définition
                </button>
              )}
            </div>

            {flashcardRevelee && flashcardNotion.citations[0] && (
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 8px", fontFamily: "'Source Sans 3', sans-serif", textTransform: "uppercase", letterSpacing: "0.05em" }}>Citation clé</p>
                <div className="citation-card" style={{ borderColor: flashcardNotion.couleur }}>
                  <p style={{ fontStyle: "italic", fontSize: 14, color: "#e8e6e1", margin: "0 0 6px", fontFamily: "'Playfair Display', serif", lineHeight: 1.6 }}>« {flashcardNotion.citations[0].texte} »</p>
                  <div style={{ fontSize: 12, color: "#8892a4" }}>— <strong style={{ color: "#d4a8ff" }}>{flashcardNotion.citations[0].auteur}</strong>, <em>{flashcardNotion.citations[0].source}</em></div>
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {flashcardRevelee && (
                <>
                  <button
                    onClick={() => toggleProgression(flashcardNotion.id)}
                    style={{ flex: 1, minWidth: 140, padding: "10px 14px", background: progression[flashcardNotion.id] ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)", border: `1px solid ${progression[flashcardNotion.id] ? "#10b981" : "rgba(255,255,255,0.12)"}`, borderRadius: 10, color: progression[flashcardNotion.id] ? "#10b981" : "#a0aec0", cursor: "pointer", fontSize: 13, fontFamily: "'Source Sans 3', sans-serif" }}
                    aria-label={progression[flashcardNotion.id] ? "Retirer des notions révisées" : "Marquer cette notion comme révisée"}
                  >
                    {progression[flashcardNotion.id] ? "✓ Révisée" : "○ Marquer révisée"}
                  </button>
                  <button
                    onClick={() => ouvrirNotion(flashcardNotion)}
                    style={{ flex: 1, minWidth: 140, padding: "10px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, color: "#a0aec0", cursor: "pointer", fontSize: 13, fontFamily: "'Source Sans 3', sans-serif" }}
                    aria-label="Voir la fiche complète de cette notion"
                  >
                    📖 Fiche complète
                  </button>
                </>
              )}
              <button
                onClick={() => { setFlashcardIndex(i => i + 1); setFlashcardRevelee(false); }}
                style={{ flex: 2, minWidth: 160, padding: "10px 20px", background: "linear-gradient(135deg, #7C3AED, #1D4ED8)", border: "none", borderRadius: 10, color: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'Source Sans 3', sans-serif" }}
                aria-label={flashcardRevelee ? "Passer à la notion suivante" : "Passer cette notion"}
              >
                {flashcardRevelee ? "→ Notion suivante" : "→ Passer"}
              </button>
            </div>

            <div style={{ marginTop: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: "#6b7280", fontFamily: "'Source Sans 3', sans-serif" }}>Notions révisées</span>
                <span style={{ fontSize: 12, color: "#6b7280", fontFamily: "'Source Sans 3', sans-serif" }}>{nbRevisees} / {NOTIONS.length}</span>
              </div>
              <div style={{ width: "100%", height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 3 }}>
                <div style={{ width: `${(nbRevisees / NOTIONS.length) * 100}%`, height: "100%", background: "linear-gradient(90deg, #7C3AED, #1D4ED8)", borderRadius: 3, transition: "width 0.3s" }} aria-hidden="true" />
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
