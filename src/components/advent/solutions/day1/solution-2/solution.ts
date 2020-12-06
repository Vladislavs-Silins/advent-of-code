/**
Your puzzle answer was 485739.

The first half of this puzzle is complete! It provides one gold star: *

--- Part Two ---
The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. They offer you a second one if you can find three numbers in your expense report that meet the same criteria.

Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together produces the answer, 241861950.

In your expense report, what is the product of the three entries that sum to 2020?

Answer:

 */

import raw from "raw.macro";
import { puzzleTransform } from "../../../utils/puzzle-transform";
import { toNumber, isNumber, drop } from "lodash";

const pairSearch = (numberList: number[], sum: number) => {
  const pairsOfDifferencesAndResults: Map<number, number> = new Map();

  for (const checkedNumber of numberList) {
    const result = pairsOfDifferencesAndResults.get(checkedNumber);
    if (isNumber(result)) {
      return result;
    } else {
      pairsOfDifferencesAndResults.set(
        sum - checkedNumber,
        (sum - checkedNumber) * checkedNumber
      );
    }
  }
  return 0;
};

export const solution = (): number => {
  const pairsOfDifferencesAndResults: Map<number, number> = new Map();
  const input = puzzleTransform(raw("./puzzle.txt"))
    .map((item) => toNumber(item))
    .sort((a, b) => a - b);

  console.log(input);

  for (let i = 0; i < input.length - 1; i++) {
    const currentNumber = input[i];
    const nextNumber = input[i + 1];
    if (currentNumber + nextNumber >= 2020) {
      break;
    }
    const result = pairSearch(drop(input, i + 1), 2020 - currentNumber);
    console.log(currentNumber, 2020 - currentNumber, result);
    if (result > 0) {
      return result * currentNumber;
    }
  }
  return 0;
};
