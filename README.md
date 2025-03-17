# Wikipedia Featured Content Hybrid App

This repository contains the implementation of a hybrid application that uses:

- **Frontend:** A mobile application built with Expo (React Native + TypeScript) for exploring featured content from Wikipedia.
- **Backend:** A Node.js API built with NestJS (TypeScript) that acts as a proxy to the Wikipedia Featured Content API and provides translation using a self-hosted instance of LibreTranslate.

The application allows users to select a date and a language to view featured content displayed in cards, with options to share, view details, and more.

---

## Frontend (Expo)

### Requirements

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (optional global installation)

### Installation and Running

1. Navigate to the `wikipedia-frontend` folder:

   ```bash
   cd wikipedia-frontend
   ```

2. Install dependencies:

```bash
npm install
```

3. Start the application:

```bash
npm start
```

With Expo you can test the app on simulators or physical devices using the Expo Go app.

### Key Structure and Components

src/components/DateSelector.tsx: A component for date selection styled like a dropdown.
src/components/LanguageDropdown.tsx: A styled language selector.
src/components/ArticleCard.tsx: Renders content cards with images and links.
src/screens/HomeScreen.tsx: The main screen that integrates date and language selection and displays content.
src/constants/utils.ts: Contains constants like the supported languages.
src/services/articlesService.ts: Encapsulates API calls to the backend.

## Backend (NestJS)

### Requirements

- [Node.js](https://nodejs.org/)
- [Nest CLI](https://docs.nestjs.com/first-steps) (optional global installation)

### Installing and running

1. Navigate to the `wikipedia-backend` folder:

   ```bash
   cd wikipedia-backend
   ```

2. Install dependencies:

```bash
npm install
```

3. Start the application:

```bash
npm run start:dev
```

4. To compile the project:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Endpoints

### GET /feed

- Acts as a proxy to the Wikipedia Featured Content API.
- Accepts `year`, `month`, `day` parameters and optionally a `language` parameter.

### GET /feed/translate/:targetLanguage

- Inherits functionality from `/feed` and translates titles and extracts using the LibreTranslate API.

---

## Security and Rate Limiting

- Uses `@nestjs/throttler` to limit the number of requests.
- Uses Helmet for enhancing HTTP header security.
- Validates DTOs using `class-validator` to ensure data integrity.

---

## Type Safety

### Wikipedia API Response

- Interfaces are defined to type the response from the Wikipedia Featured Content API.

### LibreTranslate API Response

- A simple interface is defined for the LibreTranslate response to ensure the translated text is properly typed.

## Testing

The backend includes unit tests using Jest.

**Run Tests:**

```bash
npm run test
```

Tests cover both the service and controller logic.

---

## Additional Considerations

### Docker

Consider using Docker to containerize your backend and the self-hosted LibreTranslate instance.
