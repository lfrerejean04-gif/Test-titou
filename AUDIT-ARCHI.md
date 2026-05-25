# Audit Architecture — Organisation des éléments

> **Périmètre :** Structure du code et organisation des fichiers  
> **Date :** 25 mai 2026  
> **Base analysée :** `philo-app/src/` après l'implémentation des recommandations UX

---

## Résumé exécutif

L'application fonctionne bien côté utilisateur, mais son architecture interne souffre d'un problème central : **tout le code réside dans un seul composant de 580 lignes** (`PhiloApp.js`). Ce monolithe mélange état, logique, rendu et styles sans aucune séparation. Les 5 axes ci-dessous décrivent les problèmes du plus critique au moins urgent, avec dans chaque cas la cible recommandée.

---

## État actuel de l'arborescence

```
src/
├── index.js                18 lignes   point d'entrée React
├── index.css               13 lignes   styles globaux basiques
├── App.js                   5 lignes   wrapper transparent (inutile)
├── App.css                 39 lignes   ⚠️ MORT — boilerplate CRA jamais utilisé
├── App.test.js              8 lignes   test CRA par défaut
├── PhiloApp.js            580 lignes   ⚠️ TOUTE l'application dans un seul fichier
├── reportWebVitals.js        —         importé mais callback jamais passé
├── setupTests.js             —         configuration Jest non utilisée
├── logo.svg                  —         ⚠️ MORT — jamais importé
└── data/
    ├── notions.js          972 lignes  données des 20 notions ✓
    ├── auteurs.js           22 lignes  19 fiches philosophes ✓
    └── methodes.js         155 lignes  2 guides d'examen ✓
```

Le dossier `data/` est la seule organisation volontaire du projet — les données ont été extraites du composant lors du précédent refactoring. Le reste est du CRA boilerplate non nettoyé et un composant monolithique.

---

## Axe 1 — Le composant monolithique (critique)

### Problème

`PhiloApp.js` assume à lui seul **10 responsabilités** en 580 lignes :

| Responsabilité | Lignes estimées |
|---|---|
| Déclaration d'état (9 `useState`) | ~12 |
| Logique de navigation (ouvrirNotion, ouvrirAuteur…) | ~20 |
| Logique de progression (localStorage) | ~8 |
| Logique de filtrage (recherche) | ~6 |
| Logique de navigation prev/next | ~5 |
| Styles globaux embarqués (`<style>`) | ~75 |
| Rendu Header | ~28 |
| Rendu vue Accueil | ~130 |
| Rendu vue Notion (4 onglets) | ~120 |
| Rendu vues Auteur / Méthode / Flashcard | ~160 |

Le bloc `return` fait à lui seul **525 lignes de JSX imbriqué**. Lire ou modifier une vue oblige à naviguer mentalement dans l'intégralité du fichier.

On relève également un anti-pattern spécifique : la vue Méthode utilise une **IIFE** (fonction immédiatement invoquée) pour accéder à `METHODES[methodeActive]` sans déclarer de variable locale — une solution de contournement qui signale que la logique manque d'une extraction propre.

```jsx
{/* Anti-pattern IIFE dans le JSX */}
{vue === "methode" && methodeActive && (() => {
  const m = METHODES[methodeActive];
  return ( <> ... </> );
})()}
```

### Architecture cible

Découper en **composants à responsabilité unique** :

```
src/
├── PhiloApp.js               ~80 lignes  orchestrateur (state + routing uniquement)
├── constants/
│   └── views.js              constantes VIEWS et TABS
├── hooks/
│   └── useProgression.js     logique localStorage isolée
├── styles/
│   └── theme.js              tokens de design centralisés
├── components/
│   ├── layout/
│   │   └── Header.jsx        en-tête + logo + bouton retour
│   ├── views/
│   │   ├── AccueilView.jsx   page d'accueil complète
│   │   ├── NotionView.jsx    fiche notion (4 onglets)
│   │   ├── AuteurView.jsx    fiche philosophe
│   │   ├── MethodeView.jsx   guide d'examen
│   │   └── FlashcardView.jsx mode révision
│   └── ui/
│       ├── NotionCard.jsx    carte cliquable d'une notion
│       ├── AuteurCard.jsx    carte cliquable d'un auteur
│       ├── CitationCard.jsx  bloc citation avec source
│       ├── ProgressBar.jsx   barre de progression réutilisable
│       └── NavButtons.jsx    boutons précédent / suivant
└── data/                     inchangé ✓
```

**Gain concret :** chaque fichier aurait une seule raison de changer. Modifier l'apparence d'une carte notion ne nécessiterait plus de naviguer dans 580 lignes.

---

## Axe 2 — Les styles sans organisation (majeur)

### Problème

Les couleurs, polices et espacements sont **codés en dur à plus de 150 endroits** dans le JSX via des props `style={{...}}` inline :

```jsx
{/* Exemples de valeurs dupliquées partout */}
color: "#d4a8ff"       // couleur accent violet — apparaît ~25 fois
color: "#8892a4"       // texte secondaire gris — apparaît ~30 fois
color: "#f0e6c8"       // texte principal crème — apparaît ~40 fois
background: "#0f0f13"  // fond principal sombre — référencé globalement
fontFamily: "'Playfair Display', serif"    // répété ~35 fois
fontFamily: "'Source Sans 3', sans-serif" // répété ~40 fois
```

Un changement de couleur d'accent impose de modifier manuellement chaque occurrence. Il n'existe aucun mécanisme de thème.

Par ailleurs, le bloc `<style>` global (75 lignes de CSS) est **embarqué à l'intérieur du composant** React — il est donc recréé à chaque rendu et ne peut pas être mis en cache séparément du JS.

### Cible

Créer `src/styles/theme.js` centralisant les tokens :

```js
export const COLORS = {
  bg:        "#0f0f13",
  bgCard:    "rgba(255,255,255,0.05)",
  textMain:  "#f0e6c8",
  textSub:   "#8892a4",
  textMuted: "#6b7280",
  accent:    "#d4a8ff",
  success:   "#10b981",
};

export const FONTS = {
  serif:     "'Playfair Display', serif",
  sans:      "'Source Sans 3', sans-serif",
};
```

Les styles globaux (classes CSS) devraient être extraits dans `src/index.css` plutôt qu'embarqués dans un composant.

---

## Axe 3 — Les magic strings (modéré)

### Problème

Les identifiants de vue et d'onglet sont des **chaînes littérales dispersées** dans tout le code, sans définition centrale :

```jsx
// Identifiants de vue — utilisés 5+ fois chacun
setVue("accueil")
setVue("notion")
setVue("methode")
setVue("auteur")
setVue("flashcard")

// Clés d'onglets — utilisées dans 3 endroits distincts
setOnglet("idees")
setOnglet("distinctions")
setOnglet("citations")
setOnglet("auteurs")
```

Un typo dans n'importe laquelle de ces chaînes produit un bug silencieux (une vue vide s'affiche, sans erreur console). Il est impossible de détecter ce type d'erreur sans test explicite.

### Cible

```js
// src/constants/views.js
export const VIEWS = {
  ACCUEIL:   "accueil",
  NOTION:    "notion",
  METHODE:   "methode",
  AUTEUR:    "auteur",
  FLASHCARD: "flashcard",
};

export const TABS = {
  IDEES:       "idees",
  DISTINCTIONS:"distinctions",
  CITATIONS:   "citations",
  AUTEURS:     "auteurs",
};
```

---

## Axe 4 — Les données non normalisées (modéré)

### Problème

Le champ `auteurs` de chaque notion est un tableau de **noms en string brut** :

```js
// Dans notions.js
auteurs: ["Descartes", "Hegel", "Husserl", "Merleau-Ponty", ...]

// Dans auteurs.js
{ nom: "Merleau-Ponty", periode: "...", ... }
```

La correspondance entre les deux se fait par comparaison de chaînes (`a.nom === nomAuteur`). Il n'existe aucun contrat formel : si le nom d'un philosophe est orthographié différemment dans `notions.js` et `auteurs.js`, le lien sera cassé sans aucune erreur.

Exemple de désalignement actuel potentiel : certaines notions référencent `"Saint Augustin"`, `"Henri Bergson"`, `"Martin Heidegger"` avec prénom complet, alors que `auteurs.js` utilise `"Bergson"` sans prénom. Le filtre `AUTEURS_CLES.filter(a => notion.auteurs.includes(a.nom))` ne retournera rien pour ces cas.

### Cible

Deux approches possibles :

**Option A (simple) :** Documenter explicitement que les noms dans `notions.auteurs` doivent correspondre exactement aux `auteurs.nom`, et vérifier la cohérence manuellement ou via un test.

**Option B (robuste) :** Ajouter un champ `id` aux auteurs et référencer par ID dans les notions :

```js
// auteurs.js
{ id: "bergson", nom: "Bergson", ... }

// notions.js — auteurs référencés par ID
auteurs: ["descartes", "bergson", "sartre"]
```

---

## Axe 5 — Le code mort (mineur)

Trois éléments occupent de l'espace sans servir à rien :

| Fichier | Statut | Action |
|---|---|---|
| `src/App.css` | 39 lignes jamais importées dans l'app | Supprimer |
| `src/logo.svg` | Asset jamais importé | Supprimer |
| `reportWebVitals.js` | Importé dans `index.js` mais callback non fourni | Supprimer l'appel ou supprimer le fichier |

`App.js` (5 lignes) est un wrapper transparent qui ne fait que `return <PhiloApp />`. Il pourrait être supprimé en rendant `PhiloApp` directement depuis `index.js`, ou conservé comme convention CRA.

---

## Récapitulatif des recommandations

| Axe | Priorité | Effort | Impact |
|---|---|---|---|
| Découper PhiloApp.js en composants | Critique | Élevé | Maintenabilité totale |
| Centraliser les styles (theme.js) | Majeur | Moyen | Thémabilité, cohérence |
| Extraire les constantes (views.js) | Modéré | Faible | Sécurité typo |
| Normaliser les liens données | Modéré | Faible | Fiabilité des liens |
| Supprimer le code mort | Mineur | Très faible | Clarté du projet |

---

## Comparaison avant / après

| Métrique | Maintenant | Cible |
|---|---|---|
| Fichiers composants | 1 (580 lignes) | ~12 (40-80 lignes chacun) |
| Fichiers de style | 0 (tout inline) | 1 theme.js + index.css enrichi |
| Magic strings | ~14 valeurs dispersées | 0 (constants/views.js) |
| Code mort | 3 fichiers / ~80 lignes | 0 |
| Testabilité unitaire | Impossible | Composant par composant |
