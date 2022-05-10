module.exports = {
  displayName: 'api-shared-services-prisma-data-access',
  preset: '../../../../../../jest.preset.ts',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../../../../coverage/libs/api/shared/services/prisma/data-access',
};
