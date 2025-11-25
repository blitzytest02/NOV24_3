# API Documentation

Comprehensive documentation for the Node.js Express Server Tutorial API endpoints.

## Base URL

```
http://localhost:3000
```

## Endpoints

### GET /

Returns a simple "Hello world" greeting.

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

**Response:** `Hello world`

---

### GET /evening

Returns a "Good evening" greeting.

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

**Response:** `Good evening`

---

## Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 OK      | Request successful, response returned |
| 404 Not Found | Requested endpoint does not exist |

## Response Headers

All successful responses include:

| Header | Value |
|--------|-------|
| Content-Type | text/html; charset=utf-8 |
| Content-Length | Length of response body in bytes |
| X-Powered-By | Express |

## Error Handling

Undefined routes will return a 404 status with Express's default error page.

**Example:**
```bash
curl http://localhost:3000/nonexistent
```

**Response:** 404 Not Found with HTML error page.

## Examples

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

### Using Node.js http module

```javascript
const http = require('http');

http.get('http://localhost:3000/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => console.log(data)); // Hello world
});
```

### Using axios

```javascript
const axios = require('axios');

// Get Hello world
axios.get('http://localhost:3000/')
  .then(response => console.log(response.data)); // Hello world

// Get Good evening
axios.get('http://localhost:3000/evening')
  .then(response => console.log(response.data)); // Good evening
```

## Rate Limiting

No rate limiting is implemented in this tutorial application.

## Authentication

No authentication is required for any endpoint.

## CORS

Cross-Origin Resource Sharing (CORS) is not configured in this tutorial application. For production use, consider adding the `cors` middleware.
