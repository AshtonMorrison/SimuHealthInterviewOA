# SimuHealth Interview Todo API

A TypeScript and Express REST API for managing user-owned todo items. Users can register and log in to receive a JSON Web Token (JWT); that token is required to create, update, and delete todos.

## Install and run

Prerequisites: Node.js (must support `crypto.randomUUID`, which is available from Node.js v14.17.0 onwards) and npm.

```bash
git clone https://github.com/AshtonMorrison/SimuHealthInterviewOA.git
cd SimuHealthInterviewOA
npm install
```

If environment variable `JWT_SECRET` is not set, the application uses `secret`.

Compile and Start the server:
```bash
npm run dev
```

The API listens on `http://localhost:3000`.

## Tech stack

- **Node.js** and **TypeScript**
- **Express 5** for HTTP routing and middleware
- **Zod** for request validation
- **bcryptjs** for password hashing (12 salt rounds)
- **jsonwebtoken** for JWT creation and verification
- Native JavaScript `Map` objects to mimic database integration

## API endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `POST` | `/user/create` | None | Create an account. |
| `POST` | `/user/login` | None | Authenticate and receive a JWT. |
| `GET` | `/todo` | None | List all todos, optionally filtered. |
| `POST` | `/todo` | JWT required | Create a todo owned by the authenticated user. |
| `PUT` | `/todo/:id` | JWT required | Update an owned todo. |
| `DELETE` | `/todo/:id` | JWT required | Delete an owned todo. |

### Request and response shapes

#### Create user — `POST /user/create`

```json
{
  "username": "alex",
  "password": "secure-password"
}
```

Successful response (`201 Created`):

```json
{
  "Id": "user-uuid",
  "username": "alex"
}
```

#### Log in — `POST /user/login`

```json
{
  "username": "alex",
  "password": "secure-password"
}
```

Successful response (`200 OK`):

```json
{
  "token": "jwt-token"
}
```

Tokens contain the user's ID and expire after one hour.

#### Create todo — `POST /todo`

```json
{
  "description": "Book a follow-up appointment"
}
```

Successful response (`201 Created`):

```json
{
  "id": "todo-uuid",
  "owner": "user-uuid",
  "description": "Book a follow-up appointment",
  "completed": false
}
```

#### List todos — `GET /todo`

Optional query parameters:

| Parameter | Accepted values | Behavior |
| --- | --- | --- |
| `completed` | `true` or `false` | Returns todos whose completion state matches. |
| `description` | Non-empty text | Case-insensitive partial match against the description. |

A successful request returns an array of todo objects. When no matching todos exist, it returns:

```json
{
  "message": "No todos available"
}
```

#### Update todo — `PUT /todo/:id`

Supply at least one field. No additional fields are accepted.

```json
{
  "description": "Book follow-up appointment",
  "completed": true
}
```

Successful response (`200 OK`) returns the updated todo object.

#### Delete todo — `DELETE /todo/:id`

Successful response (`200 OK`):

```json
{
  "message": "Todo deleted successfully"
}
```

## Sending requests

Use any HTTP client, such as cURL, Postman, or Insomnia. The following cURL flow creates an account, logs in, and creates a todo.

```bash
curl -X POST http://localhost:3000/user/create \
  -H "Content-Type: application/json" \
  -d '{"username":"alex","password":"secure-password"}'

curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alex","password":"secure-password"}'
```

Copy the returned `token` and send it as the `Authorization` header **without** a `Bearer ` prefix:

```bash
curl -X POST http://localhost:3000/todo \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_JWT_TOKEN" \
  -d '{"description":"Book a follow-up appointment"}'
```

Examples of filtered reads:

```bash
curl "http://localhost:3000/todo?completed=false"
curl "http://localhost:3000/todo?description=appointment"
curl "http://localhost:3000/todo?description=appointment&completed=false"
```

To update or delete a todo, replace `TODO_ID` and provide the same authorization header:

```bash
curl -X PUT http://localhost:3000/todo/TODO_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: YOUR_JWT_TOKEN" \
  -d '{"completed":true}'

curl -X DELETE http://localhost:3000/todo/TODO_ID \
  -H "Authorization: YOUR_JWT_TOKEN"
```

## Status codes and handled errors

| Status | When it is returned | Example message |
| --- | --- | --- |
| `200 OK` | Successful login, todo listing, update, or deletion | `Todo deleted successfully` |
| `201 Created` | Successful user or todo creation | — |
| `400 Bad Request` | Invalid request fields/query parameters or malformed JSON | `Validation of Request failed` or `Invalid JSON` |
| `401 Unauthorized` | Missing, invalid, expired, or malformed JWT; invalid login credentials | `Unauthorized: No token provided` or `Invalid username or password` |
| `404 Not Found` | Unknown route, or todo does not exist / is not owned by the authenticated user | `Page not found` or `No todo found with provided id under provided userId` |
| `409 Conflict` | Attempt to register an existing username | `Username already exists` |
| `500 Internal Server Error` | Unhandled server error | `Unexpected Server Error` |

## Implemented features

- User registration with duplicate-username protection and bcrypt password hashing
- JWT login tokens with a one-hour expiry
- Authenticated create, update, and delete operations for todos
- Ownership checks: a user cannot change or remove another user's todo
- Todo listing with completion-state and case-insensitive description filters
- Zod validation for authentication, create, update, and filter requests
- Centralized handling for validation errors, malformed JSON, unexpected errors, and unknown routes

## File structure

```text
src/
├── index.ts                      # Application entry point
├── handlers/                     # Logic and Request Handlers 
│   ├── todo.handler.ts
│   └── user.handler.ts
├── routes/                       # API routes
│   ├── todo.route.ts
│   └── user.route.ts
├── middleware/                   # Middleware for authentication, error handling, and validation
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   ├── validator.middleware.ts
│   └── validation.schema.ts
├── models/                       # Type definitions for database entities
│   ├── todo.model.ts
│   └── user.model.ts
└── local-db/                     # Local in-memory storage
    ├── todo.db.ts
    └── user.db.ts
```
