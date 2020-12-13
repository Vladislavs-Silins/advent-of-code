import { Instruction, State } from "./type";
import { Sign } from "./sign.enum";

export class Simulation {
  protected instructions: Instruction[] = [];
  protected state: State = { index: 0, accumulator: 0 };
  public getState = () => this.state;
  public nop = (parameter = 0) => {
    this.state = { ...this.state, index: this.state.index + 1 };
    return this.state;
  };
  public jmp = (parameter = 0) => {
    this.state = { ...this.state, index: this.state.index + parameter };
    return this.state;
  };
  public acc = (parameter = 0) => {
    this.state = {
      ...this.state,
      accumulator: this.state.accumulator + parameter,
      index: this.state.index + 1,
    };
    return this.state;
  };
  protected getInstruction = (): Instruction | undefined => {
    try {
      return this.instructions[this.state.index];
    } catch (e) {
      return undefined;
    }
  };
  public run = (): State | undefined => {
    try {
      const { command, sign, value } = this.getInstruction();
      const parameter = sign === Sign.plus ? value : -value;
      return this[command](parameter);
    } catch (e) {
      return undefined;
    }
  };
  constructor(
    instructions: Instruction[] = [],
    state: State = { index: 0, accumulator: 0 }
  ) {
    this.instructions = instructions;
    this.state = state;
  }
}
