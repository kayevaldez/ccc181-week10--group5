# CampusConnect API Specification

Base address: `http://localhost:3000/api/v1`
Format: JSON. Passwords and password hashes are never sent in any response.

## Required endpoints

| Method | Endpoint | Purpose | Success | Errors |
| --- | --- | --- | --- | --- |
| GET | `/api/v1/health` | Checks that the API is running. | 200 OK | none |
| POST | `/api/v1/sessions` | Logs in. A session is created. | 200 OK | 400, 401 |
| GET | `/api/v1/users/me` | Returns the logged-in user. Needs a token. | 200 OK | 401 |

### GET /api/v1/health

Response `200 OK`:

```json
{ "status": "ok" }
```

### POST /api/v1/sessions

Request body (JSON):

```json
{ "email": "student@campusconnect.test", "password": "Campus26" }
```

Response `200 OK` (login succeeded):

```json
{
  "token": "<a long token text>",
  "user": { "id": 1, "name": "Demo Student", "email": "student@campusconnect.test" }
}
```

Response `400 Bad Request` (email or password missing or badly formed):

```json
{ "error": "Email and password are required." }
```

Response `401 Not logged in` (wrong password OR unknown email, same message for both):

```json
{ "error": "Invalid email or password." }
```

The token expires in 1 hour.

### GET /api/v1/users/me

Send the token in this header:

```
Authorization: Bearer <token>
```

Response `200 OK`:

```json
{ "id": 1, "name": "Demo Student", "email": "student@campusconnect.test" }
```

Response `401` (token missing, wrong, or expired):

```json
{ "error": "Not logged in." }
```

### Other responses

| Case | Status | Body |
| --- | --- | --- |
| Unknown address | 404 | `{ "error": "Not found." }` |
| Unexpected error | 500 | `{ "error": "Something went wrong." }` |

## Required demo account

| Email | Password | Name |
| --- | --- | --- |
| `student@campusconnect.test` | `Campus26` | Demo Student |

## Events (design only)

This resource is a design on paper. It is **not built**.
The field names in the example are only an example.

| Method | Endpoint | What it does | Success | Errors |
| --- | --- | --- | --- | --- |
| GET | `/api/v1/events` | List all events | 200 OK | none |
| GET | `/api/v1/events?month=11` | List only the events of month 11 | 200 OK | none |
| GET | `/api/v1/events/12` | Get one event | 200 OK | 404 |
| POST | `/api/v1/events` | Add an event | 201 Created | 400 |
| PATCH | `/api/v1/events/12` | Change some fields of event 12 | 200 OK | 400, 404 |
| DELETE | `/api/v1/events/12` | Remove event 12 | 204 No Content | 404 |

Example body for `POST /api/v1/events`:

```json
{ "title": "Foundation Day", "date": "2026-11-20", "location": "MSU-Naawan" }
```

Rules used: plural nouns, the method is the verb, filters use a query string, and the address starts with `/api/v1/`.