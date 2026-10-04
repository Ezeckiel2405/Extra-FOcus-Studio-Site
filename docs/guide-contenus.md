# Guide de mise à jour du contenu

Ce guide aide à compléter les pages du site sans présenter comme réelles des informations encore à confirmer.

## Ajouter ou corriger une page

1. Modifier la page HTML correspondante dans `pages/` ou `legal/`.
2. Garder les mêmes liens vers `../css/style.css`, `../css/responsive.css` et `../js/script.js` pour les pages situées sous un sous-dossier.
3. Pour une nouvelle page éditoriale, reprendre l'en-tête, le bouton `nav-toggle`, le menu « Autres », le pied de page et les liens d'une page existante de `pages/`.
4. Ajouter le lien au menu « Autres » et à la liste « Explorer » du pied de page des pages concernées, puis vérifier son chemin relatif depuis `index.html`, `pages/` et `legal/`.
5. Tester le rendu desktop et mobile ainsi que la navigation clavier.

Les pages sont des fichiers HTML statiques distincts : il n'y a pas encore de système de modèles qui synchronise automatiquement l'en-tête et le pied de page.

## Contenus éditoriaux

- Remplacer les messages « à venir » uniquement après validation des contenus.
- Confirmer les noms, biographies, fonctions, annonces, prestations et partenariats avant publication.
- Vérifier les autorisations relatives aux photographies, logos, portraits, musiques, vidéos et citations.
- Ne pas présenter une page de candidature comme une offre d'emploi.
- Ne pas présenter une demande de contact, rendez-vous ou réservation comme confirmée.

## Formulaire

La page `pages/contact.html` utilise actuellement le schéma `mailto:` dans `js/script.js`. Après validation HTML, il prépare les champs dans un email ; la personne doit l'envoyer depuis son application de messagerie. Ce comportement ne constitue pas un envoi serveur ni un stockage des demandes.

Les catégories présentes dans la liste de contact servent également aux liens `?type=...`. Lors de l'ajout d'une catégorie :

1. Ajouter une option au champ `name="type"` dans `pages/contact.html`.
2. Utiliser sa valeur exacte dans le paramètre URL des boutons ou liens.
3. Vérifier le préremplissage et le contenu de l'email.
4. Si le formulaire est connecté ultérieurement à un service tiers, documenter ce traitement et mettre à jour la page Confidentialité avant publication.

## Documents légaux

`legal/mentions-legales.html`, `legal/confidentialite.html` et `legal/cookies.html` sont à compléter et à valider pour l'organisation et l'hébergement réels. Ils ne remplacent pas une validation juridique.

## Médias

Les images existantes se trouvent à la racine de `assets/`. Respecter la casse et l'extension du nom réel du fichier, rédiger un texte alternatif descriptif, puis vérifier l'affichage sur téléphone et ordinateur.
