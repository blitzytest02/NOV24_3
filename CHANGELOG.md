# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Additional API endpoints for future tutorials
- Request validation middleware
- Logging enhancements

## [1.0.0] - 2025-11-25

### Added
- **Express.js 4.21.2 Integration**: Integrated Express.js web framework as the foundation for the Node.js server, replacing native HTTP module with Express routing and middleware patterns.
- **GET / Endpoint**: Root endpoint that returns "Hello world" response, demonstrating basic Express.js route handling.
- **GET /evening Endpoint**: New endpoint that returns "Good evening" response, showcasing Express.js capability for multiple route definitions.
- **Project Configuration**: Complete `package.json` with project metadata, npm scripts (`start`, `dev`, `test`, `lint`, `format`), and dependency management.
- **Environment Configuration**: Support for environment variables via `.env` file with `dotenv` integration:
  - `PORT`: Configurable server port (default: 3000)
  - `NODE_ENV`: Environment mode setting (development/production/test)
- **Test Suite**: Comprehensive testing setup using Jest and supertest:
  - Unit tests for endpoint response verification
  - Integration tests for HTTP request/response cycle
  - Code coverage reporting with 80% threshold
- **Development Tools**:
  - `nodemon` for automatic server restart during development
  - `ESLint` for JavaScript code quality enforcement
  - `Prettier` for consistent code formatting
- **Docker Support**:
  - `Dockerfile` for containerized deployment using node:20-alpine base image
  - `docker-compose.yml` for local container orchestration with live reload
  - `.dockerignore` for optimized build context
- **Documentation**:
  - Comprehensive `README.md` with installation, usage, and API documentation
  - Environment variable template (`.env.example`)
  - This changelog for version tracking

### Technical Details
- **Node.js Version**: v20.19.5+ (Active LTS)
- **Express.js Version**: 4.21.2 (includes security patches for CVE-2024-45590)
- **Package Manager**: npm v10.8.2+
- **Response Format**: Plain text using `res.send()`
- **Default Port**: 3000 (configurable via PORT environment variable)

### Security
- Updated to Express.js 4.21.2 which includes security fix for path-to-regexp vulnerability (CVE-2024-45590 ReDoS)
- Environment variables excluded from version control via `.gitignore`

---

## Release Notes

### Version Numbering
This project follows [Semantic Versioning](https://semver.org/):
- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

### Types of Changes
- `Added` for new features
- `Changed` for changes in existing functionality
- `Deprecated` for soon-to-be removed features
- `Removed` for now removed features
- `Fixed` for any bug fixes
- `Security` for vulnerability fixes

[Unreleased]: https://github.com/username/nov24-3/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/username/nov24-3/releases/tag/v1.0.0
