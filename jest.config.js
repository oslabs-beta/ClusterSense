export default {
  projects: [
    {
      displayName: 'backend',
      testEnvironment: 'node',
      testMatch: ['**/__tests__/server.js', '**/__tests__/db.js'],
    },
    {
      displayName: 'frontend',
      testEnvironment: 'jsdom',
      testMatch: ['**/__tests__/frontend.js'],
    },
  ],
};

// preset: 'ts-jest',
// testEnvironment: 'node',
// clearMocks: true,
// moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
// transformIgnorePatterns: ['/node_modules/'],
// globals: {
//   'ts-jest': {
//     tsconfig: 'tsconfig.json',
//   },
// },
