describe("a sample suite - ", () => {
  it("does addition correctly", () => {
    expect(2 + 2).toBe(4);
  });

  it("does multiplication correctly", () => {
    expect(2 * 3).toBe(6);
  });

  it("does division correctly", () => {
    expect(6 / 2).toBe(3);
  });

  it("runs async jobs well", async () => {
    return new Promise((acc, rej) => setTimeout(acc, 1000));
  });
});