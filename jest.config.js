module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'jest-environment-jsdom',
  testRegex: '(/__tests__/.*|(\\.|/)(test))\\.[jt]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>[/\\\\](node_modules|.next)[/\\\\]',
    '<rootDir>/.jest/test-utils.tsx',
    '<rootDir>/__mocks__/*',
    '<rootDir>/src/mocks/*', // Ignorando mocks
    '<rootDir>/src/tests/*', // Ignorando testes não relacionados
  ],
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  watchPlugins: ['jest-watch-typeahead/filename'],
  collectCoverage: false,
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  coverageReporters: ['json', 'html'],
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.*', // Foca apenas nos componentes
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!<rootDir>/src/components/**/*.stories.*',
    '!<rootDir>/src/pages/_app.tsx',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': `<rootDir>/__mocks__/fileMock.js`,
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/lib(.*)$': '<rootDir>/src/lib$1',
    '^@/hooks(.*)$': '<rootDir>/hooks$1',
    '^@/mocks(.*)$': '<rootDir>/__mocks__$1',
    '^@/tests(.*)$': '<rootDir>/.jest$1',
  },
};
