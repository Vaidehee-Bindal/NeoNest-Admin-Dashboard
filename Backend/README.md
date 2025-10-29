# NeoNest Admin Backend

Backend server for NeoNest Admin Dashboard with MongoDB authentication.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the `Backend` directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
PORT=5000
FRONTEND_URL=http://localhost:5173
```

3. Create an admin account:
```bash
npm run create-admin
```

Or with custom credentials:
```bash
npm run create-admin <email> <password> <name> <role>
```

Example:
```bash
npm run create-admin admin@neonest.in admin123 "Admin User" super_admin
```

## Running

Build and start the server:
```bash
npm run dev
```

Or build and start separately:
```bash
npm run build
npm start
```

The server will start on port 5000 (or the port specified in `.env`).

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login with email and password
  - Body: `{ email: string, password: string }`
  - Returns: `{ success: true, token: string, admin: {...} }`

- `GET /api/auth/verify` - Verify JWT token
  - Headers: `Authorization: Bearer <token>`
  - Returns: `{ success: true, admin: {...} }`

### Protected Routes

All protected routes require the `Authorization: Bearer <token>` header.

- `GET /api/protected` - Example protected route
  - Returns: `{ success: true, message: string, admin: {...} }`

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- CORS enabled for frontend
- Authentication middleware for route protection
- Admin account activation checks

