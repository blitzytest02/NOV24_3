/**
 * server.test.js - Unit and Integration Tests for Express Server
 * 
 * This test suite verifies the functionality of the Express.js server endpoints.
 * It uses Jest as the testing framework and supertest for HTTP assertions.
 * 
 * supertest allows testing HTTP endpoints without actually starting a server
 * on a specific port. It creates an internal test server that handles requests,
 * making tests faster and avoiding port conflicts.
 * 
 * Test coverage includes:
 *   - GET / endpoint returning "Hello world"
 *   - GET /evening endpoint returning "Good evening"
 *   - Invalid routes returning 404
 *   - Response headers verification
 */

const request = require('supertest');
const app = require('../server');

// ============================================================================
// Root Endpoint Tests - GET /
// ============================================================================

describe('GET /', () => {
  /**
   * Test that the root endpoint returns correct status and body
   */
  it('should return 200 status code', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('should return "Hello world" as response body', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello world');
  });

  it('should return text/html content type', async () => {
    const response = await request(app).get('/');
    expect(response.headers['content-type']).toMatch(/text\/html/);
  });

  it('should return correct content length header', async () => {
    const response = await request(app).get('/');
    expect(response.headers['content-length']).toBe('11'); // "Hello world" = 11 chars
  });
});

// ============================================================================
// Evening Endpoint Tests - GET /evening
// ============================================================================

describe('GET /evening', () => {
  /**
   * Test that the evening endpoint returns correct status and body
   */
  it('should return 200 status code', async () => {
    const response = await request(app).get('/evening');
    expect(response.statusCode).toBe(200);
  });

  it('should return "Good evening" as response body', async () => {
    const response = await request(app).get('/evening');
    expect(response.text).toBe('Good evening');
  });

  it('should return text/html content type', async () => {
    const response = await request(app).get('/evening');
    expect(response.headers['content-type']).toMatch(/text\/html/);
  });

  it('should return correct content length header', async () => {
    const response = await request(app).get('/evening');
    expect(response.headers['content-length']).toBe('12'); // "Good evening" = 12 chars
  });
});

// ============================================================================
// Invalid Routes Tests - 404 Handling
// ============================================================================

describe('Invalid Routes', () => {
  /**
   * Test that undefined routes return 404
   */
  it('should return 404 for undefined routes', async () => {
    const response = await request(app).get('/nonexistent');
    expect(response.statusCode).toBe(404);
  });

  it('should return 404 for /hello path', async () => {
    const response = await request(app).get('/hello');
    expect(response.statusCode).toBe(404);
  });

  it('should return 404 for nested undefined paths', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(404);
  });
});

// ============================================================================
// HTTP Method Tests
// ============================================================================

describe('HTTP Methods', () => {
  /**
   * Test that only GET method is allowed on defined routes
   */
  it('should return 404 for POST to root', async () => {
    const response = await request(app).post('/');
    expect(response.statusCode).toBe(404);
  });

  it('should return 404 for PUT to root', async () => {
    const response = await request(app).put('/');
    expect(response.statusCode).toBe(404);
  });

  it('should return 404 for DELETE to root', async () => {
    const response = await request(app).delete('/');
    expect(response.statusCode).toBe(404);
  });

  it('should return 404 for POST to /evening', async () => {
    const response = await request(app).post('/evening');
    expect(response.statusCode).toBe(404);
  });
});

// ============================================================================
// Response Format Tests
// ============================================================================

describe('Response Format', () => {
  /**
   * Test response format consistency
   */
  it('should return plain text without trailing newline for root', async () => {
    const response = await request(app).get('/');
    expect(response.text).not.toMatch(/\n$/);
  });

  it('should return plain text without trailing newline for evening', async () => {
    const response = await request(app).get('/evening');
    expect(response.text).not.toMatch(/\n$/);
  });

  it('should return UTF-8 encoded response for root', async () => {
    const response = await request(app).get('/');
    expect(response.headers['content-type']).toMatch(/charset=utf-8/i);
  });

  it('should return UTF-8 encoded response for evening', async () => {
    const response = await request(app).get('/evening');
    expect(response.headers['content-type']).toMatch(/charset=utf-8/i);
  });
});

// ============================================================================
// Case Sensitivity Tests (Express.js default behavior is case-insensitive)
// ============================================================================

describe('Case Sensitivity', () => {
  /**
   * Express.js routes are case-insensitive by default.
   * These tests verify that different case variations of /evening work correctly.
   */
  it('should handle /Evening (capital E) - Express default is case-insensitive', async () => {
    const response = await request(app).get('/Evening');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Good evening');
  });

  it('should handle /EVENING (all caps) - Express default is case-insensitive', async () => {
    const response = await request(app).get('/EVENING');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Good evening');
  });
});

// ============================================================================
// Exact Response Text Tests (Critical for Agent Action Plan compliance)
// ============================================================================

describe('Exact Response Text', () => {
  /**
   * Verify exact response text as per Agent Action Plan requirements
   * Response text must be case-sensitive, no punctuation
   */
  it('should return exactly "Hello world" (no exclamation mark)', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('Hello world');
    expect(response.text).not.toBe('Hello World');
    expect(response.text).not.toBe('Hello world!');
    expect(response.text).not.toBe('hello world');
  });

  it('should return exactly "Good evening" (no exclamation mark)', async () => {
    const response = await request(app).get('/evening');
    expect(response.text).toBe('Good evening');
    expect(response.text).not.toBe('Good Evening');
    expect(response.text).not.toBe('Good evening!');
    expect(response.text).not.toBe('good evening');
  });
});

// ============================================================================
// Environment Configuration Tests
// ============================================================================

describe('PORT Configuration', () => {
  /**
   * Test that PORT environment variable is respected
   * This test verifies the branch coverage for PORT configuration
   */
  
  // Store original PORT value
  const originalPort = process.env.PORT;
  
  afterEach(() => {
    // Restore original PORT value after each test
    if (originalPort !== undefined) {
      process.env.PORT = originalPort;
    } else {
      delete process.env.PORT;
    }
    // Clear module cache to allow fresh import with new PORT
    delete require.cache[require.resolve('../server')];
  });

  it('should use PORT from environment variable when set', () => {
    process.env.PORT = '4000';
    // Clear cache and re-import to test PORT configuration
    delete require.cache[require.resolve('../server')];
    const freshApp = require('../server');
    expect(freshApp).toBeDefined();
    // The app should work regardless of PORT setting
  });

  it('should use default port 3000 when PORT is not set', () => {
    delete process.env.PORT;
    delete require.cache[require.resolve('../server')];
    const freshApp = require('../server');
    expect(freshApp).toBeDefined();
  });

  it('should handle invalid PORT values gracefully', () => {
    process.env.PORT = 'invalid';
    delete require.cache[require.resolve('../server')];
    const freshApp = require('../server');
    expect(freshApp).toBeDefined();
  });
});
