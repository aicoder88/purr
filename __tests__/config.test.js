// Simple test to verify Jest is working with the new config
describe('Jest Configuration Test', () => {
  it('should pass a basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle ES modules', () => {
    const obj = { a: 1, b: 2 };
    const { a, b } = obj;
    expect(a).toBe(1);
    expect(b).toBe(2);
  });
});
