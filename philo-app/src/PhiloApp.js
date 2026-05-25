import { useState } from "react";
import { NOTIONS } from "./data/notions";
import { AUTEURS_CLES } from "./data/auteurs";
import { useProgression } from "./hooks/useProgression";
import { VIEWS, TABS } from "./constants/views";
import Header from "./components/layout/Header";
import AccueilView from "./components/views/AccueilView";
import NotionView from "./components/views/NotionView";
import AuteurView from "./components/views/AuteurView";
import MethodeView from "./components/views/MethodeView";
import FlashcardView from "./components/views/FlashcardView";

export default function App() {
  const [vue, setVue] = useState(VIEWS.ACCUEIL);
  const [notionActive, setNotionActive] = useState(null);
  const [methodeActive, setMethodeActive] = useState(null);
  const [onglet, setOnglet] = useState(TABS.IDEES);
  const [recherche, setRecherche] = useState("");
  const [auteurActive, setAuteurActive] = useState(null);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardRevelee, setFlashcardRevelee] = useState(false);
  const { progression, toggle: toggleProgression, nbRevisees } = useProgression();

  const ouvrirNotion = (notion) => { setNotionActive(notion); setVue(VIEWS.NOTION); setOnglet(TABS.IDEES); };
  const ouvrirMethode = (key) => { setMethodeActive(key); setVue(VIEWS.METHODE); };
  const ouvrirAuteur = (nomAuteur) => {
    const a = AUTEURS_CLES.find(a => a.nom === nomAuteur);
    if (a) { setAuteurActive(a); setVue(VIEWS.AUTEUR); }
  };
  const retour = () => {
    setVue(VIEWS.ACCUEIL); setNotionActive(null); setMethodeActive(null);
    setAuteurActive(null); setRecherche("");
  };

  const notionIndex = notionActive ? NOTIONS.findIndex(n => n.id === notionActive.id) : -1;
  const notionPrecedente = notionIndex > 0 ? NOTIONS[notionIndex - 1] : null;
  const notionSuivante = notionIndex < NOTIONS.length - 1 ? NOTIONS[notionIndex + 1] : null;

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
    <div style={{ minHeight: "100vh", background: "#0f0f13", color: "#e8e6e1" }}>
      <Header vue={vue} onRetour={retour} />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "20px 16px" }}>
        {vue === VIEWS.ACCUEIL && (
          <AccueilView
            recherche={recherche}
            onRechercheChange={setRecherche}
            notionsFiltrees={notionsFiltrees}
            auteursFiltres={auteursFiltres}
            nbRevisees={nbRevisees}
            progression={progression}
            onToggleProgression={toggleProgression}
            onOuvrirNotion={ouvrirNotion}
            onOuvrirMethode={ouvrirMethode}
            onOuvrirAuteur={ouvrirAuteur}
            onStartFlashcard={() => { setFlashcardIndex(0); setFlashcardRevelee(false); setVue(VIEWS.FLASHCARD); }}
          />
        )}
        {vue === VIEWS.NOTION && notionActive && (
          <NotionView
            notion={notionActive}
            onglet={onglet}
            onOngletChange={setOnglet}
            notionPrecedente={notionPrecedente}
            notionSuivante={notionSuivante}
            progression={progression}
            onToggleProgression={toggleProgression}
            onOuvrirNotion={ouvrirNotion}
            onOuvrirAuteur={ouvrirAuteur}
          />
        )}
        {vue === VIEWS.AUTEUR && auteurActive && (
          <AuteurView auteur={auteurActive} onOuvrirNotion={ouvrirNotion} />
        )}
        {vue === VIEWS.METHODE && methodeActive && (
          <MethodeView methodeKey={methodeActive} />
        )}
        {vue === VIEWS.FLASHCARD && (
          <FlashcardView
            notion={flashcardNotion}
            index={flashcardIndex % NOTIONS.length}
            total={NOTIONS.length}
            revelée={flashcardRevelee}
            onReveler={() => setFlashcardRevelee(true)}
            nbRevisees={nbRevisees}
            progression={progression}
            onToggleProgression={toggleProgression}
            onOuvrirNotion={ouvrirNotion}
            onNext={() => { setFlashcardIndex(i => i + 1); setFlashcardRevelee(false); }}
          />
        )}
      </div>
    </div>
  );
}
