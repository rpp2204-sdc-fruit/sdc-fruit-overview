describe('SDC test suite example', () => {
  const multiply = (a, b) => a * b;

  it('Should multiply numbers', () => {
    expect(multiply(3, 3)).toEqual(9);
  });
});
