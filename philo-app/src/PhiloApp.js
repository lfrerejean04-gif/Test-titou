// Colle ton composant complet ici
import { useState } from "react";

const NOTIONS = [
  {
    id: "conscience",
    titre: "La Conscience",
    emoji: "🧠",
    couleur: "#7C3AED",
    definition: "La conscience désigne le fait d'avoir des états mentaux, de percevoir le monde et de se percevoir soi-même. On distingue la conscience immédiate (spontanée, tournée vers le monde extérieur) et la conscience réfléchie (retour sur soi, connaissance de soi-même comme sujet pensant). La conscience pose la question de notre rapport à nous-mêmes, à autrui et au monde : est-elle transparente à elle-même ? Est-elle libre ou déterminée ? Y a-t-il quelque chose au-delà d'elle — un inconscient ?",
    distinctions: [
      { terme: "Conscience immédiate / réfléchie", def: "La conscience immédiate est tournée vers le monde (percevoir, agir) ; la conscience réfléchie se prend elle-même pour objet : 'je pense que je pense'. C'est le propre de la réflexivité humaine." },
      { terme: "Conscience / Inconscient", def: "La conscience freudienne n'est que la partie émergée de l'iceberg psychique. L'inconscient est le réservoir des désirs refoulés, inaccessible directement à la conscience." },
      { terme: "Conscience individuelle / collective", def: "Durkheim : la conscience collective est l'ensemble des croyances et sentiments partagés par une société, distincte des consciences individuelles qui la composent." },
      { terme: "Conscience morale / psychologique", def: "La conscience psychologique est la connaissance de ses états mentaux. La conscience morale est le sens du bien et du mal, le 'tribunal intérieur' (Kant)." },
      { terme: "Intentionnalité (Husserl)", def: "Husserl : la conscience est toujours conscience de quelque chose — elle est structurellement intentionnelle, tendue vers un objet. Elle ne peut exister comme conscience 'vide'." },
    ],
    idees: [
      { titre: "Le Cogito cartésien : la conscience comme fondement", contenu: "Descartes, dans les Méditations métaphysiques, fait de la conscience le seul point d'appui indubitable. En doutant de tout, il découvre qu'il ne peut douter qu'il doute : 'Je pense, donc je suis.' La conscience devient le fondement de toute certitude. Ce 'cogito' établit la conscience comme substance pensante (res cogitans), distincte du corps (res extensa). Mais cette certitude est-elle vraiment suffisante ? La conscience peut-elle se connaître pleinement elle-même ?" },
      { titre: "La conscience comme lumière et présence au monde", contenu: "Contrairement à la pierre ou à l'animal, l'homme a conscience de son existence : il peut se représenter sa propre mort, imaginer ce qui n'est pas, se projeter dans l'avenir. Cette 'distance' intérieure vis-à-vis des choses est constitutive de la liberté humaine. Sartre dira que la conscience est 'néant' : elle n'est rien de fixe, elle est pure capacité à se rapporter à toute chose. La conscience 'décolle' du monde, elle n'y est pas simplement immergée." },
      { titre: "L'intentionnalité husserlienne : la conscience toujours dirigée", contenu: "Husserl montre que la conscience n'est jamais une chose repliée sur elle-même : elle est toujours 'conscience de quelque chose' (intentionnalité). Voir, c'est toujours voir quelque chose ; penser, c'est penser à quelque chose. La phénoménologie husserlienne met entre parenthèses ('épochè') les questions métaphysiques pour décrire les structures de l'expérience vécue. Cette approche permet de dépasser l'opposition entre sujet et objet : la conscience et le monde se co-constituent." },
      { titre: "Hegel et la dialectique de la reconnaissance", contenu: "Pour Hegel, la conscience de soi ne se constitue pas seule, dans un solipsisme. Elle a besoin d'être reconnue par une autre conscience. C'est la célèbre dialectique du maître et de l'esclave dans la Phénoménologie de l'esprit : deux consciences luttent pour la reconnaissance ; l'une risque sa vie et devient maître, l'autre capitule et devient esclave. Mais le maître, qui consomme sans produire, reste dépendant ; l'esclave, qui travaille et transforme le monde, développe une vraie conscience autonome. La reconnaissance d'autrui est ainsi constitutive de la conscience de soi." },
      { titre: "Freud et les limites de la conscience", contenu: "Freud bouleverse l'idée que la conscience serait transparente à elle-même. Le moi conscient n'est que la partie émergée d'un psychisme dominé par l'inconscient. Les rêves, lapsus, actes manqués révèlent que des forces que la conscience n'a pas choisies la gouvernent. Le refoulement chasse hors de la conscience les représentations insupportables, mais celles-ci continuent d'agir sous la surface. La conscience n'est donc pas souveraine : 'Le moi n'est pas maître dans sa propre maison.'" },
      { titre: "Merleau-Ponty : la conscience incarnée", contenu: "Merleau-Ponty critique le dualisme cartésien : la conscience n'est pas une âme prisonnière d'un corps, elle est fondamentalement incarnée. Mon corps propre n'est pas un objet parmi d'autres, c'est le 'véhicule de l'être au monde'. Les habitudes corporelles, la motricité, la perception sont des formes de conscience pré-réflexive. Je comprends le monde non par la pensée pure, mais par mon engagement corporel dans le monde. Cette perspective interdit de séparer conscience et corps comme deux substances distinctes." },
      { titre: "Marx : la fausse conscience et l'idéologie", contenu: "Marx inverse la perspective idéaliste : 'Ce n'est pas la conscience des hommes qui détermine leur existence sociale, c'est au contraire leur existence sociale qui détermine leur conscience.' La conscience d'un individu reflète sa position dans les rapports de production. La 'fausse conscience' désigne l'idéologie : l'ensemble des représentations qui masquent les contradictions réelles de la société et font accepter l'ordre dominant comme naturel. La classe ouvrière doit passer de la conscience-en-soi à la conscience-pour-soi pour devenir révolutionnaire." },
      { titre: "La mauvaise foi sartrienne : se fuir soi-même", contenu: "Sartre pose que la conscience est liberté absolue, ce qui est angoissant. Pour fuir cette angoisse, on peut tomber dans la 'mauvaise foi' : se traiter comme une chose déterminée, nier sa liberté. Le garçon de café qui joue à être garçon de café, la femme qui fait semblant de ne pas remarquer les avances, sont dans la mauvaise foi. Mais contrairement à Freud, Sartre refuse l'inconscient comme excuse : la mauvaise foi est une forme de mensonge à soi-même conscient. La conscience ne peut jamais entièrement coïncider avec elle-même (elle est 'pour-soi', jamais 'en-soi')." },
    ],
    citations: [
      { auteur: "Descartes", texte: "Je pense, donc je suis.", source: "Discours de la méthode" },
      { auteur: "Freud", texte: "Le moi n'est pas maître dans sa propre maison.", source: "Introduction à la psychanalyse" },
      { auteur: "Sartre", texte: "L'existence précède l'essence.", source: "L'existentialisme est un humanisme" },
      { auteur: "Hegel", texte: "La conscience de soi n'existe qu'en étant reconnue par une autre conscience de soi.", source: "Phénoménologie de l'esprit" },
      { auteur: "Locke", texte: "La conscience est ce qui fait qu'un homme est lui-même à ses propres yeux.", source: "Essai sur l'entendement humain" },
      { auteur: "Husserl", texte: "Toute conscience est conscience de quelque chose.", source: "Idées directrices pour une phénoménologie" },
      { auteur: "Merleau-Ponty", texte: "Le corps propre est le véhicule de l'être au monde.", source: "Phénoménologie de la perception" },
    ],
    auteurs: ["Descartes", "Freud", "Sartre", "Hegel", "Marx", "Locke", "Husserl", "Merleau-Ponty", "Nietzsche"],
  },
  {
    id: "inconscient",
    titre: "L'Inconscient",
    emoji: "🌊",
    couleur: "#1D4ED8",
    definition: "L'inconscient désigne l'ensemble des processus psychiques qui échappent à la conscience. Au sens freudien, c'est un système dynamique où sont refoulés des désirs, souvenirs et pulsions jugés inacceptables.",
    distinctions: [
      { terme: "Inconscient topique", def: "Première topique freudienne : Conscient / Préconscient / Inconscient." },
      { terme: "Inconscient dynamique", def: "Deuxième topique : Ça / Moi / Surmoi. Le ça est le réservoir des pulsions." },
      { terme: "Le refoulement", def: "Mécanisme par lequel un contenu psychique est chassé de la conscience et maintenu dans l'inconscient." },
    ],
    idees: [
      { titre: "L'inconscient selon Freud", contenu: "L'inconscient n'est pas simplement ce qu'on ignore, mais ce qu'on refuse de savoir. Il se manifeste dans les rêves, les lapsus, les actes manqués." },
      { titre: "La critique de l'inconscient", contenu: "Sartre refuse l'inconscient : il nie la liberté et dédouane le sujet de sa responsabilité. La 'mauvaise foi' est plus juste : on se ment à soi-même consciemment." },
      { titre: "Inconscient cognitif vs freudien", contenu: "Les sciences cognitives parlent d'un inconscient cognitif (traitement automatique de l'info) distinct de l'inconscient freudien à contenu affectif refoulé." },
      { titre: "Le désir et le manque", contenu: "L'inconscient est structuré autour du désir. Le désir n'est jamais satisfait car il vise non l'objet mais la jouissance absolue (Lacan)." },
    ],
    citations: [
      { auteur: "Freud", texte: "Le rêve est la voie royale qui mène à l'inconscient.", source: "L'interprétation des rêves" },
      { auteur: "Freud", texte: "Là où était le ça, le moi doit advenir.", source: "Nouvelles conférences" },
      { auteur: "Sartre", texte: "Il n'y a pas d'inconscient : il y a mauvaise foi.", source: "L'Être et le Néant" },
      { auteur: "Nietzsche", texte: "La grande raison du corps... est un puissant souverain, un sage inconnu.", source: "Ainsi parlait Zarathoustra" },
      { auteur: "Lacan", texte: "L'inconscient est structuré comme un langage.", source: "Écrits" },
    ],
    auteurs: ["Freud", "Lacan", "Sartre", "Nietzsche", "Jung"],
  },
  {
    id: "liberte",
    titre: "La Liberté",
    emoji: "🕊️",
    couleur: "#059669",
    definition: "La liberté est la capacité d'agir selon sa propre volonté, sans contrainte extérieure (liberté négative) ou positive (capacité réelle d'agir, d'épanouissement). Elle pose la question du libre arbitre face au déterminisme.",
    distinctions: [
      { terme: "Libre arbitre", def: "Pouvoir de choisir indépendamment de toute cause : la volonté est autodéterminée." },
      { terme: "Liberté négative", def: "Absence de contrainte extérieure (Berlin). 'Je suis libre si personne ne m'empêche.'" },
      { terme: "Liberté positive", def: "Capacité réelle d'agir, de se réaliser. Nécessite parfois des conditions matérielles." },
      { terme: "Déterminisme", def: "Tout événement, y compris humain, a des causes qui le nécessitent entièrement." },
    ],
    idees: [
      { titre: "Le libre arbitre contre le déterminisme", contenu: "Kant défend le libre arbitre moral : l'homme obéit à la loi morale qu'il se donne lui-même (autonomie). Le déterminisme de la nature ne s'applique pas au sujet moral." },
      { titre: "La liberté sartrienne", contenu: "Sartre : 'L'existence précède l'essence.' L'homme n'a pas de nature fixée ; il est condamné à être libre, à se définir par ses actes. La liberté est absolue mais angoissante." },
      { titre: "Spinoza et la liberté vraie", contenu: "Spinoza rejette le libre arbitre (illusion due à l'ignorance des causes). La vraie liberté est de comprendre la nécessité des choses et d'agir selon sa nature propre (raison)." },
      { titre: "La liberté politique", contenu: "Rousseau : la liberté civile, c'est obéir à la loi qu'on s'est donnée (contrat social). La liberté n'est pas l'absence de loi mais l'autodétermination collective." },
      { titre: "Le compatibilisme", contenu: "Hume, Leibniz : libre arbitre et déterminisme sont compatibles. On est libre quand on agit selon ses propres désirs, même si ceux-ci sont déterminés." },
    ],
    citations: [
      { auteur: "Sartre", texte: "L'homme est condamné à être libre.", source: "L'existentialisme est un humanisme" },
      { auteur: "Spinoza", texte: "Les hommes se croient libres parce qu'ils sont conscients de leurs volitions et de leurs appétits, mais ils ignorent les causes qui les déterminent.", source: "Éthique" },
      { auteur: "Kant", texte: "Agis seulement d'après la maxime grâce à laquelle tu peux vouloir en même temps qu'elle devienne une loi universelle.", source: "Fondements de la métaphysique des mœurs" },
      { auteur: "Rousseau", texte: "L'obéissance à la loi qu'on s'est prescrite est liberté.", source: "Du contrat social" },
      { auteur: "Mill", texte: "La seule liberté qui mérite ce nom est celle de poursuivre notre propre bien à notre propre manière.", source: "De la liberté" },
    ],
    auteurs: ["Sartre", "Kant", "Spinoza", "Rousseau", "Descartes", "Hume", "Schopenhauer"],
  },
  {
    id: "verite",
    titre: "La Vérité",
    emoji: "🔍",
    couleur: "#DC2626",
    definition: "La vérité est l'adéquation de la pensée avec le réel (vérité-correspondance) ou la cohérence interne d'un discours (vérité-cohérence). Elle s'oppose à l'erreur, au mensonge et à l'opinion.",
    distinctions: [
      { terme: "Vérité-correspondance", def: "Une proposition est vraie si elle correspond à la réalité (Aristote : 'Dire de ce qui est qu'il est')." },
      { terme: "Vérité-cohérence", def: "Une proposition est vraie si elle est cohérente avec un système de propositions (mathématiques)." },
      { terme: "Vérité pragmatique", def: "Est vrai ce qui est utile, ce qui fonctionne dans la pratique (William James, Peirce)." },
      { terme: "Opinion (doxa)", def: "Croyance non fondée, subjective, qui peut être vraie par accident mais sans justification." },
    ],
    idees: [
      { titre: "La méthode du doute (Descartes)", contenu: "Pour atteindre la vérité, il faut douter de tout ce qui peut être douté. Seule résiste la certitude du Cogito. La méthode garantit la vérité contre l'erreur." },
      { titre: "Vérité et science", contenu: "La vérité scientifique est provisoire, réfutable (Popper : falsifiabilité). Une théorie est scientifique si elle peut être infirmée par l'expérience." },
      { titre: "Relativisme et perspectivisme", contenu: "Nietzsche : il n'y a pas de faits, seulement des interprétations. La vérité est une illusion utile que nous avons oublié être une illusion." },
      { titre: "Le mensonge et la mauvaise foi", contenu: "Kant condamne le mensonge absolument : mentir détruit la confiance et contredit la dignité humaine. Même à un meurtrier, il faut dire la vérité." },
      { titre: "Vérité et liberté", contenu: "La vérité peut être dangereuse ou inutile socialement (mythe de la caverne : le philosophe revient et est tué). Mais elle reste une exigence éthique." },
    ],
    citations: [
      { auteur: "Aristote", texte: "Dire de ce qui est qu'il n'est pas, ou de ce qui n'est pas qu'il est, c'est le faux ; dire de ce qui est qu'il est, et de ce qui n'est pas qu'il n'est pas, c'est le vrai.", source: "Métaphysique" },
      { auteur: "Nietzsche", texte: "Il n'y a pas de faits, seulement des interprétations.", source: "Fragments posthumes" },
      { auteur: "Descartes", texte: "Je pris garde que, pendant que je voulais ainsi penser que tout était faux, il fallait nécessairement que moi, qui le pensais, fusse quelque chose.", source: "Discours de la méthode" },
      { auteur: "Bachelard", texte: "La vérité scientifique est une erreur rectifiée.", source: "La formation de l'esprit scientifique" },
      { auteur: "Kant", texte: "La vérité est la conformité de la connaissance avec son objet.", source: "Critique de la raison pure" },
    ],
    auteurs: ["Descartes", "Kant", "Nietzsche", "Popper", "Bachelard", "Platon", "Aristote"],
  },
  {
    id: "raison",
    titre: "La Raison et le Réel",
    emoji: "⚙️",
    couleur: "#B45309",
    definition: "La raison est la faculté de penser logiquement, de former des concepts et d'établir des vérités universelles. Le réel désigne ce qui existe indépendamment de notre pensée. La question est : la raison peut-elle saisir le réel ?",
    distinctions: [
      { terme: "Raison théorique", def: "Faculté de connaître, d'expliquer et de comprendre le monde (science, philosophie)." },
      { terme: "Raison pratique", def: "Faculté de diriger l'action morale selon des principes (Kant : impératif catégorique)." },
      { terme: "Rationalisme", def: "La raison seule, sans expérience, peut atteindre la vérité (Descartes, Leibniz)." },
      { terme: "Empirisme", def: "Toute connaissance vient de l'expérience sensible (Locke, Hume)." },
    ],
    idees: [
      { titre: "Rationalisme vs empirisme", contenu: "Descartes : les idées claires et distinctes de la raison sont le fondement de la connaissance. Hume : la raison sans expérience est vide ; seules les impressions sensibles donnent du contenu." },
      { titre: "La synthèse kantienne", contenu: "Kant réconcilie les deux : la connaissance naît de la rencontre des intuitions sensibles et des catégories de l'entendement. Ni raison pure ni expérience brute ne suffisent." },
      { titre: "La dialectique hégélienne", contenu: "Hegel : 'Tout ce qui est rationnel est réel, tout ce qui est réel est rationnel.' La raison se déploie dans l'histoire. Le réel a une structure rationnelle." },
      { titre: "Les limites de la raison", contenu: "La raison a des antinomies (Kant) : elle se contredit quand elle dépasse l'expérience possible (existence de Dieu, liberté, immortalité). Il y a un au-delà de la raison." },
    ],
    citations: [
      { auteur: "Descartes", texte: "Le bon sens est la chose du monde la mieux partagée.", source: "Discours de la méthode" },
      { auteur: "Hegel", texte: "Tout ce qui est rationnel est réel ; tout ce qui est réel est rationnel.", source: "Principes de la philosophie du droit" },
      { auteur: "Kant", texte: "Des intuitions sans concepts sont aveugles, des concepts sans intuitions sont vides.", source: "Critique de la raison pure" },
      { auteur: "Pascal", texte: "Le cœur a ses raisons que la raison ne connaît point.", source: "Pensées" },
      { auteur: "Hume", texte: "La raison est, et ne peut qu'être, l'esclave des passions.", source: "Traité de la nature humaine" },
    ],
    auteurs: ["Descartes", "Kant", "Hegel", "Hume", "Leibniz", "Pascal", "Aristote"],
  },
  {
    id: "temps",
    titre: "Le Temps",
    emoji: "⏳",
    couleur: "#6D28D9",
    definition: "Le temps est la dimension dans laquelle se succèdent les événements, du passé vers l'avenir en passant par le présent. Il pose la question de la conscience du temps, de la mémoire, de la mort et de la finitude humaine.",
    distinctions: [
      { terme: "Temps objectif", def: "Temps mesuré par les horloges, physique, indépendant du sujet (Newton : temps absolu)." },
      { terme: "Temps subjectif", def: "Temps vécu, durée intérieure qui peut sembler longue ou courte selon les états d'âme." },
      { terme: "Temps relatif", def: "Einstein : le temps dépend du référentiel, il n'est pas absolu." },
    ],
    idees: [
      { titre: "Saint Augustin : le temps est dans l'âme", contenu: "Le passé n'existe plus, le futur n'est pas encore, et le présent n'a aucune durée. Seul le présent de l'âme existe : souvenir du passé, attention au présent, attente du futur." },
      { titre: "Bergson : la durée", contenu: "Bergson distingue le temps scientifique (spatialisé, mesuré) et la durée vécue, flux continu et qualitatif de la conscience. Le temps vécu est irréductible à la mesure." },
      { titre: "Heidegger : l'être-vers-la-mort", contenu: "La mort est la possibilité la plus propre de l'être humain. C'est elle qui donne au temps son sens. L'angoisse devant la mort révèle notre finitude et notre liberté." },
      { titre: "Le temps et l'identité personnelle", contenu: "Comment suis-je le même malgré le changement ? La mémoire (Locke) ou le récit de soi (Ricoeur : identité narrative) permettent de maintenir une continuité." },
    ],
    citations: [
      { auteur: "Saint Augustin", texte: "Qu'est-ce donc que le temps ? Si personne ne me le demande, je le sais ; mais si on me le demande et que je veuille l'expliquer, je ne le sais plus.", source: "Confessions" },
      { auteur: "Bergson", texte: "Le temps est invention ou il n'est rien du tout.", source: "L'évolution créatrice" },
      { auteur: "Heidegger", texte: "La mort est la possibilité de l'impossibilité de toute possibilité.", source: "Être et Temps" },
      { auteur: "Héraclite", texte: "On ne se baigne jamais deux fois dans le même fleuve.", source: "Fragments" },
      { auteur: "Pascal", texte: "Nous ne vivons jamais, mais nous espérons de vivre ; et, nous disposant toujours à être heureux, il est inévitable que nous ne le soyons jamais.", source: "Pensées" },
    ],
    auteurs: ["Saint Augustin", "Bergson", "Heidegger", "Kant", "Héraclite", "Platon", "Ricoeur"],
  },
  {
    id: "autrui",
    titre: "Autrui",
    emoji: "👥",
    couleur: "#0891B2",
    definition: "Autrui désigne l'autre être humain, semblable et différent à la fois. Sa présence pose des problèmes fondamentaux : peut-on le connaître ? Est-il obstacle ou condition de ma liberté ? Fonde-t-il ma propre identité ?",
    distinctions: [
      { terme: "L'alter ego", def: "Autrui comme autre moi-même, semblable par nature mais distinct par existence." },
      { terme: "L'altérité radicale", def: "Autrui comme absolument autre, irréductible à ma représentation (Levinas)." },
      { terme: "L'intersubjectivité", def: "Le sujet se constitue dans et par la relation à autrui (Hegel, Husserl)." },
    ],
    idees: [
      { titre: "Le problème du solipsisme", contenu: "Comment sortir du solipsisme (seule ma conscience existe) ? On ne peut jamais directement accéder à l'intériorité d'autrui. Husserl : analogie — autrui est un alter ego que j'appréhende par 'transfert apperceptif'." },
      { titre: "La dialectique du maître et de l'esclave", contenu: "Hegel : la conscience de soi a besoin d'être reconnue par une autre conscience. Struggle pour la reconnaissance : celui qui risque sa vie devient maître, l'autre esclave. Mais le maître dépend de l'esclave." },
      { titre: "Le regard d'autrui (Sartre)", contenu: "Le regard d'autrui me transforme en objet, me 'pétrifies'. Il menace ma liberté. 'L'enfer, c'est les autres.' Mais autrui est aussi nécessaire pour que j'existe comme sujet." },
      { titre: "Le visage d'autrui (Levinas)", contenu: "Levinas : le visage d'autrui m'interpelle et me met en question. Il dit 'Tu ne tueras point'. L'éthique (responsabilité envers autrui) précède l'ontologie. Autrui est l'infini." },
    ],
    citations: [
      { auteur: "Sartre", texte: "L'enfer, c'est les autres.", source: "Huis clos" },
      { auteur: "Levinas", texte: "Le visage ouvre le discours originel dont le premier mot est obligation.", source: "Totalité et infini" },
      { auteur: "Hegel", texte: "La conscience de soi n'est qu'en étant reconnue par une autre conscience de soi.", source: "Phénoménologie de l'esprit" },
      { auteur: "Rimbaud", texte: "Je est un autre.", source: "Lettre du voyant" },
      { auteur: "Buber", texte: "Toute vie véritable est rencontre.", source: "Je et Tu" },
    ],
    auteurs: ["Sartre", "Levinas", "Hegel", "Husserl", "Heidegger", "Merleau-Ponty"],
  },
  {
    id: "bonheur",
    titre: "Le Bonheur",
    emoji: "☀️",
    couleur: "#D97706",
    definition: "Le bonheur est un état de satisfaction globale et durable de l'existence. Il se distingue du plaisir (momentané) et de la joie (ponctuelle). Les philosophes débattent : est-il possible ? Comment l'atteindre ? Est-ce le but de la vie morale ?",
    distinctions: [
      { terme: "Eudémonisme", def: "Le bonheur (eudaimonia) comme épanouissement complet de l'être humain, réalisation de ses capacités (Aristote)." },
      { terme: "Hédonisme", def: "Le bonheur consiste dans la recherche des plaisirs et l'absence de douleur (Épicure)." },
      { terme: "Stoïcisme", def: "Le bonheur est indépendant des biens extérieurs ; il réside dans la vertu et la maîtrise de soi (Épictète, Marc Aurèle)." },
    ],
    idees: [
      { titre: "Aristote : le bonheur comme fin suprême", contenu: "Le bonheur est la fin ultime de l'action humaine. Il n'est pas un état passif mais une activité de l'âme conforme à la vertu. Il implique des biens extérieurs et des relations sociales (amitié)." },
      { titre: "Épicure : ataraxie et aponie", contenu: "Le bonheur épicurien : ataraxie (absence de trouble de l'âme) + aponie (absence de douleur du corps). On l'atteint en maîtrisant ses désirs : distinguer désirs naturels-nécessaires, naturels-non nécessaires, vains." },
      { titre: "Kant contre l'eudémonisme", contenu: "Kant critique ceux qui font du bonheur le fondement de la morale. Le bonheur est un idéal de l'imagination, pas de la raison. La morale doit se fonder sur le devoir, pas sur le bonheur." },
      { titre: "Schopenhauer : l'impossibilité du bonheur", contenu: "Le désir est souffrance : quand il est insatisfait on souffre, quand il est satisfait on s'ennuie. La volonté de vivre est irrationnelle et source de douleur. Seule la sagesse ascétique libère." },
    ],
    citations: [
      { auteur: "Aristote", texte: "Le bonheur est une activité de l'âme en accord avec la vertu.", source: "Éthique à Nicomaque" },
      { auteur: "Épicure", texte: "Il n'est jamais trop tôt ni trop tard pour prendre soin de son âme.", source: "Lettre à Ménécée" },
      { auteur: "Kant", texte: "Le bonheur est un idéal non de la raison mais de l'imagination.", source: "Fondements de la métaphysique des mœurs" },
      { auteur: "Pascal", texte: "Tous les hommes recherchent d'être heureux ; cela est sans exception.", source: "Pensées" },
      { auteur: "Alain", texte: "Le pessimisme est d'humeur, l'optimisme est de volonté.", source: "Propos sur le bonheur" },
    ],
    auteurs: ["Aristote", "Épicure", "Kant", "Schopenhauer", "Mill", "Alain", "Stoïciens"],
  },
  {
    id: "etat",
    titre: "L'État",
    emoji: "🏛️",
    couleur: "#1E40AF",
    definition: "L'État est une organisation politique qui exerce le pouvoir souverain sur un territoire et une population. Il détient le monopole de la violence légitime (Weber). La question centrale : pourquoi obéir à l'État ? Quelle est sa légitimité ?",
    distinctions: [
      { terme: "État de nature", def: "Situation hypothétique sans État : pour Hobbes, guerre de tous contre tous ; pour Rousseau, innocence et liberté." },
      { terme: "État de droit", def: "État soumis lui-même aux lois qu'il édicte ; les droits fondamentaux sont garantis." },
      { terme: "Souveraineté", def: "Pouvoir suprême de l'État, intérieur (sur les citoyens) et extérieur (indépendance vis-à-vis des autres États)." },
    ],
    idees: [
      { titre: "Le contrat social", contenu: "Hobbes, Locke, Rousseau : l'État naît d'un contrat par lequel les individus cèdent tout ou partie de leurs droits naturels en échange de la sécurité et de la justice. Mais ce 'contrat' est hypothétique, non historique." },
      { titre: "Hobbes : l'État Léviathan", contenu: "Sans État, la vie est 'solitaire, misérable, dangereuse, animale et brève'. Les individus cèdent tous leurs droits au souverain (Léviathan) pour avoir la paix. L'État ne peut être tyrannique par définition." },
      { titre: "Rousseau : la volonté générale", contenu: "Le souverain, c'est le peuple dans son ensemble exprimant la volonté générale (bien commun), distincte de la volonté de tous (somme des intérêts particuliers). La démocratie directe est idéale." },
      { titre: "Marx : l'État comme instrument de classe", contenu: "L'État n'est pas neutre : il est l'instrument de la classe dominante pour maintenir son pouvoir économique. Dans une société communiste, l'État est amené à dépérir." },
      { titre: "L'anarchisme", contenu: "Proudhon, Bakounine : l'État est foncièrement oppressif. Toute autorité doit être abolie au profit de l'organisation libre et fédérale des individus." },
    ],
    citations: [
      { auteur: "Hobbes", texte: "L'homme est un loup pour l'homme.", source: "De Cive" },
      { auteur: "Rousseau", texte: "L'homme est né libre, et partout il est dans les fers.", source: "Du contrat social" },
      { auteur: "Weber", texte: "L'État est la communauté humaine qui, à l'intérieur d'un territoire déterminé, revendique avec succès le monopole de la violence physique légitime.", source: "Le savant et le politique" },
      { auteur: "Marx", texte: "Le gouvernement de l'État moderne n'est qu'un comité qui gère les affaires communes de la bourgeoisie.", source: "Manifeste du parti communiste" },
      { auteur: "Montesquieu", texte: "Pour qu'on ne puisse pas abuser du pouvoir, il faut que, par la disposition des choses, le pouvoir arrête le pouvoir.", source: "De l'esprit des lois" },
    ],
    auteurs: ["Hobbes", "Rousseau", "Locke", "Marx", "Weber", "Montesquieu", "Platon"],
  },
  {
    id: "travail",
    titre: "Le Travail",
    emoji: "⚒️",
    couleur: "#7C3AED",
    definition: "Le travail est une activité transformatrice par laquelle l'homme modifie la nature pour satisfaire ses besoins. Il est à la fois nécessité (contrainte) et moyen d'accomplissement humain (liberté). Il crée de la valeur sociale et définit l'identité.",
    distinctions: [
      { terme: "Travail vs œuvre vs action", def: "Arendt : travail (production de biens consommables), œuvre (création d'objets durables), action (activité politique)." },
      { terme: "Valeur d'usage / valeur d'échange", def: "Marx : la valeur d'usage est l'utilité concrète d'un bien ; la valeur d'échange est sa valeur marchande." },
      { terme: "Aliénation", def: "Marx : le travailleur salarié est aliéné car il ne possède pas le produit de son travail, ni les moyens de production." },
    ],
    idees: [
      { titre: "Hegel : le travail comme humanisation", contenu: "Dans la dialectique maître-esclave, l'esclave travaille et se réalise en transformant le monde ; le maître consomme sans produire et reste dépendant. Le travail est formateur (Bildung)." },
      { titre: "Marx et l'aliénation", contenu: "Dans le capitalisme, le travailleur est aliéné : il est étranger à son travail (contraint, non épanouissant), au produit (qui appartient au patron), aux autres travailleurs (concurrence) et à lui-même." },
      { titre: "Le travail comme valeur", contenu: "Le travail donne une identité sociale, une place dans la communauté. Le chômage est donc une désocialisation, pas seulement économique mais existentielle." },
      { titre: "Hannah Arendt : la fin du travail ?", contenu: "L'automatisation libère du travail mais risque une société de 'laborants' sans œuvre ni action politique. Qu'est-ce que la vie humaine sans travail ?" },
    ],
    citations: [
      { auteur: "Marx", texte: "Le travail aliéné retourne le rapport : c'est parce que l'homme est un être générique qu'il fait de son activité vitale le simple moyen de son existence physique.", source: "Manuscrits de 1844" },
      { auteur: "Hegel", texte: "Le serviteur se rend compte, en travaillant, qu'il a une existence propre.", source: "Phénoménologie de l'esprit" },
      { auteur: "Voltaire", texte: "Le travail éloigne de nous trois grands maux : l'ennui, le vice et le besoin.", source: "Candide" },
      { auteur: "Arendt", texte: "Nous vivons dans une société de laborants dont nous avons supprimé le travail.", source: "Condition de l'homme moderne" },
      { auteur: "Freud", texte: "L'amour et le travail sont les deux piliers du bonheur humain.", source: "Malaise dans la civilisation" },
    ],
    auteurs: ["Marx", "Hegel", "Arendt", "Simone Weil", "Voltaire", "Freud"],
  },
  {
    id: "religion",
    titre: "La Religion",
    emoji: "✡️",
    couleur: "#B45309",
    definition: "La religion est un ensemble de croyances, de pratiques et de rites qui unissent une communauté autour du rapport au sacré et au divin. Elle pose la question de la foi vs la raison, et du rôle social du religieux.",
    distinctions: [
      { terme: "Foi vs raison", def: "La foi est adhésion à des vérités révélées ; la raison cherche à démontrer. Peut-on prouver l'existence de Dieu ?" },
      { terme: "Théisme / déisme / athéisme", def: "Théisme : Dieu personnel et providentiel. Déisme : Dieu créateur mais absent. Athéisme : négation de l'existence de Dieu." },
      { terme: "Le sacré vs le profane", def: "Durkheim : distinction fondamentale dans toute religion entre ce qui est séparé (sacré) et le domaine ordinaire (profane)." },
    ],
    idees: [
      { titre: "Les preuves de l'existence de Dieu", contenu: "Argument ontologique (Anselme, Descartes) : Dieu est l'être dont on ne peut concevoir de plus grand, donc il existe nécessairement. Kant : réfutation — l'existence n'est pas un prédicat." },
      { titre: "La religion comme illusion (Feuerbach, Marx, Freud)", contenu: "Feuerbach : Dieu est une projection de l'homme idéalisé. Marx : religion = opium du peuple, consolation qui détourne des vraies luttes. Freud : la religion est une névrose collective, un désir infantile de protection." },
      { titre: "Durkheim : la religion comme lien social", contenu: "La religion n'est pas d'abord théologique mais sociale. Elle crée la cohésion d'un groupe autour du sacré. Le Dieu adoré, c'est la société transfigurée." },
      { titre: "La religion et la morale", contenu: "Kant : la morale est autonome et n'a pas besoin de Dieu pour se fonder. Mais la religion peut accompagner la morale comme espoir du bien souverain." },
    ],
    citations: [
      { auteur: "Marx", texte: "La religion est l'opium du peuple.", source: "Contribution à la critique de la philosophie du droit de Hegel" },
      { auteur: "Freud", texte: "La religion est la névrose obsessionnelle universelle de l'humanité.", source: "L'avenir d'une illusion" },
      { auteur: "Durkheim", texte: "La religion est une chose éminemment sociale.", source: "Les formes élémentaires de la vie religieuse" },
      { auteur: "Pascal", texte: "Le cœur a ses raisons que la raison ne connaît point.", source: "Pensées" },
      { auteur: "Nietzsche", texte: "Dieu est mort ! Dieu reste mort ! Et c'est nous qui l'avons tué !", source: "Le Gai Savoir" },
    ],
    auteurs: ["Marx", "Freud", "Durkheim", "Kant", "Nietzsche", "Pascal", "Feuerbach"],
  },
  {
    id: "art",
    titre: "L'Art",
    emoji: "🎨",
    couleur: "#DB2777",
    definition: "L'art est une activité humaine de création de formes esthétiques ayant une valeur propre, irréductible à l'utilité. Il soulève les questions : qu'est-ce que le beau ? quelle est la fonction de l'art ? comment juge-t-on une œuvre ?",
    distinctions: [
      { terme: "Beau naturel vs beau artistique", def: "Hegel : la beauté artistique est supérieure car elle exprime l'esprit humain." },
      { terme: "Jugement de goût", def: "Kant : le jugement esthétique ('c'est beau') est subjectif mais prétend à l'universalité. Il est désintéressé." },
      { terme: "Art vs artisanat", def: "L'art crée quelque chose d'original et de non-reproductible (au moins en intention) ; l'artisanat applique des règles techniques." },
    ],
    idees: [
      { titre: "Platon : l'art comme imitation dangereuse", contenu: "L'art est mimèsis (imitation) : copie de copie, il éloigne de la vérité. Les œuvres séduisent les passions et détournent de la raison. Platon veut expulser les poètes de la cité." },
      { titre: "Aristote : la catharsis", contenu: "Aristote réhabilite l'art : la tragédie provoque terreur et pitié et produit une catharsis (purification) des passions. L'art est utile à l'âme." },
      { titre: "Kant : le beau et le sublime", contenu: "Le beau est un plaisir désintéressé, sans concept, mais universel. Le sublime est la rencontre avec quelque chose d'immense ou de puissant qui dépasse nos facultés mais révèle notre raison morale." },
      { titre: "Hegel : la mort de l'art ?", contenu: "L'art est la manifestation sensible de l'idée absolue. Mais la philosophie le dépasse : à l'époque moderne, le concept prime sur l'image. L'art 'est du passé'." },
      { titre: "L'art contemporain", contenu: "Avec Duchamp (ready-made), n'importe quel objet peut être de l'art si placé dans un contexte artistique. L'art se définit institutionnellement (Danto : le monde de l'art)." },
    ],
    citations: [
      { auteur: "Kant", texte: "Est beau ce qui plaît universellement sans concept.", source: "Critique de la faculté de juger" },
      { auteur: "Hegel", texte: "L'art est la manifestation sensible de l'idée.", source: "Cours d'esthétique" },
      { auteur: "Platon", texte: "L'art est une imitation d'imitation, trois fois éloigné de la vérité.", source: "La République" },
      { auteur: "Nietzsche", texte: "Nous avons l'art pour ne pas mourir de la vérité.", source: "La volonté de puissance" },
      { auteur: "Malraux", texte: "L'art est un anti-destin.", source: "Les voix du silence" },
    ],
    auteurs: ["Kant", "Hegel", "Platon", "Aristote", "Nietzsche", "Duchamp", "Danto"],
  },
  {
    id: "langage",
    titre: "Le Langage",
    emoji: "🗣️",
    couleur: "#0E7490",
    definition: "Le langage est un système de signes permettant de communiquer, d'exprimer la pensée et de représenter le monde. Il est à la fois outil de communication (fonction sociale) et condition de la pensée (fonction constitutive). La question centrale : le langage exprime-t-il fidèlement la pensée, ou la constitue-t-il ?",
    distinctions: [
      { terme: "Langue vs parole", def: "Saussure : la langue est le système collectif de signes (code), la parole est l'usage individuel et concret de ce système." },
      { terme: "Signe linguistique", def: "Saussure : le signe est l'union d'un signifiant (image acoustique) et d'un signifié (concept). Le lien est arbitraire (aucun rapport naturel entre le son 'arbre' et l'arbre réel)." },
      { terme: "Langage vs langue vs parole", def: "Le langage est la faculté générale (humaine), la langue est un système particulier (français, japonais…), la parole est l'acte singulier d'un locuteur." },
      { terme: "Performatif vs constatif", def: "Austin : certains énoncés font ce qu'ils disent ('Je vous déclare mariés') — performatifs ; d'autres décrivent une réalité — constatatifs." },
    ],
    idees: [
      { titre: "Le langage constitue la pensée", contenu: "Hegel : 'Le mot donne à la pensée son existence la plus haute et la plus vraie.' Sans mots, la pensée reste vague et informe. Le langage n'est pas l'habit de la pensée mais sa demeure (Heidegger : 'Le langage est la maison de l'être')." },
      { titre: "L'arbitraire du signe (Saussure)", contenu: "Il n'y a pas de lien naturel entre un son et un sens. C'est la convention sociale qui lie signifiant et signifié. Les langues découpent différemment la réalité : le langage est donc un filtre interprétatif du monde." },
      { titre: "Les limites du langage", contenu: "Wittgenstein : 'Les limites de mon langage sont les limites de mon monde.' Mais aussi : il y a des choses que le langage ne peut pas dire (mystique, indicible). 'Ce dont on ne peut parler, il faut le taire.'" },
      { titre: "Langage et pouvoir", contenu: "Orwell (1984) : maîtriser le langage, c'est maîtriser la pensée. La novlangue réduit le vocabulaire pour rendre certaines pensées impossibles. Bourdieu : le langage est un lieu de domination sociale (capital linguistique)." },
      { titre: "Les actes de langage", contenu: "Austin et Searle : parler c'est agir. Tout énoncé accomplit un acte illocutoire (promettre, ordonner, affirmer). Le langage transforme la réalité sociale et crée des engagements, des institutions." },
      { titre: "L'animal et le langage", contenu: "Aristote : l'animal a la voix (phonè) pour exprimer plaisir/douleur ; l'homme seul a le logos (parole rationnelle) pour dire le juste et l'injuste. Le langage est constitutif de la cité et de la politique." },
    ],
    citations: [
      { auteur: "Heidegger", texte: "Le langage est la maison de l'être.", source: "Lettre sur l'humanisme" },
      { auteur: "Wittgenstein", texte: "Les limites de mon langage sont les limites de mon monde.", source: "Tractatus logico-philosophicus" },
      { auteur: "Saussure", texte: "Dans la langue, il n'y a que des différences.", source: "Cours de linguistique générale" },
      { auteur: "Aristote", texte: "L'homme est le seul animal qui ait le don de la parole.", source: "Politique" },
      { auteur: "Benveniste", texte: "C'est dans et par le langage que l'homme se constitue comme sujet.", source: "Problèmes de linguistique générale" },
      { auteur: "Wittgenstein", texte: "Ce dont on ne peut parler, il faut le taire.", source: "Tractatus logico-philosophicus" },
    ],
    auteurs: ["Saussure", "Wittgenstein", "Heidegger", "Austin", "Aristote", "Benveniste", "Bourdieu", "Chomsky"],
  },
  {
    id: "politique",
    titre: "La Politique",
    emoji: "⚖️",
    couleur: "#BE185D",
    definition: "La politique désigne l'organisation de la vie collective, la gestion du pouvoir et la recherche du bien commun au sein d'une cité ou d'un État. Elle pose les questions de la légitimité du pouvoir, de la justice sociale, des régimes politiques et de la participation des citoyens.",
    distinctions: [
      { terme: "Pouvoir / autorité / domination", def: "Le pouvoir est la capacité d'agir sur autrui. L'autorité est un pouvoir reconnu comme légitime. La domination (Weber) est l'exercice du pouvoir par la force ou la tradition." },
      { terme: "Démocratie directe / représentative", def: "Directe : les citoyens décident eux-mêmes (Rousseau, idéal athénien). Représentative : les citoyens élisent des représentants qui décident à leur place." },
      { terme: "Légitimité vs légalité", def: "La légalité est la conformité à la loi ; la légitimité est la justification morale ou populaire du pouvoir. Un pouvoir peut être légal sans être légitime (tyrannie légalisée)." },
    ],
    idees: [
      { titre: "L'animal politique (Aristote)", contenu: "Aristote : l'homme est un 'zôon politikon' (animal politique). La cité n'est pas une convention artificielle mais répond à la nature sociale de l'homme. Vivre hors de la cité, c'est être une bête ou un dieu." },
      { titre: "La séparation des pouvoirs (Montesquieu)", contenu: "Pour éviter la tyrannie, il faut séparer le pouvoir législatif (faire les lois), exécutif (les appliquer) et judiciaire (les faire respecter). 'Le pouvoir arrête le pouvoir.' Fondement des démocraties modernes." },
      { titre: "La démocratie et ses limites", contenu: "Platon critique la démocratie : le peuple ignorant peut être manipulé par des démagogues. Tocqueville : risque de 'tyrannie de la majorité' — la démocratie peut écraser les minorités. Churchill : 'La démocratie est le pire des régimes, à l'exception de tous les autres.'" },
      { titre: "La violence et le politique (Arendt)", contenu: "Arendt distingue pouvoir (action concertée des citoyens) et violence (destruction du pouvoir). La politique authentique repose sur la pluralité et le dialogue. La violence est l'aveu de l'échec politique." },
      { titre: "La désobéissance civile", contenu: "Thoreau, Rawls : il est parfois légitime de désobéir aux lois injustes, de façon non-violente et publique, en acceptant les sanctions. La désobéissance civile suppose la reconnaissance de l'ordre politique qu'elle entend corriger." },
      { titre: "Libéralisme vs républicanisme", contenu: "Le libéralisme (Locke, Rawls) privilégie les droits individuels et la neutralité de l'État. Le républicanisme (Rousseau, Pettit) insiste sur la participation active des citoyens à la volonté générale et la non-domination." },
    ],
    citations: [
      { auteur: "Aristote", texte: "L'homme est par nature un animal politique.", source: "Politique" },
      { auteur: "Montesquieu", texte: "Pour qu'on ne puisse pas abuser du pouvoir, il faut que, par la disposition des choses, le pouvoir arrête le pouvoir.", source: "De l'esprit des lois" },
      { auteur: "Rousseau", texte: "La souveraineté ne peut être représentée, par la même raison qu'elle ne peut être aliénée.", source: "Du contrat social" },
      { auteur: "Arendt", texte: "Le pouvoir correspond à la capacité humaine d'agir de façon concertée.", source: "Du mensonge à la violence" },
      { auteur: "Tocqueville", texte: "La démocratie étend la sphère de l'indépendance individuelle, le socialisme la resserre.", source: "De la démocratie en Amérique" },
      { auteur: "Machiavel", texte: "Il vaut mieux être craint qu'aimé, si l'on ne peut être les deux.", source: "Le Prince" },
    ],
    auteurs: ["Aristote", "Platon", "Montesquieu", "Rousseau", "Arendt", "Machiavel", "Tocqueville", "Rawls"],
  },
  {
    id: "justice",
    titre: "La Justice",
    emoji: "🏛️",
    couleur: "#065F46",
    definition: "La justice désigne à la fois une vertu morale (être juste), une institution (le droit, les tribunaux) et un principe politique (organisation équitable de la société). Elle articule égalité, équité, droit et mérite.",
    distinctions: [
      { terme: "Justice commutative", def: "Justice dans les échanges : l'égalité arithmétique entre ce qu'on donne et ce qu'on reçoit (contrats, sanctions pénales)." },
      { terme: "Justice distributive", def: "Répartition des biens selon un critère : mérite (Aristote), besoin (Marx), égalité des chances (Rawls)." },
      { terme: "Droit naturel vs droit positif", def: "Le droit naturel est universel et immuable (inhérent à la nature humaine). Le droit positif est le droit effectivement établi dans une société (peut être injuste)." },
      { terme: "Légalité vs justice", def: "Ce qui est légal n'est pas toujours juste (lois racistes). La justice peut exiger de dépasser la légalité (résistance, désobéissance civile)." },
    ],
    idees: [
      { titre: "Platon : la justice comme harmonie", contenu: "Dans La République, la justice est l'harmonie entre les trois parties de l'âme (raison, cœur, désir) et les trois classes de la cité (philosophes, guerriers, artisans). Chacun remplit sa fonction propre." },
      { titre: "Aristote : rendre à chacun le sien", contenu: "La justice distributive consiste à proportionner les récompenses au mérite. L'égalité géométrique (selon la valeur) est plus juste que l'égalité arithmétique stricte pour Aristote." },
      { titre: "La théorie de la justice de Rawls", contenu: "Rawls construit la justice derrière un 'voile d'ignorance' : si on ignorait notre place dans la société, on choisirait des principes équitables. 1er principe : égalité des libertés fondamentales. 2e principe : les inégalités ne sont acceptables que si elles bénéficient aux plus défavorisés (principe de différence)." },
      { titre: "Marx : la justice bourgeoise", contenu: "Marx critique la justice formelle qui masque les inégalités réelles. L'égalité devant la loi est une illusion quand les conditions matérielles sont profondément inégales. La vraie justice exige l'abolition des classes." },
      { titre: "La vengeance vs la justice", contenu: "La justice institutionnelle se distingue de la vengeance privée par son impartialité, sa proportionnalité et son caractère public. Elle vise à rétablir l'ordre social, non à satisfaire une rancœur personnelle." },
      { titre: "Justice et pardon", contenu: "Peut-on à la fois exiger justice et accorder le pardon ? Jankélévitch : certains crimes sont imprescriptibles. Ricoeur : le pardon ne supprime pas la justice mais ouvre une dimension nouvelle — il libère l'avenir du passé." },
    ],
    citations: [
      { auteur: "Rawls", texte: "La justice est la première vertu des institutions sociales, comme la vérité est celle des systèmes de pensée.", source: "Théorie de la justice" },
      { auteur: "Aristote", texte: "La justice consiste à traiter également les égaux et inégalement les inégaux.", source: "Éthique à Nicomaque" },
      { auteur: "Platon", texte: "La justice, c'est accomplir sa tâche propre et ne pas se mêler de celle des autres.", source: "La République" },
      { auteur: "Pascal", texte: "Ne pouvant faire que ce qui est juste fût fort, on a fait que ce qui est fort fût juste.", source: "Pensées" },
      { auteur: "Marx", texte: "De chacun selon ses capacités, à chacun selon ses besoins.", source: "Critique du programme de Gotha" },
      { auteur: "Cicéron", texte: "La loi suprême, c'est le salut du peuple.", source: "De Legibus" },
    ],
    auteurs: ["Platon", "Aristote", "Rawls", "Marx", "Pascal", "Kant", "Ricoeur", "Jankélévitch"],
  },
  {
    id: "nature",
    titre: "La Nature",
    emoji: "🌿",
    couleur: "#047857",
    definition: "La nature désigne soit l'ensemble du monde physique (opposé à la culture), soit l'essence propre d'un être (sa 'nature'). La question est : qu'est-ce qui est naturel ? L'homme est-il un être naturel ou culturel ? Doit-on respecter la nature ?",
    distinctions: [
      { terme: "Nature vs culture", def: "La culture est ce qui est produit par l'homme et transforme la nature. La question : y a-t-il une nature humaine ?" },
      { terme: "Nature normative", def: "La nature comme modèle ou norme (ce qui est 'contre nature'). Attention : sophisme naturaliste." },
      { terme: "Nature sauvage vs domestiquée", def: "Opposition entre nature vierge et nature transformée par l'activité humaine." },
    ],
    idees: [
      { titre: "L'état de nature", contenu: "Hypothèse philosophique sur l'homme sans culture. Hobbes : état de guerre. Rousseau : bonté naturelle corrompue par la société. Locke : raison et propriété déjà présentes." },
      { titre: "Descartes : maître et possesseur de la nature", contenu: "La science et la technique permettent à l'homme de se rendre 'maître et possesseur de la nature'. Vision anthropocentrique et utilitariste qui fonde l'exploitation de la nature." },
      { titre: "La crise écologique", contenu: "Hans Jonas : nous avons des devoirs envers les générations futures et envers la nature. Principe responsabilité : 'Agis de façon que les effets de ton action soient compatibles avec la permanence d'une vie humaine authentique.'" },
      { titre: "Culture et humanité", contenu: "Lévi-Strauss : la prohibition de l'inceste est le premier fait culturel. Elle marque le passage de la nature à la culture. L'homme est fondamentalement un être culturel." },
    ],
    citations: [
      { auteur: "Descartes", texte: "Nous rendre comme maîtres et possesseurs de la nature.", source: "Discours de la méthode" },
      { auteur: "Rousseau", texte: "Tout est bien sortant des mains de l'Auteur des choses, tout dégénère entre les mains de l'homme.", source: "Émile" },
      { auteur: "Jonas", texte: "Agis de façon que les effets de ton action soient compatibles avec la permanence d'une vie humaine authentique.", source: "Le Principe responsabilité" },
      { auteur: "Aristote", texte: "L'homme est un animal politique.", source: "Politique" },
      { auteur: "Hegel", texte: "L'esprit est la négation de la nature.", source: "Encyclopédie des sciences philosophiques" },
    ],
    auteurs: ["Rousseau", "Descartes", "Jonas", "Aristote", "Lévi-Strauss", "Hobbes"],
  },
];

const METHODES = {
  dissertation: {
    titre: "La Dissertation",
    emoji: "✍️",
    intro: "La dissertation philosophique consiste à répondre à une question en construisant une argumentation rigoureuse, nuancée et progressive.",
    etapes: [
      {
        num: "1",
        titre: "Analyser le sujet",
        contenu: [
          "Identifier les notions clés et les définir",
          "Reformuler le sujet (de quoi parle-t-il vraiment ?)",
          "Repérer les présupposés implicites de la question",
          "Chercher les tensions, paradoxes, ambiguïtés",
          "Se demander : POURQUOI cette question se pose-t-elle ?",
        ],
      },
      {
        num: "2",
        titre: "Construire la problématique",
        contenu: [
          "La problématique n'est pas la question du sujet reformulée",
          "Elle doit montrer POURQUOI la question est difficile, pourquoi on ne peut pas y répondre directement",
          "Elle met en tension deux positions opposées légitimes",
          "Elle oriente le plan de la dissertation",
          "Elle doit être explicitement formulée dans l'introduction",
        ],
      },
      {
        num: "3",
        titre: "Élaborer le plan",
        contenu: [
          "PLAN EN 3 PARTIES (le plus courant)",
          "Thèse → Antithèse → Synthèse (dépassement, pas compromis)",
          "Chaque partie : 2-3 sous-parties avec argument + exemple + citation",
          "Chaque partie répond à la problématique d'un point de vue",
          "Transitions obligatoires entre chaque partie",
        ],
      },
      {
        num: "4",
        titre: "Rédiger l'introduction",
        contenu: [
          "ACCROCHE : partir d'un fait, d'une citation, d'une situation concrète",
          "ANALYSE DU SUJET : définir les termes clés",
          "PROBLÉMATIQUE : formuler explicitement la tension",
          "ANNONCE DU PLAN : présenter les 3 parties",
          "L'introduction ne doit pas dépasser 15-20 lignes",
        ],
      },
      {
        num: "5",
        titre: "Rédiger le développement",
        contenu: [
          "Chaque paragraphe = 1 idée + 1 argument + 1 exemple + 1 référence",
          "Utiliser des connecteurs logiques : 'en effet', 'cependant', 'ainsi'",
          "Les références philosophiques doivent être expliquées, pas juste citées",
          "Transitions entre parties : bilan + limite + nouvelle question",
          "Ne jamais donner son avis à la première personne",
        ],
      },
      {
        num: "6",
        titre: "Rédiger la conclusion",
        contenu: [
          "BILAN : récapituler le cheminement (pas les arguments)",
          "RÉPONSE : donner clairement une réponse à la question",
          "OUVERTURE : élargir sur une question connexe (pas obligatoire mais valorisé)",
          "Pas de nouvelle idée dans la conclusion",
          "La conclusion doit montrer qu'on a progressé depuis l'introduction",
        ],
      },
    ],
    piegesToEviter: [
      "Répondre par oui/non dès le début sans problématiser",
      "Faire un plan par auteurs ('Platon dit… Kant dit…')",
      "Illustrer sans argumenter (l'exemple n'est pas la preuve)",
      "Sortir du sujet en parlant d'une notion vaguement liée",
      "Oublier la conclusion ou la bâcler",
      "Utiliser le 'je' ou les expressions familières",
      "Paraphraser le cours sans réflexion personnelle",
    ],
  },
  commentaire: {
    titre: "Le Commentaire de Texte",
    emoji: "📖",
    intro: "Le commentaire de texte philosophique consiste à dégager le sens et la portée d'un extrait de philosophe, en montrant la cohérence de son argumentation et en l'éclairant par des connaissances extérieures.",
    etapes: [
      {
        num: "1",
        titre: "Première lecture",
        contenu: [
          "Lire le texte 2-3 fois sans annoter",
          "Identifier l'auteur et replacer dans son contexte",
          "Trouver la thèse principale (ce que défend l'auteur)",
          "Repérer le problème auquel le texte répond",
          "Identifier les notions clés du texte",
        ],
      },
      {
        num: "2",
        titre: "Analyser la structure",
        contenu: [
          "Découper le texte en parties logiques (souvent 2-3)",
          "Pour chaque partie : quelle idée est développée ?",
          "Repérer les connecteurs logiques (or, donc, ainsi, mais…)",
          "Identifier le type de raisonnement (inductif, déductif, dialectique)",
          "Repérer les exemples, métaphores, analogies utilisées",
        ],
      },
      {
        num: "3",
        titre: "Construire l'introduction",
        contenu: [
          "PRÉSENTATION : auteur, œuvre, thème général",
          "PROBLÈME : quel problème le texte soulève-t-il ?",
          "THÈSE : quelle réponse l'auteur propose-t-il ?",
          "PLAN : comment le texte progresse-t-il ?",
          "PAS de paraphrase, PAS de 'Dans ce texte, l'auteur dit que…'",
        ],
      },
      {
        num: "4",
        titre: "Rédiger le commentaire",
        contenu: [
          "Suivre l'ordre du texte (structure linéaire ou thématique)",
          "Expliquer chaque idée en détail : QUE veut dire l'auteur ?",
          "Montrer POURQUOI l'auteur dit cela (sa logique, ses présupposés)",
          "Mettre en relation avec d'autres philosophes (accord, désaccord)",
          "Évaluer la portée et les limites de la thèse",
        ],
      },
      {
        num: "5",
        titre: "Règles fondamentales",
        contenu: [
          "NE PAS paraphraser : reformuler ne suffit pas, il faut expliquer",
          "NE PAS plaquer son cours : tout doit être au service du texte",
          "Citer le texte entre guillemets pour appuyer son analyse",
          "Montrer la progression logique : chaque partie prépare la suivante",
          "La conclusion doit évaluer la thèse et ouvrir une question",
        ],
      },
    ],
    piegesToEviter: [
      "La paraphrase (raconter le texte avec ses mots)",
      "Ignorer une partie du texte",
      "Faire une dissertation sur le thème au lieu de commenter LE texte",
      "Critiquer l'auteur sans arguments solides",
      "Oublier de citer le texte",
      "Inventer la thèse de l'auteur",
      "Plan hors-texte (ne pas suivre la logique interne)",
    ],
  },
};

const AUTEURS_CLES = [
  { nom: "Platon", periode: "Antiquité (~428-348 av. J.-C.)", apport: "Théorie des Idées, dualisme âme/corps, mythe de la caverne, politique idéale (République), amour (Banquet)", oeuvres: ["La République", "Le Banquet", "Phédon", "Ménon"] },
  { nom: "Aristote", periode: "Antiquité (384-322 av. J.-C.)", apport: "Logique, bonheur (eudémonie), vertu, politique (animal politique), catharsis artistique", oeuvres: ["Éthique à Nicomaque", "Politique", "Poétique", "Métaphysique"] },
  { nom: "Descartes", periode: "Moderne (1596-1650)", apport: "Cogito, doute méthodique, dualisme âme/corps, mécanisme, rationalisme", oeuvres: ["Discours de la méthode", "Méditations métaphysiques"] },
  { nom: "Spinoza", periode: "Moderne (1632-1677)", apport: "Panthéisme, déterminisme, liberté vraie (connaissance des causes), critique des superstitions", oeuvres: ["Éthique", "Traité théologico-politique"] },
  { nom: "Locke", periode: "Moderne (1632-1704)", apport: "Empirisme, droits naturels, libéralisme politique, tolérancee", oeuvres: ["Essai sur l'entendement humain", "Traité du gouvernement civil"] },
  { nom: "Hume", periode: "Moderne (1711-1776)", apport: "Empirisme radical, scepticisme, causalité (habitude), rôle des passions dans la morale", oeuvres: ["Traité de la nature humaine", "Enquête sur l'entendement humain"] },
  { nom: "Rousseau", periode: "Moderne (1712-1778)", apport: "Contrat social, volonté générale, critique de la civilisation, éducation naturelle", oeuvres: ["Du contrat social", "Émile", "Discours sur l'inégalité"] },
  { nom: "Kant", periode: "Moderne (1724-1804)", apport: "Impératif catégorique, critique de la raison, autonomie morale, beau sans concept", oeuvres: ["Critique de la raison pure", "Critique de la raison pratique", "Critique de la faculté de juger"] },
  { nom: "Hegel", periode: "XIXe (1770-1831)", apport: "Dialectique, histoire de l'Esprit, maître-esclave, reconnaissance, idéalisme absolu", oeuvres: ["Phénoménologie de l'esprit", "Principes de la philosophie du droit"] },
  { nom: "Marx", periode: "XIXe (1818-1883)", apport: "Matérialisme historique, aliénation, lutte des classes, critique du capitalisme", oeuvres: ["Le Capital", "Manuscrits de 1844", "Manifeste du parti communiste"] },
  { nom: "Nietzsche", periode: "XIXe (1844-1900)", apport: "Mort de Dieu, volonté de puissance, éternel retour, critique de la morale des esclaves", oeuvres: ["Ainsi parlait Zarathoustra", "Par-delà bien et mal", "Le Gai Savoir"] },
  { nom: "Freud", periode: "XIXe-XXe (1856-1939)", apport: "Inconscient, refoulement, Ça/Moi/Surmoi, rêve, sexualité", oeuvres: ["L'interprétation des rêves", "Malaise dans la civilisation"] },
  { nom: "Sartre", periode: "XXe (1905-1980)", apport: "Existentialisme, liberté radicale, mauvaise foi, regard d'autrui, engagement", oeuvres: ["L'Être et le Néant", "L'existentialisme est un humanisme"] },
  { nom: "Simone de Beauvoir", periode: "XXe (1908-1986)", apport: "Féminisme existentialiste, 'on ne naît pas femme on le devient', liberté et situation", oeuvres: ["Le Deuxième Sexe"] },
  { nom: "Levinas", periode: "XXe (1906-1995)", apport: "Éthique comme philosophie première, visage d'autrui, responsabilité infinie", oeuvres: ["Totalité et infini", "Autrement qu'être"] },
];

export default function App() {
  const [vue, setVue] = useState("accueil");
  const [notionActive, setNotionActive] = useState(null);
  const [methodeActive, setMethodeActive] = useState(null);
  const [onglet, setOnglet] = useState("idees");

  const ouvrirNotion = (notion) => { setNotionActive(notion); setVue("notion"); setOnglet("idees"); };
  const ouvrirMethode = (m) => { setMethodeActive(m); setVue("methode"); };
  const retour = () => { setVue("accueil"); setNotionActive(null); setMethodeActive(null); };

  return (
    <div style={{ fontFamily: "'Georgia', serif", minHeight: "100vh", background: "#0f0f13", color: "#e8e6e1" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Sans+3:wght@300;400;600&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1a1a24; }
        ::-webkit-scrollbar-thumb { background: #444; border-radius: 3px; }
        .card-notion { transition: transform 0.2s, box-shadow 0.2s; cursor: pointer; }
        .card-notion:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.5); }
        .onglet-btn { transition: all 0.2s; }
        .onglet-btn:hover { opacity: 0.85; }
        .citation-card { border-left: 3px solid; padding: 12px 16px; margin: 8px 0; background: rgba(255,255,255,0.04); border-radius: 0 8px 8px 0; }
        .etape-card { border-radius: 12px; padding: 16px; margin: 10px 0; background: rgba(255,255,255,0.05); }
        .piege-item { display: flex; gap: 8px; align-items: flex-start; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .auteur-card { background: rgba(255,255,255,0.04); border-radius: 12px; padding: 14px; border: 1px solid rgba(255,255,255,0.08); transition: all 0.2s; }
        .auteur-card:hover { background: rgba(255,255,255,0.08); }
        .back-btn { cursor: pointer; display: inline-flex; align-items: center; gap: 6px; opacity: 0.7; transition: opacity 0.2s; }
        .back-btn:hover { opacity: 1; }
      `}</style>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #1a0a2e 0%, #0d1b2a 100%)", padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {vue !== "accueil" && (
            <div className="back-btn" onClick={retour} style={{ marginBottom: 12, fontSize: 14, color: "#a0aec0" }}>
              ← Retour à l'accueil
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
            {/* Méthodes */}
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#f0e6c8", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8, marginBottom: 14 }}>
                📝 Méthodes d'Examen
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {Object.entries(METHODES).map(([key, m]) => (
                  <div key={key} className="card-notion" onClick={() => ouvrirMethode(key)}
                    style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: 18 }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{m.emoji}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: "#f0e6c8" }}>{m.titre}</div>
                    <div style={{ fontSize: 12, color: "#8892a4", marginTop: 4 }}>Méthode complète + pièges à éviter</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notions */}
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#f0e6c8", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8, marginBottom: 14 }}>
                🧩 Les Notions du Programme
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {NOTIONS.map((n) => (
                  <div key={n.id} className="card-notion" onClick={() => ouvrirNotion(n)}
                    style={{ background: `linear-gradient(135deg, ${n.couleur}22, ${n.couleur}08)`, border: `1px solid ${n.couleur}44`, borderRadius: 12, padding: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 22 }}>{n.emoji}</span>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: "#f0e6c8" }}>{n.titre}</span>
                    </div>
                    <div style={{ fontSize: 11, color: "#8892a4", marginTop: 6 }}>
                      {n.idees.length} idées · {n.citations.length} citations · {n.auteurs.length} auteurs
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Auteurs clés */}
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#f0e6c8", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8, marginBottom: 14 }}>
                🎓 Auteurs Clés
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {AUTEURS_CLES.map((a) => (
                  <div key={a.nom} className="auteur-card">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 4 }}>
                      <div>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, color: "#d4a8ff" }}>{a.nom}</span>
                        <span style={{ fontSize: 12, color: "#6b7280", marginLeft: 8 }}>{a.periode}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: "#c4c4c4", margin: "6px 0 4px", lineHeight: 1.5, fontFamily: "'Source Sans 3', sans-serif" }}>{a.apport}</p>
                    <div style={{ fontSize: 11, color: "#6b7280" }}>📖 {a.oeuvres.join(" · ")}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* FICHE NOTION */}
        {vue === "notion" && notionActive && (
          <>
            <div style={{ background: `linear-gradient(135deg, ${notionActive.couleur}33, ${notionActive.couleur}11)`, border: `1px solid ${notionActive.couleur}55`, borderRadius: 16, padding: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>{notionActive.emoji}</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: "#f0e6c8", margin: "0 0 10px" }}>{notionActive.titre}</h2>
              <p style={{ fontSize: 14, color: "#c4c4c4", lineHeight: 1.6, margin: 0, fontFamily: "'Source Sans 3', sans-serif" }}>{notionActive.definition}</p>
            </div>

            {/* Onglets */}
            <div style={{ display: "flex", gap: 8, marginBottom: 18, overflowX: "auto" }}>
              {[
                { key: "idees", label: "💡 Idées" },
                { key: "distinctions", label: "⚖️ Distinctions" },
                { key: "citations", label: "💬 Citations" },
                { key: "auteurs", label: "🎓 Auteurs" },
              ].map((o) => (
                <button key={o.key} className="onglet-btn" onClick={() => setOnglet(o.key)}
                  style={{ padding: "8px 14px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",
                    background: onglet === o.key ? notionActive.couleur : "rgba(255,255,255,0.08)",
                    color: onglet === o.key ? "#fff" : "#a0aec0" }}>
                  {o.label}
                </button>
              ))}
            </div>

            {onglet === "idees" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {notionActive.idees.map((idee, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: 16 }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: "#f0e6c8", marginBottom: 6 }}>
                      <span style={{ color: notionActive.couleur, marginRight: 8 }}>▶</span>{idee.titre}
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
                <p style={{ fontSize: 13, color: "#8892a4", margin: "0 0 12px", fontFamily: "'Source Sans 3', sans-serif" }}>Auteurs à connaître pour cette notion :</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {notionActive.auteurs.map((a, i) => (
                    <span key={i} style={{ background: `${notionActive.couleur}33`, border: `1px solid ${notionActive.couleur}66`, borderRadius: 20, padding: "6px 14px", fontSize: 13, color: "#f0e6c8", fontFamily: "'Source Sans 3', sans-serif" }}>
                      {a}
                    </span>
                  ))}
                </div>
                <div style={{ marginTop: 16, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 14 }}>
                  {AUTEURS_CLES.filter(a => notionActive.auteurs.includes(a.nom)).map((a) => (
                    <div key={a.nom} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#d4a8ff", fontSize: 14 }}>{a.nom} <span style={{ fontWeight: 400, color: "#6b7280", fontSize: 12 }}>{a.periode}</span></div>
                      <p style={{ fontSize: 13, color: "#b0b0b0", margin: "4px 0 0", fontFamily: "'Source Sans 3', sans-serif" }}>{a.apport}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* METHODE */}
        {vue === "methode" && methodeActive && (() => {
          const m = METHODES[methodeActive];
          return (
            <>
              <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 16, padding: 20, marginBottom: 20 }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>{m.emoji}</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: "#f0e6c8", margin: "0 0 10px" }}>{m.titre}</h2>
                <p style={{ fontSize: 14, color: "#c4c4c4", lineHeight: 1.6, margin: 0, fontFamily: "'Source Sans 3', sans-serif" }}>{m.intro}</p>
              </div>

              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#d4a8ff", marginBottom: 12 }}>Les étapes</h3>
              {m.etapes.map((e) => (
                <div key={e.num} className="etape-card">
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #7C3AED, #1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{e.num}</div>
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
                    <span style={{ color: "#f87171", fontSize: 14, flexShrink: 0 }}>✕</span>
                    <span style={{ fontSize: 13.5, color: "#c4c4c4", fontFamily: "'Source Sans 3', sans-serif" }}>{p}</span>
                  </div>
                ))}
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
}
