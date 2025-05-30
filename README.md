# eklesia-backend

### npm install

### npx prisma generate

### npx prisma db push

### npm run start:dev

# Documentation des Routes API

**Base-url: http//:localhost:5000/api**

## Routes d'Authentification (`/auth`)

### POST `/auth/google`

**Description**: Création d'un nouveau compte utilisateur via google

### POST `/auth/sign`

**Description**: Création d'un nouveau compte utilisateur
**Body**:

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

### POST `/auth/login`

**Description**: Connexion d'un utilisateur
**Body**:

```json
{
  "email": "string",
  "password": "string"
}
```

### POST `/auth/logout`

**Description**: Déconnexion
**cookies**:

```json
{
  "accessToken": "string",
  "refreshToken": "string"
}
```

## Routes des Lectures Bibliques (`/bible-readings`)

### GET `/bible-readings`

**Description**: Récupère toutes les lectures bibliques
**Réponse**:

```json
[
  {
    "id": "number",
    "date": "string (ISO date)",
    "theme": "string",
    "description": "string",
    "language": "string",
    "texts": [
      {
        "id": "number",
        "reference": "string",
        "content": "string",
        "language": "string"
      }
    ]
  }
]
```

### GET `/bible-readings/:id`

**Description**: Récupère une lecture biblique spécifique
**Paramètres**:

- `id`: number (dans l'URL)
  **Réponse**:

```json
{
  "id": "number",
  "date": "string (ISO date)",
  "theme": "string",
  "description": "string",
  "language": "string",
  "texts": [ (peut être null ou vide)
    {
      "id": "number",
      "reference": "string",
      "content": "string",
      "language": "string"
    }
  ]
}
```

**Codes de réponse**:

- 200: Lecture trouvée
- 404: Lecture non trouvée
- 500: Erreur serveur

### GET `/bible-readings/date/:date`

**Description**: Récupère les lectures bibliques pour une date spécifique
**Paramètres**:

- `date`: string (format: YYYY-MM-DD)
  **Réponse**: Même format que GET `/:id`
  **Codes de réponse**:
- 200: Lecture trouvée
- 404: Aucune lecture trouvée pour cette date
- 500: Erreur serveur

### GET `/bible-readings/month/:month`

**Description**: Récupère les lectures bibliques pour un mois spécifique
**Paramètres**:

- `month`: number (1-12)
  **Réponse**: Tableau de lectures (même format que GET `/`)
  **Codes de réponse**:
- 200: Lectures trouvées
- 500: Erreur serveur

### GET `/bible-readings/year/:year`

**Description**: Récupère les lectures bibliques pour une année spécifique
**Paramètres**:

- `year`: number
  **Réponse**: Tableau de lectures (même format que GET `/`)
  **Codes de réponse**:
- 200: Lectures trouvées
- 500: Erreur serveur

### GET `/bible-readings/theme/:theme`

**Description**: Récupère les lectures bibliques par thème
**Paramètres**:

- `theme`: string
  **Réponse**: Tableau de lectures (même format que GET `/`)
  **Codes de réponse**:
- 200: Lectures trouvées
- 500: Erreur serveur

### GET `/bible-readings/language/:language`

**Description**: Récupère les lectures bibliques par langue
**Paramètres**:

- `language`: string
  **Réponse**: Tableau de lectures (même format que GET `/`)
  **Codes de réponse**:
- 200: Lectures trouvées
- 500: Erreur serveur

### POST `/bible-readings`

**Description**: Crée une nouvelle lecture biblique
**Body**:

```json
{
  "date": "string (ISO date)",
  "theme": "string",
  "description": "string",
  "language": "string",
  "texts": [
    {
      "reference": "string",
      "content": "string",
      "language": "string"
    }
  ]
}
```

**Réponse**: Lecture créée (même format que GET `/:id`)
**Codes de réponse**:

- 201: Lecture créée avec succès
- 500: Erreur serveur

### PUT `/bible-readings/:id`

**Description**: Met à jour une lecture biblique
**Paramètres**:

- `id`: number (dans l'URL)
  **Body**: Même format que POST
  **Réponse**: Lecture mise à jour (même format que GET `/:id`)
  **Codes de réponse**:
- 200: Lecture mise à jour avec succès
- 404: Lecture non trouvée
- 500: Erreur serveur

### DELETE `/bible-readings/:id`

**Description**: Supprime une lecture biblique
**Paramètres**:

- `id`: number (dans l'URL)
  **Réponse**:

```json
{
  "message": "Lecture biblique supprimée avec succès"
}
```

**Codes de réponse**:

- 200: Lecture supprimée avec succès
- 404: Lecture non trouvée
- 500: Erreur serveur

## Routes des Textes Bibliques (`/bible-texts`)

### GET `/bible-texts`

**Description**: Récupère tous les textes bibliques
**Réponse**:

```json
[
  {
    "id": "number",
    "reference": "string",
    "content": "string",
    "language": "string",
    "readingId": "number (optionnel)",
    "bibleReading": {
      "id": "number",
      "date": "string (ISO date)",
      "theme": "string",
      "description": "string",
      "language": "string"
    }
  }
]
```

### GET `/bible-texts/:id`

**Description**: Récupère un texte biblique spécifique
**Paramètres**:

- `id`: number (dans l'URL)
  **Réponse**:

```json
{
  "id": "number",
  "reference": "string",
  "content": "string",
  "language": "string",
  "readingId": "number (optionnel)",
  "bibleReading": {
    "id": "number",
    "date": "string (ISO date)",
    "theme": "string",
    "description": "string",
    "language": "string"
  }
}
```

**Codes de réponse**:

- 200: Texte trouvé
- 404: Texte non trouvé
- 500: Erreur serveur

### GET `/bible-texts/:id/relations`

**Description**: Récupère un texte biblique avec toutes ses relations
**Paramètres**:

- `id`: number (dans l'URL)
  **Réponse**: Même format que GET `/:id`
  **Codes de réponse**:
- 200: Texte trouvé avec relations
- 404: Texte non trouvé
- 500: Erreur serveur

### GET `/bible-texts/reference/:reference`

**Description**: Récupère les textes bibliques par référence
**Paramètres**:

- `reference`: string (dans l'URL)
  **Réponse**: Tableau de textes (même format que GET `/`)
  **Codes de réponse**:
- 200: Textes trouvés
- 500: Erreur serveur

### GET `/bible-texts/language/:language`

**Description**: Récupère les textes bibliques par langue
**Paramètres**:

- `language`: string (dans l'URL)
  **Réponse**: Tableau de textes (même format que GET `/`)
  **Codes de réponse**:
- 200: Textes trouvés
- 500: Erreur serveur

### POST `/bible-texts`

**Description**: Crée un nouveau texte biblique
**Body**:

```json
{
  "reference": "string", // Obligatoire
  "content": "string",
  "language": "string",
  "readingId": "number"
}
```

**Réponse**: Texte créé (même format que GET `/:id`)
**Codes de réponse**:

- 201: Texte créé avec succès
- 400: Référence manquante
- 500: Erreur serveur

### PUT `/bible-texts/:id`

**Description**: Met à jour un texte biblique
**Paramètres**:

- `id`: number (dans l'URL)
  **Body**: Même format que POST
  **Réponse**: Texte mis à jour (même format que GET `/:id`)
  **Codes de réponse**:
- 200: Texte mis à jour avec succès
- 404: Texte non trouvé
- 500: Erreur serveur

### DELETE `/bible-texts/:id`

**Description**: Supprime un texte biblique
**Paramètres**:

- `id`: number (dans l'URL)
  **Réponse**:

```json
{
  "message": "Texte biblique supprimé avec succès"
}
```

**Codes de réponse**:

- 200: Texte supprimé avec succès
- 404: Texte non trouvé
- 500: Erreur serveur

## Routes des Lectures Favorites (`/favorite-bible-readings`)

### GET `/favorite-bible-readings`

**Description**: Récupère toutes les lectures favorites
**Réponse**:

```json
[
  {
    "id": "number",
    "userId": "number",
    "bibleReadingId": "number",
    "bibleReading": {
      "id": "number",
      "date": "string (ISO date)",
      "theme": "string",
      "description": "string",
      "language": "string"
    },
    "user": {
      "id": "number",
      "name": "string",
      "email": "string"
    }
  }
]
```

### GET `/favorite-bible-readings/:id`

**Description**: Récupère une lecture favorite spécifique
**Paramètres**:

- `id`: number (dans l'URL)
  **Réponse**: Même format que GET `/`
  **Codes de réponse**:
- 200: Lecture favorite trouvée
- 404: Lecture favorite non trouvée
- 500: Erreur serveur

### GET `/favorite-bible-readings/:id/relations`

**Description**: Récupère une lecture favorite avec toutes ses relations
**Paramètres**:

- `id`: number (dans l'URL)
  **Réponse**: Même format que GET `/`
  **Codes de réponse**:
- 200: Lecture favorite trouvée avec relations
- 404: Lecture favorite non trouvée
- 500: Erreur serveur

### GET `/favorite-bible-readings/user/:userId`

**Description**: Récupère toutes les lectures favorites d'un utilisateur spécifique
**Paramètres**:

- `userId`: number (dans l'URL)
  **Réponse**: Tableau de lectures favorites (même format que GET `/`)
  **Codes de réponse**:
- 200: Lectures favorites trouvées
- 500: Erreur serveur

### GET `/favorite-bible-readings/user/:userId/with-readings`

**Description**: Récupère toutes les lectures favorites d'un utilisateur avec les détails des lectures bibliques associées
**Paramètres**:

- `userId`: number (dans l'URL)
  **Réponse**: Tableau de lectures favorites avec détails des lectures (même format que GET `/`)
  **Codes de réponse**:
- 200: Lectures favorites trouvées avec détails
- 500: Erreur serveur

### POST `/favorite-bible-readings`

**Description**: Crée une nouvelle lecture favorite
**Body**:

```json
{
  "userId": "number",
  "bibleReadingId": "number"
}
```

**Réponse**: Lecture favorite créée (même format que GET `/`)
**Codes de réponse**:

- 201: Lecture favorite créée avec succès
- 500: Erreur serveur

### DELETE `/favorite-bible-readings/:id`

**Description**: Supprime une lecture favorite
**Paramètres**:

- `id`: number (dans l'URL)
  **Réponse**:

```json
{
  "message": "Favori supprimé avec succès"
}
```

**Codes de réponse**:

- 200: Lecture favorite supprimée avec succès
- 404: Lecture favorite non trouvée
- 500: Erreur serveur

## Route d'Insertion de Lecture par JSON (`/insert-bible-reading`)

### POST `/insert-bible-reading`

**Description**: Insère plusieurs lectures bibliques à partir d'un tableau de données JSON
**Body**:

```json
{
  "lang": "FR ou EW",
  "data": [
    {
      "title": "string;",
      "beginDay": "number;",
      "days": [
        {
          "theme": "string;",
          "references": "string | string[];",
          "content?": "string;",
          "description?": "string;",
          "id?": "number;"
        }
      ]
    }
  ]
}
```

```json
{
  "lang": "FR ou EW",
  "data": [
    {
      "title": "JANVIER 2025",
      "beginDay": 1,
      "days": [
        {
          "description": "NOUVEL AN",
          "references": [
            "Ps 66, 1-4",
            "Nb 6, 22-27",
            "Ga 4, 1-7",
            "Lc 2, 15-21"
          ],
          "theme": "ANNONCE LA GRÂCE DU SAUVEUR QUI EST NÉ"
        },
        {
          "theme": "Reste vigilant(e) en toutes circonstances",
          "references": "S 19, 8-18"
        }
      ]
    }
  ]
}
```

**Notes**:

- Le champ `data` doit être un tableau d'objets contenant les lectures mensuelles
- Le champ `lang` est obligatoire et spécifie la langue des lectures
- Chaque lecture doit avoir une date, un thème, une description et peut avoir des textes associés
- Les textes sont optionnels et peuvent être vides
- Toutes les routes nécessitent une authentification sauf `/auth/register` et `/auth/login`

**Réponses**:

- 201: Lectures insérées avec succès
- 400: Données invalides (données manquantes ou format incorrect)
- 500: Erreur lors de l'insertion des lectures
