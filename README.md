# Car Marketplace — Frontend

React SPA (Create React App) for the Car Marketplace capstone project.

## Setup

```bash
npm install
npm start
```

Runs on http://localhost:3000. Set the backend URL in `.env`:

```
REACT_APP_API_URL=http://localhost:5000
```

## Routes

| Route | Description | Protected |
|---|---|---|
| `/` | Browse car listings | No |
| `/login` | Log in | No |
| `/register` | Create account | No |
| `/reset-password` | Password reset | No |
| `/cars/:id` | Car detail + favorite | No |
| `/dashboard` | Post a listing | Yes |
| `/admin` | Manage all users & listings | Yes (admin role) |

## Structure

```
src/
├── api.js              # fetch wrapper for the Flask API
├── context/
│   └── AuthContext.js  # JWT + user state
├── components/
│   ├── Navbar.js
│   ├── CarCard.js
│   ├── CarList.js
│   ├── LoginForm.js
│   ├── RegisterForm.js
│   └── ProtectedRoute.js
├── pages/
│   ├── Home.js
│   ├── Login.js
│   ├── Register.js
│   ├── ResetPassword.js
│   ├── CarDetail.js
│   └── Dashboard.js
├── App.js
└── index.js
```

## Notes

- Auth token is kept in React state (not localStorage) — it clears on refresh. Swap for a persisted store if the project needs "stay logged in".
- Expects the backend to expose `/auth/register`, `/auth/login`, `/auth/reset-password`, `/cars`, `/cars/:id`, and `/favorites` returning JSON matching `api.js`.
