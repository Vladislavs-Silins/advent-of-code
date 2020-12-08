import { getInput, readGroups, solution } from "./";

describe("puzzle", () => {
  describe("solution()", () => {
    it("should return number", async () => {
      const result = solution();
      expect(typeof result).toBe("number");
    });
    it("should return right answer", async () => {
      const result = solution();
      const expectedResult = 3430;
      expect(result).toEqual(expectedResult);
    });
  });
  describe("readGroups()", () => {
    it("should return array of answers", async () => {
      const result = readGroups(getInput());

      expect(Array.isArray(result)).toBe(true);
      expect(typeof result[0]).toBe("string");
    });
    it("should return right array", async () => {
      const result = readGroups(getInput());

      // expect(result).toEqual([""]);
    });
  });
});
