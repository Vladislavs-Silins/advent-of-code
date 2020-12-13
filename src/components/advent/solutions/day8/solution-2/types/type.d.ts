import {Command} from "./command.enum";
import {Sign} from "./sign.enum";

export interface Instruction {
  command: Command;
  sign: Sign;
  value: number;
}
export interface State {
  index: number;
  accumulator: number;
}