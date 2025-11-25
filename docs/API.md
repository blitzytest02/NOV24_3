# API Documentation

Comprehensive documentation for the Node.js Express Server Tutorial API endpoints.

## API Overview

This API is part of a Node.js Express.js tutorial server demonstrating basic web server functionality. The server implements two simple GET endpoints that return plain text greeting messages. This tutorial-focused API is designed to help developers learn Express.js fundamentals including:

- Express application initialization
- Route definition using `app.get()`
- Response handling using `res.send()`
- Server configuration and port binding

The API follows RESTful conventions with synchronous request/response patterns suitable for learning Express.js basics.

---

## Base URL

```
http://localhost:3000
```

The server listens on port 3000 by default, or uses the `PORT` environment variable if configured.

---

## Authentication

**No authentication required.**

This is a tutorial application with public endpoints. All API endpoints are accessible without any authentication tokens, API keys, or credentials.

---

## Endpoints

### GET /

Returns a simple "Hello world" greeting message.

| Property | Value |
|----------|-------|
| **Method** | GET |
| **Path** | `/` |
| **Description** | Returns welcome message |
| **Authentication** | None |

**Request:**
```http
GET / HTTP/1.1
Host: localhost:3000
```

**Response:**
```
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 11

Hello world
```

**Example with curl:**
```bash
curl http://localhost:3000/
```

**Expected Response:** `Hello world`

---

### GET /evening

Returns a "Good evening" greeting message.

| Property | Value |
|----------|-------|
| **Method** | GET |
| **Path** | `/evening` |
| **Description** | Returns evening greeting message |
| **Authentication** | None |

**Request:**
```http
GET /evening HTTP/1.1
Host: localhost:3000
```

**Response:**
```
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 12

Good evening
```

**Example with curl:**
```bash
curl http://localhost:3000/evening
```

**Expected Response:** `Good evening`

---

## Response Format

All endpoints return **plain text responses** using Express.js `res.send()` method. This method automatically:

- Sets the `Content-Type` header to `text/html; charset=utf-8` for string responses
- Calculates and sets the `Content-Length` header
- Handles character encoding (UTF-8)

**Response Characteristics:**
- Format: Plain text (not JSON)
- Encoding: UTF-8
- No request body required for GET endpoints
- Synchronous response pattern

---

## Status Codes

| Status Code | Description | When Returned |
|-------------|-------------|---------------|
| **200 OK** | Request successful | Valid endpoint accessed |
| **404 Not Found** | Endpoint does not exist | Invalid route requested |

---

## Response Headers

All successful responses include the following headers:

| Header | Value | Description |
|--------|-------|-------------|
| Content-Type | `text/html; charset=utf-8` | Response content type |
| Content-Length | Varies | Length of response body in bytes |
| X-Powered-By | `Express` | Server framework identifier |

---

## Error Handling

### 404 Not Found

Requests to undefined routes return a 404 status code with Express's default error response.

**Example:**
```bash
curl -i http://localhost:3000/nonexistent
```

**Response:**
```
HTTP/1.1 404 Not Found
Content-Type: text/html; charset=utf-8

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>Cannot GET /nonexistent</pre>
</body>
</html>
```

---

## Usage Examples

### Using curl

```bash
# Get Hello world response
curl http://localhost:3000/
# Output: Hello world

# Get Good evening response
curl http://localhost:3000/evening
# Output: Good evening

# View full response with headers
curl -i http://localhost:3000/
```

### Using JavaScript fetch API

```javascript
// Get Hello world
fetch('http://localhost:3000/')
  .then(response => response.text())
  .then(data => console.log(data)); // Hello world

// Get Good evening
fetch('http://localhost:3000/evening')
  .then(response => response.text())
  .then(data => console.log(data)); // Good evening
```

### Using async/await

```javascript
async function getGreeting() {
  const response = await fetch('http://localhost:3000/');
  const text = await response.text();
  console.log(text); // Hello world
}

async function getEvening() {
  const response = await fetch('http://localhost:3000/evening');
  const text = await response.text();
  console.log(text); // Good evening
}
```

### Using Node.js http module

```javascript
const http = require('http');

http.get('http://localhost:3000/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data)); // Hello world
});
```

---

## Testing

The API includes a comprehensive test suite located at `test/server.test.js`. Tests verify:

- GET / endpoint returns status 200 and "Hello world"
- GET /evening endpoint returns status 200 and "Good evening"
- Invalid routes return 404 status

**Run tests:**
```bash
npm test
```

**Run tests in watch mode:**
```bash
npm run test:watch
```

---

## Rate Limiting

No rate limiting is implemented in this tutorial application.

---

## CORS

Cross-Origin Resource Sharing (CORS) is not configured in this tutorial application. For production use, consider adding the `cors` middleware.

---

## Additional Resources

- [Express.js Official Documentation](https://expressjs.com/)
- [Node.js HTTP Module](https://nodejs.org/api/http.html)
- Project README: See `/README.md` for installation and setup instructions
