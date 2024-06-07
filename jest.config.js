module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/infrastructure/',
    '/src/domain/dtos/',
    '/src/domain/enums/',
    '/src/domain/models/'
  ],
  modulePathIgnorePatterns: [
    '/node_modules/',
    '/src/infrastructure/',
    '/src/domain/dtos/',
    '/src/domain/enums/',
    '/src/domain/models/'
  ]
};
