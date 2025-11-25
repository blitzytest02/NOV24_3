# Node.js Express Server Tutorial

A tutorial Node.js server demonstrating Express.js framework fundamentals with two simple HTTP endpoints.

## Overview

This project showcases a basic Express.js server implementation with:
- **GET /** - Returns "Hello world"
- **GET /evening** - Returns "Good evening"

Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

## Prerequisites

- [Node.js](https://nodejs.org/) v18.0.0 or higher
- [npm](https://www.npmjs.com/) v9.0.0 or higher

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Create a `.env` file for custom configuration:
```bash
cp .env.example .env
```

## Usage

### Start the Server

#### Production Mode
```bash
npm start
```

#### Development Mode (with auto-restart)
```bash
npm run dev
```

The server will start on `http://localhost:3000` by default.

### Test the Endpoints

Once the server is running, test the endpoints using curl:

**Hello World Endpoint:**
```bash
curl http://localhost:3000/
# Response: Hello world
```

**Good Evening Endpoint:**
```bash
curl http://localhost:3000/evening
# Response: Good evening
```

## API Endpoints

| Method | Path      | Description                    | Response       |
|--------|-----------|--------------------------------|----------------|
| GET    | /         | Root endpoint                  | Hello world    |
| GET    | /evening  | Evening greeting endpoint      | Good evening   |

## Available Scripts

| Script            | Description                                    |
|-------------------|------------------------------------------------|
| `npm start`       | Start the server in production mode            |
| `npm run dev`     | Start the server with nodemon (auto-restart)   |
| `npm test`        | Run the test suite                             |
| `npm run test:watch` | Run tests in watch mode                     |
| `npm run test:coverage` | Run tests with coverage report            |
| `npm run lint`    | Run ESLint for code quality                    |
| `npm run format`  | Format code with Prettier                      |

## Environment Variables

| Variable   | Description              | Default |
|------------|--------------------------|---------|
| `PORT`     | Server listening port    | 3000    |
| `NODE_ENV` | Environment mode         | development |

## Project Structure

```
├── server.js          # Main Express application
├── package.json       # Project configuration and dependencies
├── .env               # Environment variables (not committed)
├── .env.example       # Environment variable template
├── .gitignore         # Git ignore patterns
├── jest.config.js     # Jest testing configuration
├── nodemon.json       # Nodemon development configuration
├── .eslintrc.js       # ESLint code quality rules
├── .prettierrc        # Prettier code formatting rules
├── Dockerfile         # Docker container definition
├── docker-compose.yml # Docker Compose configuration
├── test/              # Test files
│   └── server.test.js # Server endpoint tests
└── docs/              # Documentation
    └── API.md         # Detailed API documentation
```

## Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Docker Support

Build and run with Docker:
```bash
docker build -t nodejs-express-tutorial .
docker run -p 3000:3000 nodejs-express-tutorial
```

Or use Docker Compose:
```bash
docker-compose up
```

## Dependencies

### Production
- **express** (4.21.2) - Web application framework
- **dotenv** (^16.4.7) - Environment variable management

### Development
- **jest** (^29.7.0) - Testing framework
- **supertest** (^7.0.0) - HTTP testing library
- **nodemon** (^3.1.7) - Development auto-restart
- **eslint** (^8.57.1) - Code linting
- **prettier** (^3.3.3) - Code formatting

## License

MIT

## Further Learning

- [Express.js Official Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Jest Testing Framework](https://jestjs.io/)
- [Supertest HTTP Testing](https://github.com/ladjs/supertest)
