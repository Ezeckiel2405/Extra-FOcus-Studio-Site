# Extra Focus Studio — Site web

Site vitrine statique d'Extra Focus Studio, réalisé avec HTML, CSS et JavaScript sans framework ni étape de compilation.

Ce document décrit les fichiers réellement présents dans le projet. Les pages éditoriales et légales récemment ajoutées sont des bases à compléter : leur présence ne signifie pas qu'un service, une équipe, une offre ou un document juridique est déjà validé.

## Démarrer le site

Ouvrir `index.html` dans un navigateur. Pour travailler localement, utiliser l'extension Live Server de Visual Studio Code ou tout serveur statique local.

Le projet n'a pas de `package.json`, de dépendances à installer, de backend ni d'étape `build`.

## Structure du projet

```text
Extra_Focus_studio/
├── index.html
├── Read_ME.md
├── pages/
│   ├── studio.html
│   ├── direction-artistique.html
│   ├── realisations.html
│   ├── projets.html
│   ├── activites.html
│   ├── equipe.html
│   ├── actualites.html
│   ├── coulisses.html
│   ├── partenaires.html
│   ├── collaborer.html
│   ├── rejoindre.html
│   ├── presse.html
│   ├── faq.html
│   └── contact.html
├── legal/
│   ├── mentions-legales.html
│   ├── confidentialite.html
│   └── cookies.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   └── script.js
├── assets/
│   ├── Alpha.jpg
│   ├── Homme.jpg
│   ├── Voiture.jpg
│   ├── Voiture2.jpg
│   ├── ciel.jpg
│   ├── logo1.jpg
│   ├── moto.jpg
│   └── moto wheel.jpg
└── docs/
    └── guide-contenus.md
```

## Pages

| Page | Fichier | Contenu |
| --- | --- | --- |
| Accueil | `index.html` | Présentation du studio, aperçu de la direction artistique, sélection de photos, projets et contact. |
| Le studio | `pages/studio.html` | Origine, philosophie, vision, valeurs, méthode de travail et ambitions. |
| Direction artistique | `pages/direction-artistique.html` | Identité visuelle, photographie, cinéma et principes artistiques. |
| Réalisations | `pages/realisations.html` | Sélection de photographies et présentation de l'approche du studio. |
| Projets | `pages/projets.html` | Projet de court-métrage *Alpha*, intention et axes de développement. |
| Activités | `pages/activites.html` | Base de présentation des domaines créatifs du studio. |
| Équipe | `pages/equipe.html` | Base pour présenter les membres et collaborateurs. |
| Actualités | `pages/actualites.html` | Emplacement prévu pour les annonces et nouvelles de production. |
| Coulisses | `pages/coulisses.html` | Emplacement prévu pour les contenus de fabrication et de tournage. |
| Partenaires | `pages/partenaires.html` | Base pour les partenaires et leurs projets associés. |
| Collaborer | `pages/collaborer.html` | Informations et accès au contact pour proposer une collaboration. |
| Rejoindre le studio | `pages/rejoindre.html` | Base pour les profils intéressés et les candidatures spontanées. Ce n'est pas une offre d'emploi. |
| Presse & médias | `pages/presse.html` | Emplacement pour les informations officielles et ressources presse validées. |
| FAQ | `pages/faq.html` | Réponses aux questions courantes sur le studio et ses demandes de contact. |
| Contact | `pages/contact.html` | Coordonnées, types de demandes et formulaire de préparation d'un email. |
| Mentions légales | `legal/mentions-legales.html` | Modèle à compléter avec l'identité juridique et l'hébergeur réels. |
| Confidentialité | `legal/confidentialite.html` | Base à valider en fonction des traitements et services effectivement utilisés. |
| Cookies | `legal/cookies.html` | Base à vérifier selon la configuration réelle du site publié. |

Les cinq pages principales sont accessibles directement dans la navigation. Le bouton « Autres » ouvre les douze autres rubriques et pages légales, sur ordinateur comme dans le menu à trois barres sur téléphone et tablette. Toutes les pages restent également accessibles dans le répertoire « Explorer » du pied de page.

Les rubriques sans contenu fourni comportent des textes d'attente et indiquent ce qui doit être renseigné. Vérifier les informations et autorisations avant toute publication publique.

## Styles et affichage responsive

- `css/style.css` regroupe les styles partagés, la typographie, la navigation, les boutons, les formulaires, les cartes et les pieds de page.
- `css/responsive.css` regroupe les adaptations tablette, téléphone, petits écrans et mouvement réduit.
- Le menu compact est affiché jusqu'à 900 px. Son bouton met à jour `aria-expanded`; il s'ouvre au clic et se ferme lors du choix d'un lien, d'un clic extérieur, avec Échap, ou lors du retour à une largeur d'ordinateur.
- Les boutons, champs et liens restent utilisables au clavier et indiquent leur focus.

## JavaScript et contact

`js/script.js` est utilisé sur toutes les pages :

1. Il active et contrôle le menu compact lorsque les éléments de navigation sont présents.
2. Sur la page Contact, il lit `?type=...` pour présélectionner une catégorie existante, valide les champs HTML et prépare un message pour la messagerie de la personne.

Le formulaire utilise `mailto:`. Le navigateur ouvre l'application de messagerie avec les informations saisies ; le site **n'envoie ni ne confirme** le message. La personne doit vérifier puis envoyer l'email depuis sa messagerie. Si aucune messagerie n'est configurée, utiliser l'adresse affichée sur la page. Les demandes de rendez-vous ou de réservation ne sont pas confirmées automatiquement.

Les liens internes des pages éditoriales transmettent leur catégorie au formulaire, par exemple `contact.html?type=Collaboration`.

Pour traiter les formulaires sur le serveur ou par un fournisseur externe, il faudra choisir et configurer ce service, adapter la politique de confidentialité et tester la livraison avant d'annoncer un envoi direct.

## Images

Les fichiers image disponibles se trouvent actuellement dans `assets/`. Respecter la casse exacte de leurs noms, notamment `Alpha.jpg` et `Voiture.jpg`, afin que les liens fonctionnent également sur les hébergements sensibles à la casse.

Avant d'ajouter une image au site :

1. Confirmer les droits d'utilisation et le texte alternatif.
2. Placer le fichier à l'emplacement indiqué par la page et vérifier son nom exact.
3. Préparer une taille raisonnable et tester le recadrage sur petit écran.
4. Ne pas inventer de portraits, d'images de projets ou de partenaires.

## Pages juridiques et informations à confirmer

Les pages `legal/` sont des **modèles de travail**, pas des avis juridiques ni des documents prêts à publier. Compléter et faire valider les informations nécessaires, notamment l'éditeur, le responsable de publication, le statut, l'adresse, les coordonnées de l'hébergeur, les finalités et durées de conservation des données et les services tiers. Ne pas publier de renseignements administratifs inventés.

## Évolutions possibles

Les rubriques de l'ancien document de cadrage qui ne figurent pas encore dans la structure réelle restent à décider et ne sont pas implicitement implémentées : fiches détaillées pour chaque projet, filtres de portfolio, dépôt de documents, actualisation via un CMS, comptes, paiement, prise de rendez-vous automatisée et panneau d'administration. Un backend, une base de données ou Odoo nécessiteraient un projet technique séparé.

## Vérifications avant publication

- Ouvrir les pages depuis l'accueil et tester tous les liens du pied de page.
- Tester le menu sur téléphone, tablette et ordinateur, ainsi qu'au clavier.
- Vérifier les images et leur texte alternatif.
- Tester le formulaire avec une application de messagerie configurée, sans envoyer de données réelles non nécessaires.
- Finaliser et faire valider les documents juridiques.
- Tester l'affichage, les performances, l'accessibilité et les métadonnées sur l'hébergement choisi.
