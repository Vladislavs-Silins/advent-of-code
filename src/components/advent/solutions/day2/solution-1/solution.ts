/**
Advent of Code[About][Events][Shop][Settings][Log Out]Vlad Silin 2*
       y(2020)[Calendar][AoC++][Sponsors][Leaderboard][Stats]
Our sponsors help make Advent of Code possible:
GitHub - We're hiring engineers to make GitHub fast. Interested? Email fast@github.com with details of exceptional performance work you've done in the past.
--- Day 2: Password Philosophy ---
Your flight departs in a few days from the coastal airport; the easiest way down to the coast from here is via toboggan.

The shopkeeper at the North Pole Toboggan Rental Shop is having a bad day. "Something's wrong with our computers; we can't log in!" You ask if you can take a look.

Their password database seems to be a little corrupted: some of the passwords wouldn't have been allowed by the Official Toboggan Corporate Policy that was in effect when they were chosen.

To try to debug the problem, they have created a list (your puzzle input) of passwords (according to the corrupted database) and the corporate policy when that password was set.

For example, suppose you have the following list:

1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
Each line gives the password policy and then the password. The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid. For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.

In the above example, 2 passwords are valid. The middle password, cdefg, is not; it contains no instances of b, but needs at least 1. The first and third passwords are valid: they contain one a or nine c, both within the limits of their respective policies.

How many passwords are valid according to their policies?

To begin, get your puzzle input.

Answer:


You can also [Share] this puzzle.
 */

import raw from "raw.macro";
import { puzzleTransform } from "../../../utils/puzzle-transform";
import { toNumber, isNumber } from "lodash";
interface PasswordInfo {
  min: number;
  max: number;
  letter: string;
  password: string;
}
const parser = (data: string): PasswordInfo => {
  const [range, rawLetter, password] = data.split(" ");
  const [min, max] = range.split("-");
  const [letter] = rawLetter.split(":");
  return {
    min: toNumber(min),
    max: toNumber(max),
    letter,
    password,
  };
};
export const solution = (): number => {
  const pairsOfDifferencesAndResults: Map<number, number> = new Map();
  const input = puzzleTransform(raw("./puzzle.txt")).map((item) =>
    parser(item)
  );
  for (const checkedPassword of input) {
    const { min, max, letter, password } = checkedPassword;
    const letterInPasswordCount = password.split(letter).length - 1;
    if (letterInPasswordCount >= min && letterInPasswordCount <= max) {
      console.log(checkedPassword);
    }
  }
  return 0;
};
