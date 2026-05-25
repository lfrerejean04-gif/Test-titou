# Audit complet — Fiches Bac Philo

> **Application auditée :** `philo-app/src/PhiloApp.js`  
> **Date :** 25 mai 2026  
> **Périmètre :** But, intérêt, expérience utilisateur

---

## 1. Présentation générale

**Fiches Bac Philo** est une application web monopage (SPA React) déployée sur GitHub Pages. Elle se présente comme un outil de révision tout-en-un pour la philosophie en classe de Terminale Générale.

**Promesse affichée :** *"Toutes les notions, citations & méthodes"*

**Contenu embarqué :**
- 20 notions du programme officiel (chacune avec définition, 8 idées développées, 5 distinctions conceptuelles, 7 citations, 10 auteurs associés)
- 2 méthodes d'examen complètes (La Dissertation, Le Commentaire de Texte), avec étapes détaillées et pièges à éviter
- 20 fiches philosophes (période, apport, 4 œuvres clés)

**3 vues :** Accueil → Fiche notion OU Fiche méthode → Retour accueil

---

## 2. Analyse du but — La promesse est-elle tenue ?

### Ce qui fonctionne

L'application remplit bien son rôle de **référentiel de contenu**.

- **Couverture exhaustive :** les 20 notions officielles du programme de Terminale Générale sont toutes présentes. Aucune ne manque.
- **Profondeur académique :** les développements philosophiques sont solides, les citations sourcées (auteur + œuvre), les distinctions conceptuelles précises. Le niveau correspond aux exigences du bac.
- **Les deux épreuves couvertes :** dissertation et commentaire de texte sont toutes deux traitées avec leurs spécificités propres.
- **Disponibilité :** une fois la page chargée, l'application fonctionne entièrement hors-ligne — un vrai atout en période de révisions intensives.

### Ce qui manque pour atteindre pleinement le but

L'application est une **fiche de lecture**, pas encore un outil de révision au sens fort.

| Manque | Impact |
|---|---|
| Pas de mode auto-évaluation (quiz, flashcards) | On lit le contenu mais on ne le mémorise pas activement |
| Pas d'annales / sujets types | L'élève ne sait pas à quoi ressemble un vrai sujet de bac |
| Pas de suivi de progression | Impossible de savoir quelles notions ont été révisées |
| Pas de classement par difficulté ou fréquence de passage | Toutes les notions semblent équivalentes, alors qu'elles ne le sont pas |

---

## 3. Analyse de l'intérêt — Quelle valeur apportée ?

### Valeur réelle et différenciante

- **Gain de temps massif :** l'élève dispose en un clic de tout ce qu'il faut pour maîtriser une notion : la problématique, les idées clés, le vocabulaire, les citations et les auteurs. Ce travail prendrait des heures à rassembler depuis des sources dispersées.
- **Les "Distinctions" sont particulièrement précieuses :** cette section, souvent absente des manuels, donne accès au vocabulaire philosophique précis — capital pour éviter les confusions en dissertation.
- **Les citations sont directement mobilisables :** 140 citations sourcées (7 par notion) constituent un capital argumentatif solide pour les copies.
- **La section Méthodes est bien construite :** les étapes sont claires, ordonnées, et la section "Pièges à éviter" est concrète et pédagogique.
- **Expérience de lecture confortable :** le thème sombre, la typographie soignée (Playfair Display + Source Sans 3) et les cartes aérées rendent la consultation agréable lors de longues sessions de révision.

### Limites de l'intérêt

- **Pas de mise en relation entre notions :** La Conscience et L'Inconscient, La Liberté et La Morale, Le Désir et Le Bonheur... les liens évidents entre notions ne sont pas matérialisés. L'élève qui consulte "La Conscience" ne sait pas qu'il peut immédiatement aller vers "L'Inconscient" pour compléter sa compréhension.
- **Les auteurs de l'accueil sont trop enfouis :** la section "Auteurs Clés" apparaît après 20 cartes de notions — soit un scroll de plus d'une page entière. Elle est fonctionnellement invisible pour un usage rapide.
- **Pas de filtre par philosophe :** si un élève révise Kant, il ne peut pas voir d'un coup l'ensemble des notions dans lesquelles Kant intervient.
- **Contenu statique sans personnalisation :** deux élèves différents verront exactement la même chose, quelles que soient leurs lacunes ou leurs priorités.

---

## 4. Analyse UX — Comment l'application est-elle utilisée ?

### 4.1 Navigation et architecture de l'information

**Architecture actuelle :** Accueil (hub central) → Contenu → Retour accueil uniquement

C'est une navigation en étoile à un seul niveau. Elle est simple, mais elle génère des frictions :

- **Aucun chemin direct entre deux notions.** Pour passer de "La Conscience" à "L'Inconscient", l'utilisateur doit impérativement repasser par l'accueil. Sur mobile, cela représente plusieurs scrolls.
- **Le logo/titre "Fiches Bac Philo" n'est pas cliquable** pour revenir à l'accueil — alors que c'est le réflexe naturel de tout utilisateur web. Seul le lien "← Retour à l'accueil" joue ce rôle.
- **Pas de barre de recherche.** Avec 20 notions, 20 auteurs et 2 méthodes, retrouver un élément précis impose de parcourir visuellement l'ensemble de la page d'accueil. La friction monte rapidement sur mobile.
- **Pas de breadcrumb.** Quand on est dans la fiche "La Justice", rien n'indique clairement qu'on peut revenir à la liste des notions.

### 4.2 Expérience sur mobile

L'application est conçue pour desktop et se dégrade sur mobile de façon notable.

- **Grille en 2 colonnes fixes** (`gridTemplateColumns: "1fr 1fr"`) sans media query : sur un écran de 375px, les cartes de notions se retrouvent à ~170px de large avec un texte de 15px — la lecture devient difficile.
- **Textes secondaires à 11-13px** : la taille des métadonnées ("8 idées · 7 citations · 10 auteurs") et des descriptions de méthodes passe sous le seuil lisible sur mobile.
- **Onglets de navigation d'une fiche** : les 4 onglets ("💡 Idées", "⚖️ Distinctions", "💬 Citations", "🎓 Auteurs") tiennent sur une ligne grâce à `overflowX: auto`, mais sans indication visuelle qu'ils sont scrollables.

### 4.3 Accessibilité

L'application présente plusieurs lacunes d'accessibilité fondamentales.

| Problème | Détail |
|---|---|
| Cartes cliquables = `<div onClick>` | Non atteignables au clavier (Tab), non annoncées par les lecteurs d'écran |
| Pas de `role` ni `aria-label` | Les éléments interactifs n'ont aucune sémantique accessible |
| Pas de focus visible | Pas de ring de focus sur les cartes — navigation clavier impossible |
| Couleur comme seul identifiant | Chaque notion a une couleur unique, mais pas de forme ou label alternatif pour les utilisateurs daltoniens |
| Pas d'attribut `lang` | La page n'indique pas sa langue (`lang="fr"` manquant sur `<html>`) |

### 4.4 Onglet "Auteurs" dans les fiches notion — opportunité manquée

Dans chaque fiche notion, l'onglet "🎓 Auteurs" liste les philosophes associés sous forme de tags, puis affiche leur fiche résumée. C'est utile. Mais :

- **On ne peut pas cliquer sur un philosophe** pour voir sa fiche complète dans la section Auteurs Clés de l'accueil.
- Les fiches auteurs affichées dans cet onglet sont **tronquées** par rapport à celles de l'accueil (pas des œuvres, moins de détail).

Résultat : l'utilisateur se retrouve dans une impasse — il voit le nom de Kant, veut en savoir plus, et doit retourner à l'accueil, scroller jusqu'en bas pour retrouver la section Auteurs Clés, puis localiser Kant dans la liste.

### 4.5 Organisation des sections de l'accueil

L'ordre actuel des sections sur l'accueil est :  
`📝 Méthodes → 🧩 Notions → 🎓 Auteurs Clés`

Cette hiérarchie est discutable : les méthodes sont utiles mais secondaires par rapport aux notions dans l'usage quotidien de révision. De plus, les Auteurs Clés en dernière position les rend presque inaccessibles lors d'une visite rapide.

---

## 5. Synthèse — Forces et faiblesses

### Forces

| Domaine | Force |
|---|---|
| Contenu | Exhaustif, académiquement rigoureux, bien structuré |
| Design | Thème sombre agréable, typographie soignée, cartes aérées |
| Structure des fiches | Les 4 onglets (Idées / Distinctions / Citations / Auteurs) organisent bien l'information dense |
| Méthodes | Les étapes et les pièges à éviter sont concrets et directement actionnables |
| Accessibilité offline | Fonctionne après le premier chargement, idéal en conditions de révision |
| Déploiement | GitHub Pages, zéro friction pour l'accès |

### Faiblesses

| Domaine | Faiblesse | Sévérité |
|---|---|---|
| Fonctionnel | Pas de recherche | Critique |
| Fonctionnel | Pas de mode auto-évaluation | Majeure |
| Navigation | Pas de chemin direct entre notions | Majeure |
| Mobile | Grille 2 colonnes non responsive | Majeure |
| Accessibilité | Cartes non accessibles clavier | Majeure |
| Information | Auteurs enterrés en bas de page | Mineure |
| Navigation | Titre non cliquable | Mineure |
| Contenu | Pas de renvois entre notions liées | Mineure |
| Technique | 1399 lignes dans un seul fichier (données + UI + styles) | Technique |

---

## 6. Recommandations prioritaires

Classées par rapport impact / effort :

### Priorité 1 — Impact fort, effort modéré

**1. Barre de recherche globale**  
Un champ de recherche en haut de l'accueil filtrant en temps réel les notions, les auteurs et les citations. Réduirait considérablement la friction d'accès au contenu.

**2. Responsive mobile**  
Ajouter une media query pour passer la grille de notions et de méthodes en 1 colonne sous 600px. Correction de quelques heures, impact immédiat sur tous les utilisateurs mobiles.

**3. Titre cliquable + navigation directe entre notions**  
Rendre le logo/titre cliquable pour revenir à l'accueil. Ajouter des boutons "◀ Précédente" / "Suivante ▶" dans les fiches notion pour circuler sans repasser par l'accueil.

### Priorité 2 — Impact fort, effort plus important

**4. Mode flashcards / quiz**  
Afficher une citation ou une idée clé et demander à l'utilisateur de deviner la notion ou l'auteur. Transformerait l'outil de lecture passive en outil de mémorisation active — beaucoup plus efficace pour le bac.

**5. Suivi de progression (localStorage)**  
Permettre de cocher les notions révisées. Simple à implémenter (localStorage), fort signal motivationnel.

**6. Auteurs cliquables dans les fiches notion**  
Dans l'onglet "Auteurs" d'une fiche notion, rendre les noms de philosophes cliquables pour accéder directement à leur fiche complète, sans repasser par l'accueil.

### Priorité 3 — Accessibilité et maintenance

**7. Accessibilité basique**  
Remplacer les `<div onClick>` par des `<button>`, ajouter `aria-label` sur les éléments interactifs, assurer un focus ring visible. Requis pour tout utilisateur en situation de handicap.

**8. Séparation données / UI**  
Extraire `NOTIONS`, `METHODES` et `AUTEURS_CLES` dans des fichiers JSON séparés. Allège PhiloApp.js (~1000 lignes de données sur 1399) et facilite les mises à jour de contenu sans toucher au code.

---

## Conclusion

**Fiches Bac Philo** est une base solide : le contenu est exhaustif, rigoureux et bien organisé. Pour un lycéen qui cherche à consulter rapidement une notion avant un devoir, l'application remplit son rôle.

Là où elle peine, c'est dans le **passage de la consultation à la révision active** : sans recherche, sans quiz, sans progression visible, l'élève lit mais ne retient pas. C'est la principale limite de la version actuelle par rapport à son ambition.

Les améliorations les plus rentables à court terme sont : la **barre de recherche**, le **responsive mobile** et la **navigation directe entre notions** — trois ajouts relativement simples qui élèveraient significativement l'expérience quotidienne des utilisateurs.
