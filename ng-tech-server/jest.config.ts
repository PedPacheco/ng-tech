module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/dataprovider/client/singleton.ts'],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
//   testMatch: [
//     '<rootDir>/tests/**/**/*.spec.ts',
//     '<rootDir>/tests/**/**/*.spec.tsx',
// ],
}
