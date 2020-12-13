import * as puzzleTransform from "../../../utils/puzzle-transform";
import { getInput, getInstructions, solution } from "./";
import { isInstruction, isSimulation, isState } from "./guards";
import { Simulation } from "./types";
const mockPuzzleTransform = jest.spyOn(puzzleTransform, "puzzleTransform");
const MOCKED_INPUT = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`.split("\n");
const MOCKED_INPUT_FINITE = `nop +0
acc +1`.split("\n");
describe("puzzle", () => {
  describe("solution()", () => {
    it("should return number", async () => {
      mockPuzzleTransform.mockRestore();
      const result = solution();
      expect(typeof result).toBe("number");
    });
    it("should pass test", async () => {
      mockPuzzleTransform.mockReturnValue(MOCKED_INPUT);
      const result = solution();
      const expectedResult = 5;
      expect(result).toEqual(expectedResult);
    });
    it("should return right answer", async () => {
      mockPuzzleTransform.mockRestore();
      const result = solution();
      const expectedResult = 1782;
      expect(result).toEqual(expectedResult);
    });
  });
  describe("getInstructions()", () => {
    it("should return list of instructions", async () => {
      mockPuzzleTransform.mockReturnValue(MOCKED_INPUT);
      const instructions = getInstructions();
      expect(Array.isArray(instructions)).toBe(true);
      expect(isInstruction(instructions[0])).toBe(true);
    });
    it("should return list of 9 instructions", async () => {
      mockPuzzleTransform.mockReturnValue(MOCKED_INPUT);
      const instructions = getInstructions();
      expect(instructions.length).toBe(9);
    });
  });
  describe("simulation", () => {
    it("should be an entity of the Simulation class", async () => {
      mockPuzzleTransform.mockReturnValue(MOCKED_INPUT);
      const simulation = new Simulation();
      expect(isSimulation(simulation)).toBe(true);
    });
    describe("simulation.acc()", () => {
      it("should return state", async () => {
        const simulation = new Simulation();
        const acc = simulation.acc();

        expect(isState(acc)).toBe(true);
      });
      it("should increase accumulator and go to next step", async () => {
        const simulation = new Simulation();
        const acc = simulation.acc(5);

        expect(acc.accumulator).toBe(5);
        expect(acc.index).toBe(1);
        expect(simulation.getState()).toEqual(acc);
      });
      it("should decrease accumulator  and go to next step", async () => {
        const simulation = new Simulation();
        const acc = simulation.acc(-5);

        expect(acc.accumulator).toBe(-5);
        expect(acc.index).toBe(1);
        expect(simulation.getState()).toEqual(acc);
      });
    });
    describe("simulation.run()", () => {
      it("should return undefined when no instruction loaded", async () => {
        const simulation = new Simulation();
        const run = simulation.run();

        expect(run).toBeUndefined();
      });
      it("should return state", async () => {
        mockPuzzleTransform.mockReturnValue(MOCKED_INPUT);
        const simulation = new Simulation(getInstructions());
        const run = simulation.run();
        expect(isState(run)).toBe(true);
      });
      it("should pass test", async () => {
        mockPuzzleTransform.mockReturnValue(MOCKED_INPUT);
        const simulation = new Simulation(getInstructions());
        const run1 = simulation.run();
        const run2 = simulation.run();
        const run3 = simulation.run();
        const run4 = simulation.run();
        const run5 = simulation.run();
        const run6 = simulation.run();
        const run7 = simulation.run();
        expect(run1).toEqual({ accumulator: 0, index: 1 });
        expect(run2).toEqual({ accumulator: 1, index: 2 });
        expect(run3).toEqual({ accumulator: 1, index: 6 });
        expect(run4).toEqual({ accumulator: 2, index: 7 });
        expect(run5).toEqual({ accumulator: 2, index: 3 });
        expect(run6).toEqual({ accumulator: 5, index: 4 });
        expect(run7).toEqual({ accumulator: 5, index: 1 });
      });
      it("should return undefined when simulation stops", async () => {
        mockPuzzleTransform.mockReturnValue(MOCKED_INPUT_FINITE);
        const simulation = new Simulation(getInstructions());
        const run1 = simulation.run();
        const run2 = simulation.run();
        const run3 = simulation.run();

        expect(run1).toEqual({ accumulator: 0, index: 1 });
        expect(run2).toEqual({ accumulator: 1, index: 2 });
        expect(run3).toBeUndefined();
      });
    });
    describe("simulation.nop()", () => {
      it("should return state", async () => {
        const simulation = new Simulation();
        const nop = simulation.nop();
        expect(isState(nop)).toBe(true);
      });
      it("should not change accumulator", async () => {
        const simulation = new Simulation();
        const nop = simulation.nop(5);

        expect(nop.accumulator).toBe(0);
        expect(simulation.getState()).toEqual(nop);
      });
      it("should go to next step", async () => {
        const simulation = new Simulation();
        const nop = simulation.nop(5);

        expect(nop.index).toBe(1);
        expect(simulation.getState()).toEqual(nop);
      });
    });
    describe("simulation.jmp()", () => {
      it("should return state", async () => {
        const simulation = new Simulation();
        const jmp = simulation.nop();
        expect(isState(jmp)).toBe(true);
        expect(simulation.getState()).toEqual(jmp);
      });
      it("should increase index", async () => {
        const simulation = new Simulation();
        const jmp = simulation.jmp(5);

        expect(jmp.index).toBe(5);
        expect(simulation.getState()).toEqual(jmp);
      });
      it("should decrease index", async () => {
        const simulation = new Simulation();
        const jmp = simulation.jmp(-5);

        expect(jmp.index).toBe(-5);
        expect(simulation.getState()).toEqual(jmp);
      });
    });
  });
});
