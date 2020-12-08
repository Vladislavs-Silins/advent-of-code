import { calculateId, calculateSeat, Seat, solution } from "./";

describe("puzzle", () => {
  describe("solution()", () => {
    it("should return number", async () => {
      const result = solution();
      expect(typeof result).toBe("number");
    });
    it("should return right answer", async () => {
      const result = solution();
      const expectedResult = 871;
      expect(result).toEqual(expectedResult);
    });
  });
  describe("convertToBin()", () => {
    it("should pass test 1", async () => {
      const result = calculateSeat("FBFBBFFRLR");
      const expectedResult: Seat = { row: 44, column: 5 };
      expect(result).toEqual(expectedResult);
    });
    it("should pass test 2", async () => {
      const result = calculateSeat("BFFFBBFRRR");
      const expectedResult: Seat = { row: 70, column: 7 };
      expect(result).toEqual(expectedResult);
    });
    it("should pass test 3", async () => {
      const result = calculateSeat("FFFBBBFRRR");
      const expectedResult: Seat = { row: 14, column: 7 };
      expect(result).toEqual(expectedResult);
    });
    it("should pass test 4", async () => {
      const result = calculateSeat("BBFFBBFRLL");
      const expectedResult: Seat = { row: 102, column: 4 };
      expect(result).toEqual(expectedResult);
    });
  });
  describe("calculateId()", () => {
    it("should pass test 1", async () => {
      const result = calculateId("FBFBBFFRLR");
      const expectedResult = 357;
      expect(result).toEqual(expectedResult);
    });
    it("should pass test 2", async () => {
      const result = calculateId("BFFFBBFRRR");
      const expectedResult = 567;
      expect(result).toEqual(expectedResult);
    });
    it("should pass test 3", async () => {
      const result = calculateId("FFFBBBFRRR");
      const expectedResult = 119;
      expect(result).toEqual(expectedResult);
    });
    it("should pass test 4", async () => {
      const result = calculateId("BBFFBBFRLL");
      const expectedResult = 820;
      expect(result).toEqual(expectedResult);
    });
  });
});
