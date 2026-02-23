# Labo Web API - Gestion de tournois d’échecs
## Objectifs :
Création d’une application Web pour la gestion de tournois d’échecs.
#### Mise en situation :
Monsieur Checkmate souhaiterait créer une application pour la gestion de tournois de son club d’échecs. Il voudrait, entre autres, pouvoir créer des tournois et des comptes pour les joueurs de son club. Les joueurs pourraient alors s’inscrire aux différents tournois qui seront organisés. Il aimerait aussi que certaines actions soient automatisées (Envoi d’email, création des rencontres, ...).

## Fonctionnalités :

### 1. Inscrire un joueur (Monsieur Checkmate) :
#### Un membre possède :
- Un pseudo
- Un email
- Un mot de passe
- Une date de naissance
- Un genre (garçon, fille, autre)
- Un ELO (classement aux échecs entre 0 - 3000)
- Un rôle (pour différencier Monsieur Checkmate des autres utilisateurs)
#### Règles métiers :
- Le pseudo et l’email devront être unique.
- Les mots de passe devront être hachés dans la db (l’ajout d’un sel est conseillé).
- Si un joueur n’a pas de classement (ELO), il commencera toujours à 1200.
#### Bonus :
- Le mot de passe sera généré aléatoirement.
- Lorsque Monsieur Checkmate enregistre un nouveau membre, un email est envoyé au membre avec son mot de passe pour le prévenir.

### 2. Créer un tournoi (Monsieur Checkmate) :
#### Un tournoi possède :
- Un nom
- Un lieu (nullable)
- Un nombre minimum de joueurs (2-32)
- Un nombre maximum de joueurs (2-32)
- Un ELO minimum (0-3000, nullable)
- Un ELO maximum (0-3000, nullable)
- Un ou plusieurs catégories (junior, senior, veteran)
- Un statut (en attente de joueurs, en cours, terminé)
- Un numéro correspondant à la ronde courante
- Un booléen (WomenOnly) qui détermine si le tournoi n’est autorisé qu’aux filles
- Une date de fin des inscriptions
- Une date de création
- Une date de mise à jour
#### Règles métiers :
- Le nombre minimum de joueurs doit être plus petit ou égal au nombre maximum (pareil pour l’ELO)
- La date de fin des inscriptions devra être supérieure à la date du jour + nombre minimum de joueurs (ex : Si le tournoi est créé le 10/10/2022 et que le nombre min de joueurs est 8 alors la date de fin des inscriptions devra être supérieure au) 18/10/2022.
- La ronde courante est 0
- Un tournoi que vient d’être créé aura le statut « en attente de joueurs »
- La date de création et de mise à jour correspond à la date du jour
#### Bonus :
- A la création d’un tournoi un email est envoyé à tous les joueurs qui respectent les contraintes du tournoi (v. inscriptions) pour les prévenir (prévoir template Thymeleaf).

### 3. Supprimer un tournoi (Monsieur Checkmate) :
#### Règles métiers :
- Seuls les tournois qui n’ont pas commencé peuvent être supprimés
#### Bonus :
- Prévenir par mail tous les joueurs inscrits que le tournoi a été supprimé

### 4. Afficher les différents tournois (tout le monde) :
#### Afficher les 10 derniers tournois non clôturés par ordre décroissant sur la date de mise à jour
Ils présenteront :
- L’identifiant
- Le nom
- Le lieu
- Le nombre de joueurs inscrits
- Le nombre min
- Le nombre max
- Les catégories
- L’ELO minimum
- L’ELO maximum
- Le statut
- La date de fin des inscriptions
- La ronde courante
#### Bonus :
- Un filtre de recherche (nom, statut, page, catégories, ...) peut être ajouté pour rechercher les différents tournois
- canRegister (détermine si un joueur peut s’inscrire ou non) (v. inscriptions)
- isRegistered (détermine si un joueur est déjà inscrit ou non)
  
### 5. Afficher les détails d’un tournoi (tout le monde) :
#### Présenter les mêmes infos que pour tous les tournois
- Y inclure les joueurs inscrits
#### Bonus :
- Afficher aussi les rencontres de la ronde courante
  
### 6. Se connecter (tout le monde) :
#### Règles métiers :
- On peu se connecter avec son pseudo ou son email
  
### 7. S’inscrire à un tournoi (tous les utilisateurs connectés) : ​ ​
#### Règles métier
On peut s’inscrire si :
- Le tournoi n’a pas encore commencé.
- La date de fin des inscriptions n’est pas dépassée
- Le joueur n’est pas déjà inscrit
- Le tournoi n’a pas atteint le nombre maximum de participants
- L’âge du joueur l’y autorise  
  *Son âge est calculé par rapport à la date de fin des inscriptions (c-à-d l’âge qu’il aura à la fin des inscriptions)*  
  Selon son âge, il fera partie d’une certaine catégorie :
  - Junior (< 18)
  - Senior (>=18 et < 60)
  - Vétéran (>= 60)
- Si son ELO, l’y autorise
  - L’ELO du joueur doit <= à l’ELO max (si renseigné)
  - L’ELO du joueur doit >= à l’ELO min (si renseigné)
- Si son genre l’y autorise  
  *Seuls les joueurs (fille et autre) peuvent s’inscrire à ​un tournoi « WomenOnly »*
  
### 8. Se désinscrire d’un tournoi (tous les utilisateurs connectés) :
#### Règles métier
On peut se désinscrire si :
- Le tournoi n’a pas encore commencé
- Le joueur est inscrit

### 9.​Démarrer un tournoi (Monsieur Checkmate) :
#### Règles métier
Un tournoi ne peut démarrer que :
- Si le nombre minimum de participants est atteint
- Si la date de fin des inscriptions est dépassée
La ronde courante du tournoi passe à 1
La date de mise à jour du tournoi est modifiée
Lorsqu’un tournoi démarre, toutes les rencontres sont générées
Tous les joueurs se rencontrent 2 fois (Round Robin – Aller-Retour)
Une rencontre possède :
- Un id
- Un id de tournoi (pour lequel la rencontre a été jouée)
- Un id du joueur blanc
- Un id du joueur noir
- Un numéro de ronde
- Un résultat (pas encore joué, blanc, noir, égalité)
  
### 10.​Modifier le résultat d’une rencontre (Monsieur Checkmate) :
#### Règles métier
On ne peut modifier le résultat d’une rencontre que si elle fait partie de la ronde Courante

### 11.​Passer au tour suivant (Monsieur Checkmate) :
#### Règles métier
- On ne peut passer la ronde suivante que si toutes les rencontres de la ronde courante ont été jouées
- On incrémente la ronde courante du tournoi

### 12.​Voir le tableau des scores pour un tournoi et une ronde donnée (tout le monde) :
#### Afficher un tableau qui contiendra les joueurs du tournoi (trié par ordre décroissant sur le score)
#### Afficher
  - Le nom
  - Le nombres de rencontres jouées
  - Le nombre de victoires
  - Le nombre de défaites
  - Le nombre d’égalité
  - Le score (1pt victoire, 0.5pt égalité)
