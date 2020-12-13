import { State } from "../types";

export function isState(arg: any): arg is State {
  try {
    return (
      typeof arg?.index === "number" && typeof arg?.accumulator === "number"
    );
  } catch (e) {
    return false;
  }
}
