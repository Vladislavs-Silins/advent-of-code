import * as puzzleTransform from "../../../utils/puzzle-transform";
import { findContainingBags, getInput, solution } from "./";
const mockPuzzleTransform = jest.spyOn(puzzleTransform, "puzzleTransform");
const MOCKED_RULES = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
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
      const expectedResult = 233;
      expect(result).toEqual(expectedResult);
    });
  });
  describe("findContainingBags()", () => {
    it("should return array of bags", async () => {
      const bag = "";
      mockPuzzleTransform.mockReturnValue(MOCKED_RULES);
      const result = findContainingBags(bag);

      expect(Array.isArray(result)).toBe(true);
      expect(typeof result[0]).toBe("string");
    });
    it("should return bags, able to contain a shiny gold bag", async () => {
      const bag = "shiny gold";
      mockPuzzleTransform.mockReturnValue(MOCKED_RULES);
      const result = findContainingBags(bag);
      const expectedResult = [
        "bright white",
        "muted yellow",
        "dark orange",
        "light red",
      ];
      expect(result.sort).toEqual(expectedResult.sort);
    });
  });
});
