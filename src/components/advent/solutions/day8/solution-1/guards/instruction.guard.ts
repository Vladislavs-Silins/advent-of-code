import { Command, Instruction, Sign } from "../types";
import { isSomeEnum } from "./enum.guard";

export function isInstruction(arg: any): arg is Instruction {
  try {
    return (
      isSomeEnum(Command)(arg.command) &&
      isSomeEnum(Sign)(arg.sign) &&
      typeof arg.value === "number"
    );
  } catch (e) {
    return false;
  }
}
