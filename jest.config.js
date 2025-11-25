/**
 * Jest Configuration for Node.js Express Server Tutorial
 * 
 * This configuration file sets up Jest testing framework for the Express.js
 * application. It configures the test environment, file patterns, coverage
 * collection, and quality thresholds.
 * 
 * Configuration follows Agent Action Plan section 0.9 Group 3 requirements
 * and section 0.11 Testing Philosophy guidelines for behavior verification
 * with minimum 80% code coverage across all metrics.
 * 
 * @see https://jestjs.io/docs/configuration
 */
module.exports = {
  /**
   * Test Environment
   * Use Node.js environment for server-side testing.
   * This ensures tests have access to Node.js globals and APIs.
   */
  testEnvironment: 'node',

  /**
   * Test File Pattern
   * Matches test files located in the test directory with .test.js extension.
   * Pattern: test folder with .test.js extension
   * Example matches: test/server.test.js, test/routes/api.test.js
   */
  testMatch: ['**/test/**/*.test.js'],

  /**
   * Coverage Report Output Directory
   * Coverage reports will be generated in the 'coverage' directory.
   * This directory should be added to .gitignore.
   */
  coverageDirectory: 'coverage',

  /**
   * Coverage Collection Configuration
   * Specifies which files should be included in coverage analysis.
   * - Include: server.js (main application file)
   * - Exclude: node_modules directory
   */
  collectCoverageFrom: [
    'server.js',
    '!node_modules/**'
  ],

  /**
   * Coverage Thresholds
   * Enforce minimum 80% coverage across all metrics as specified in
   * the Agent Action Plan. Tests will fail if coverage falls below
   * these thresholds.
   * 
   * - branches: 80% - Coverage of conditional branches (if/else, ternary)
   * - functions: 80% - Coverage of function declarations
   * - lines: 80% - Coverage of executable lines
   * - statements: 80% - Coverage of all statements
   */
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },

  /**
   * Verbose Output
   * Enable detailed test output showing individual test results.
   * Useful for understanding test execution and debugging failures.
   */
  verbose: true,

  /**
   * Test Timeout
   * Maximum time (in milliseconds) a test can run before timing out.
   * Set to 10 seconds (10000ms) to accommodate async operations
   * and HTTP request/response cycles in endpoint testing.
   */
  testTimeout: 10000,

  /**
   * Clear Mocks
   * Automatically clear mock calls, instances, and results between tests.
   * Ensures test isolation and prevents state leakage between tests.
   */
  clearMocks: true,

  /**
   * Reset Modules
   * Reset the module registry before each test.
   * Helps ensure clean state when testing modules that maintain state.
   */
  resetModules: true,

  /**
   * Detect Open Handles
   * Detect and report async operations that weren't stopped.
   * Useful for identifying tests that don't properly close server connections.
   */
  detectOpenHandles: true,

  /**
   * Force Exit
   * Force Jest to exit after all tests complete.
   * Prevents hanging when server connections aren't properly closed.
   */
  forceExit: true
};
