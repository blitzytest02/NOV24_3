# Node.js Express Server Tutorial

A simple, beginner-friendly tutorial project demonstrating how to build a web server using Node.js and Express.js framework. This project features two REST API endpoints that return plain text responses.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Example Usage](#example-usage)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Overview

This tutorial project serves as an introduction to building web servers with Express.js, the de facto standard server framework for Node.js. The application demonstrates:

- Express.js application initialization and configuration
- Basic route handling with GET requests
- Server port configuration using environment variables
- Simple text response patterns

The server exposes two endpoints:
1. A root endpoint (`/`) that returns "Hello world"
2. An evening endpoint (`/evening`) that returns "Good evening"

## Prerequisites

Before running this project, ensure you have the following installed on your system:

- **Node.js** - Version 18.x or higher (v20.x recommended)
  - Check your version: `node --version`
  - Download from: [https://nodejs.org/](https://nodejs.org/)

- **npm** - Version 8.x or higher (comes bundled with Node.js)
  - Check your version: `npm --version`

## Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

   This will install Express.js and all required dependencies listed in `package.json`.

3. **Set up environment variables** (optional):
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file to customize your configuration if needed.

## Usage

### Starting the Server

**Production mode:**
```bash
npm start
```

**Development mode** (with auto-restart on file changes):
```bash
npm run dev
```

The server will start and display a message indicating the port it's listening on:
```
Server running on http://localhost:3000
```

### Available npm Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `npm start` | Start the server in production mode |
| `dev` | `npm run dev` | Start the server with nodemon for development |
| `test` | `npm test` | Run the test suite |
| `test:watch` | `npm run test:watch` | Run tests in watch mode |

## API Endpoints

### GET /

Returns a simple greeting message.

- **URL**: `/`
- **Method**: `GET`
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: `Hello world`
  - **Content-Type**: `text/html; charset=utf-8`

### GET /evening

Returns an evening greeting message.

- **URL**: `/evening`
- **Method**: `GET`
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: `Good evening`
  - **Content-Type**: `text/html; charset=utf-8`

### Error Responses

For any undefined routes, the server returns Express.js default 404 response:

- **Code**: `404 Not Found`
- **Content**: `Cannot GET /<path>`

## Example Usage

### Using curl

**Test the root endpoint:**
```bash
curl http://localhost:3000/
```
**Expected output:**
```
Hello world
```

**Test the evening endpoint:**
```bash
curl http://localhost:3000/evening
```
**Expected output:**
```
Good evening
```

**Test with verbose output:**
```bash
curl -v http://localhost:3000/
```
**Expected output:**
```
*   Trying 127.0.0.1:3000...
* Connected to localhost (127.0.0.1) port 3000
> GET / HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/8.0.0
> Accept: */*
> 
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 11
< 
Hello world
```

### Using JavaScript (fetch API)

```javascript
// Test root endpoint
fetch('http://localhost:3000/')
  .then(response => response.text())
  .then(data => console.log(data));
// Output: Hello world

// Test evening endpoint
fetch('http://localhost:3000/evening')
  .then(response => response.text())
  .then(data => console.log(data));
// Output: Good evening
```

### Using a Web Browser

Simply open your web browser and navigate to:
- `http://localhost:3000/` - Displays "Hello world"
- `http://localhost:3000/evening` - Displays "Good evening"

## Project Structure

```
.
├── server.js           # Main application entry point with Express routes
├── package.json        # Project configuration and dependencies
├── package-lock.json   # Dependency lock file
├── .env                # Environment variables (not committed to git)
├── .env.example        # Environment variables template
├── .gitignore          # Git ignore patterns
├── README.md           # Project documentation (this file)
├── nodemon.json        # Nodemon configuration for development
├── jest.config.js      # Jest testing configuration
└── test/
    └── server.test.js  # Test suite for endpoints
```

## Environment Variables

The application supports the following environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | The port number the server listens on |
| `NODE_ENV` | `development` | Application environment (development, test, production) |

### Setting Environment Variables

**Using a .env file (recommended for development):**

Create a `.env` file in the project root:
```env
PORT=3000
NODE_ENV=development
```

**Using command line:**
```bash
PORT=8080 npm start
```

**Using export (Unix/Linux/macOS):**
```bash
export PORT=8080
npm start
```

**Using set (Windows CMD):**
```cmd
set PORT=8080
npm start
```

## Testing

This project uses Jest as the testing framework with supertest for HTTP endpoint testing.

### Running Tests

**Run all tests once:**
```bash
npm test
```

**Run tests in watch mode:**
```bash
npm run test:watch
```

**Run tests with coverage report:**
```bash
npm test -- --coverage
```

### Test Coverage

The test suite covers:
- ✅ GET / endpoint returns status 200
- ✅ GET / endpoint returns "Hello world"
- ✅ GET /evening endpoint returns status 200
- ✅ GET /evening endpoint returns "Good evening"
- ✅ Invalid routes return 404 status

## Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**

2. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes** and ensure tests pass:
   ```bash
   npm test
   ```

4. **Commit your changes:**
   ```bash
   git commit -m "Add: Description of your changes"
   ```

5. **Push to your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**

### Code Style Guidelines

- Use 2-space indentation
- Use single quotes for strings
- Include semicolons at statement ends
- Follow Express.js conventions and best practices
- Write descriptive commit messages

## Troubleshooting

### Common Issues

**Port already in use:**
```
Error: listen EADDRINUSE: address already in use :::3000
```
Solution: Either stop the process using port 3000 or set a different port:
```bash
PORT=3001 npm start
```

**Module not found:**
```
Error: Cannot find module 'express'
```
Solution: Install dependencies:
```bash
npm install
```

**Permission denied:**
```
Error: listen EACCES: permission denied 0.0.0.0:80
```
Solution: Use a port number above 1024 or run with elevated privileges.

## Learn More

- [Express.js Official Documentation](https://expressjs.com/)
- [Node.js Official Documentation](https://nodejs.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Happy coding!** 🚀

If you have questions or run into issues, please open an issue in the repository.
