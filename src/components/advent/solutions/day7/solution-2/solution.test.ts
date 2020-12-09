import * as puzzleTransform from "../../../utils/puzzle-transform";
import {
  Bag,
  countBags,
  createMapOfBags,
  findContainingBags,
  getInput,
  solution,
} from "./";
const mockPuzzleTransform = jest.spyOn(puzzleTransform, "puzzleTransform");
const MOCKED_RULES = `shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags. 
dotted black bags contain no other bags.`.split("\n");
describe("puzzle", () => {
  describe("solution()", () => {
    it("should return number", async () => {
      mockPuzzleTransform.mockRestore();
      const result = solution();
      expect(typeof result).toBe("number");
    });
    it("should return right answer", async () => {
      mockPuzzleTransform.mockRestore();
      const result = solution();
      const expectedResult = 421550;
      expect(result).toEqual(expectedResult);
    });
  });
  describe("countBags()", () => {
    it("should return number", async () => {
      mockPuzzleTransform.mockReturnValue(MOCKED_RULES);
      const bag = "shiny gold";
      const result = countBags(bag);
      expect(typeof result).toBe("number");
    });
    it("should return right answer", async () => {
      mockPuzzleTransform.mockReturnValue(MOCKED_RULES);
      const bag = "shiny gold";
      const result = countBags(bag);
      const expectedResult = 32;
      expect(result).toEqual(expectedResult);
    });
  });
  describe("createMapOfBags()", () => {
    it("should return map", async () => {
      const bag = "shiny gold";
      mockPuzzleTransform.mockReturnValue(MOCKED_RULES);
      const result = createMapOfBags();

      expect(result instanceof Map).toBe(true);
    });
    it("should return map of bags", async () => {
      mockPuzzleTransform.mockReturnValue(MOCKED_RULES);

      // faded blue bags contain 0 other bags.
      //     dotted black bags contain 0 other bags.
      //     vibrant plum bags contain 11 other bags: 5 faded blue bags and 6 dotted black bags.
      //     dark olive bags contain 7 other bags: 3 faded blue bags and 4 dotted black bags.
      const expectedResult = new Map<string, Bag[]>();
      expectedResult.set("faded blue", []);
      expectedResult.set("dotted black", []);
      expectedResult.set("vibrant plum", [
        { name: "faded blue", count: 5 },
        { name: "dotted black", count: 6 },
      ]);
      expectedResult.set("dark olive", [
        { name: "faded blue", count: 3 },
        { name: "dotted black", count: 4 },
      ]);
      const result = createMapOfBags();
      const expectedEntries = Array.from(expectedResult.entries());
      const entries = Array.from(result.entries());

      expect(entries.sort()).toMatchObject(expectedEntries.sort());
    });
  });
});
