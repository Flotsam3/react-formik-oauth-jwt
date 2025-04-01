# Vite React OAuth Demo with jsonwebtoken

This project is a simple setup to test OAuth authentication using a Vite frontend with React, chakra and Formik together with a Node.js backend with jsonwebtoken for authorization. MongoDB is used for storing data.

## Features
- Frontend:
  - Built with Vite and React
  - Uses Formik for form handling
  - Uses chakra for layout

- Backend:
  - Built with Node.js and Express
  - Uses jsonwebtoken for OAuth authentication

## Getting Started

### Prerequisites
- Node.js v16+
- npm or yarn

### Installation

1. Clone the repository:

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

### Configuration

Create an `.env` file in the `backend` directory with the following keys:
```
MONGO_URL
DATABASE
PORT
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
JWT_SECRET
JWT_EXPIRES_IN
...
```
### Important OAuth Configuration: To make the Google and GitHub OAuth login work, you'll need to set up OAuth credentials on Google and GitHub and include the client IDs and secrets in your .env file.

- **Google OAuth**:
  
1. Go to the Google Developer Console.

2. Create a new project if you haven't already.

3. Navigate to APIs & Services > Credentials.

4. Click Create Credentials and select OAuth 2.0 Client IDs.

5. Add the appropriate redirect URI in the "Authorized redirect URIs" field, e.g., http://localhost:3000/auth/google/callback.

6. Copy the Client ID and Client Secret and paste them into your .env file:

```
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
```

- **GitHub OAuth**:

1. Go to the GitHub Developer Settings.

2. Under OAuth Apps, click New OAuth App.

3. Add the necessary information, including the Authorization callback URL, e.g., http://localhost:3000/auth/github/callback.

4. Copy the Client ID and Client Secret and paste them into your .env file:

```
GITHUB_CLIENT_ID=<your-github-client-id>
GITHUB_CLIENT_SECRET=<your-github-client-secret>
```

### Running the project

#### Frontend:
```bash
cd frontend
npm run dev
```

#### Backend:
```bash
cd backend
npm start
```

### Usage
Visit `http://localhost:5173` to view the frontend and initiate the OAuth flow.

## License
This project is licensed under the MIT License.

