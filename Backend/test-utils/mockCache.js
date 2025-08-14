// Mock implementation of Redis cache
const mockCache = {
  data: new Map(),
  get: jest.fn().mockImplementation(async (key) => {
    return mockCache.data.get(key);
  }),
  set: jest.fn().mockImplementation(async (key, value) => {
    mockCache.data.set(key, value);
    return 'OK';
  }),
  del: jest.fn().mockImplementation(async (key) => {
    return mockCache.data.delete(key);
  })
};

module.exports = {
  mockCache
};
