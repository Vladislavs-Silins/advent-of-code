/**
 The first half of this puzzle is complete! It provides one gold star: *
--- Part Two ---

Ding! The "fasten seat belt" signs have turned on. Time to find your seat.

It's a completely full flight, so your seat should be the only missing boarding pass in your list. However, there's a catch: some of the seats at the very front and back of the plane don't exist on this aircraft, so they'll be missing from your list as well.

Your seat wasn't at the very front or back, though; the seats with IDs +1 and -1 from yours will be in your list.

What is the ID of your seat?

 */

import raw from "raw.macro";
import { puzzleTransform } from "../../../utils/puzzle-transform";
import { first, last, toNumber, range, xor } from "lodash";

export interface Seat {
  row: number;
  column: number;
}
export const calculateSeat = (data: string): Seat => {
  const encryptedRow = data.slice(0, -3).replace(/F/g, "0").replace(/B/g, "1");
  const encryptedColumn = data.slice(-3).replace(/L/g, "0").replace(/R/g, "1");

  return {
    row: parseInt(encryptedRow, 2),
    column: parseInt(encryptedColumn, 2),
  };
};
export const calculateListOfIds = (input: string[]): number[] => {
  const ids = input
    .map((data: string) => calculateId(data))
    .sort((a, b) => b - a);
  return ids;
};
export const calculateId = (data: string): number => {
  const seat = calculateSeat(data);
  return seat.row * 8 + seat.column;
};
export const solution = (): number => {
  const input = puzzleTransform(raw("./puzzle.txt"));
  let result = 0;
  const ids = input
    .map((data: string) => calculateId(data))
    .map((id) => toNumber(id))
    .sort((a, b) => a - b);
  ids.forEach((id, index) => {
    if (id + 2 === ids[index + 1]) {
      result = id + 1;
    }
  });
  return result;
};
