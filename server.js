/**
 * server.js - Main Express.js Application Entry Point
 * 
 * This is a tutorial Node.js server demonstrating Express.js framework fundamentals.
 * The server exposes two GET endpoints:
 *   - GET /        : Returns "Hello world"
 *   - GET /evening : Returns "Good evening"
 * 
 * Express.js is a minimal and flexible Node.js web application framework that provides
 * a robust set of features for web and mobile applications. It simplifies the process
 * of building web servers by providing helpful utilities like routing, middleware support,
 * and HTTP utility methods.
 * 
 * @see https://expressjs.com/ - Official Express.js documentation
 */

// ============================================================================
// Module Imports
// ============================================================================

/**
 * Load environment variables from .env file into process.env
 * This must be called before any other code that uses environment variables.
 * 
 * dotenv is a zero-dependency module that loads environment variables from a
 * .env file into process.env. This allows you to separate configuration from
 * your code, following the twelve-factor app methodology.
 * 
 * If the .env file doesn't exist, dotenv will not throw an error - it simply
 * won't load any additional environment variables.
 */
require('dotenv').config();

/**
 * Import the Express.js framework
 * 
 * Express.js provides the following key features used in this tutorial:
 *   - express()     : Factory function to create an Express application
 *   - app.get()     : Method to define route handlers for HTTP GET requests
 *   - app.listen()  : Method to bind and listen for connections on a port
 *   - app.use()     : Method to mount middleware functions (available for future use)
 * 
 * Express 4.21.2 is used for its stability and security patches.
 */
const express = require('express');

// ============================================================================
// Application Configuration
// ============================================================================

/**
 * Create Express application instance
 * 
 * The express() function is a top-level function exported by the express module.
 * Calling it creates an Express application object conventionally named 'app'.
 * 
 * The app object has methods for:
 *   - Routing HTTP requests (app.get(), app.post(), app.put(), app.delete(), etc.)
 *   - Configuring middleware (app.use())
 *   - Rendering HTML views (not used in this tutorial)
 *   - Registering a template engine (not used in this tutorial)
 */
const app = express();

/**
 * Configure the server port
 * 
 * Using process.env.PORT allows the application to respect environment-specific
 * port configuration. This is especially important for:
 *   - Cloud deployments (Heroku, Railway, etc.) which inject their own PORT
 *   - Docker containers where port mapping may differ
 *   - Local development with multiple services
 * 
 * The fallback value of 3000 is a common convention for Node.js development.
 * parseInt() ensures the port is a number, with radix 10 for decimal parsing.
 */
const PORT = parseInt(process.env.PORT, 10) || 3000;

// ============================================================================
// Route Definitions
// ============================================================================

/**
 * Root endpoint - GET /
 * 
 * This is the original "Hello world" endpoint demonstrating the most basic
 * Express.js route. When a client sends a GET request to the root path ("/"),
 * the server responds with the text "Hello world".
 * 
 * Route handler breakdown:
 *   - '/'              : The URL path to match (root of the application)
 *   - (req, res)       : Arrow function with request and response objects
 *   - req              : The HTTP request object (contains headers, query params, etc.)
 *   - res              : The HTTP response object (used to send data back to client)
 *   - res.send()       : Sends the HTTP response; automatically sets Content-Type header
 * 
 * res.send() with a string argument will:
 *   - Set Content-Type to 'text/html; charset=utf-8'
 *   - Set Content-Length header automatically
 *   - End the response
 * 
 * @route GET /
 * @returns {string} "Hello world" - Plain text response
 * @example
 *   // Request:  curl http://localhost:3000/
 *   // Response: Hello world
 */
app.get('/', (req, res) => {
  res.send('Hello world');
});

/**
 * Evening endpoint - GET /evening
 * 
 * This is the new endpoint added to demonstrate Express.js routing capabilities.
 * Multiple routes can be defined on the same Express application, each responding
 * to different URL paths.
 * 
 * Route matching in Express.js:
 *   - Routes are matched in the order they are defined
 *   - The first matching route handles the request
 *   - More specific routes should be defined before general routes
 * 
 * @route GET /evening
 * @returns {string} "Good evening" - Plain text response
 * @example
 *   // Request:  curl http://localhost:3000/evening
 *   // Response: Good evening
 */
app.get('/evening', (req, res) => {
  res.send('Good evening');
});

// ============================================================================
// Server Initialization
// ============================================================================

/**
 * Start the HTTP server
 * 
 * app.listen() is a convenience method that creates an HTTP server and binds
 * it to the specified port. It's equivalent to:
 *   const http = require('http');
 *   http.createServer(app).listen(PORT);
 * 
 * Parameters:
 *   - PORT     : The port number to listen on (configured above)
 *   - callback : Optional function called once the server is ready to accept connections
 * 
 * The callback function is used here to log a confirmation message indicating
 * the server has started successfully and is ready to handle requests.
 * 
 * Important: When running tests with supertest, the server binding is handled
 * by supertest, so this listen() call only executes when running the server directly.
 */
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log(`  GET /        - Returns "Hello world"`);
  console.log(`  GET /evening - Returns "Good evening"`);
});

// ============================================================================
// Graceful Shutdown Handling
// ============================================================================

/**
 * Handle graceful shutdown on SIGTERM signal
 * 
 * SIGTERM is the termination signal sent by process managers (like Docker, Kubernetes,
 * PM2) when they want to stop the application gracefully. This handler ensures
 * the server closes all connections before the process exits.
 * 
 * Graceful shutdown is important for:
 *   - Completing in-flight requests before shutting down
 *   - Releasing resources (database connections, file handles, etc.)
 *   - Ensuring clean container orchestration in production environments
 */
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

/**
 * Handle graceful shutdown on SIGINT signal (Ctrl+C)
 * 
 * SIGINT is sent when a user presses Ctrl+C in the terminal.
 * This provides a clean shutdown experience during local development.
 */
process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

// ============================================================================
// Module Export
// ============================================================================

/**
 * Export the Express application instance
 * 
 * Exporting the app (not the server) allows test frameworks like supertest to:
 *   - Create their own test server instances
 *   - Run tests without port conflicts
 *   - Test HTTP endpoints without actually starting the server
 * 
 * Example usage in tests:
 *   const request = require('supertest');
 *   const app = require('./server');
 *   
 *   describe('GET /', () => {
 *     it('should return Hello world', async () => {
 *       const res = await request(app).get('/');
 *       expect(res.text).toBe('Hello world');
 *     });
 *   });
 * 
 * This is a CommonJS module export. In Node.js, module.exports is the object
 * that is actually returned when require() is called on this module.
 */
module.exports = app;
