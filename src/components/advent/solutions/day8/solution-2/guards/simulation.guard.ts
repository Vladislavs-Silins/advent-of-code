import { Simulation } from "../types";

export function isSimulation(arg: any): arg is Simulation {
  try {
    return (
      typeof arg?.nop === "function" &&
      typeof arg?.jmp === "function" &&
      typeof arg?.acc === "function"
    );
  } catch (e) {
    return false;
  }
}
