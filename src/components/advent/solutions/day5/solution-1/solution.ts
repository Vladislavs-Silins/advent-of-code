/**
 --- Day 4: Passport Processing ---

 You arrive at the airport only to realize that you grabbed your North Pole Credentials instead of your passport. While these documents are extremely similar, North Pole Credentials aren't issued by a country and therefore aren't actually valid documentation for travel in most of the world.

 It seems like you're not the only one having problems, though; a very long line has formed for the automatic passport scanners, and the delay could upset your travel itinerary.

 Due to some questionable network security, you realize you might be able to solve both of these problems at the same time.

 The automatic passport scanners are slow because they're having trouble detecting which passports have all required fields. The expected fields are as follows:

 byr (Birth Year)
 iyr (Issue Year)
 eyr (Expiration Year)
 hgt (Height)
 hcl (Hair Color)
 ecl (Eye Color)
 pid (Passport ID)
 cid (Country ID)

 Passport data is validated in batch files (your puzzle input). Each passport is represented as a sequence of key:value pairs separated by spaces or newlines. Passports are separated by blank lines.

 Here is an example batch file containing four passports:

 ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
 byr:1937 iyr:2017 cid:147 hgt:183cm

 iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
 hcl:#cfa07d byr:1929

 hcl:#ae17e1 iyr:2013
 eyr:2024
 ecl:brn pid:760753108 byr:1931
 hgt:179cm

 hcl:#cfa07d eyr:2025 pid:166559648
 iyr:2011 ecl:brn hgt:59in

 The first passport is valid - all eight fields are present. The second passport is invalid - it is missing hgt (the Height field).

 The third passport is interesting; the only missing field is cid, so it looks like data from North Pole Credentials, not a passport at all! Surely, nobody would mind if you made the system temporarily ignore missing cid fields. Treat this "passport" as valid.

 The fourth passport is missing two fields, cid and byr. Missing cid is fine, but missing any other field is not, so this passport is invalid.

 According to the above rules, your improved system would report 2 valid passports.

 Count the number of valid passports - those that have all required fields. Treat cid as optional. In your batch file, how many passports are valid?--- Day 5: Binary Boarding ---

 You board your plane only to discover a new problem: you dropped your boarding pass! You aren't sure which seat is yours, and all of the flight attendants are busy with the flood of people that suddenly made it through passport control.

 You write a quick program to use your phone's camera to scan all of the nearby boarding passes (your puzzle input); perhaps you can find your seat through process of elimination.

 Instead of zones or groups, this airline uses binary space partitioning to seat people. A seat might be specified like FBFBBFFRLR, where F means "front", B means "back", L means "left", and R means "right".

 The first 7 characters will either be F or B; these specify exactly one of the 128 rows on the plane (numbered 0 through 127). Each letter tells you which half of a region the given seat is in. Start with the whole list of rows; the first letter indicates whether the seat is in the front (0 through 63) or the back (64 through 127). The next letter indicates which half of that region the seat is in, and so on until you're left with exactly one row.

 For example, consider just the first seven characters of FBFBBFFRLR:

 Start by considering the whole range, rows 0 through 127.
 F means to take the lower half, keeping rows 0 through 63.
 B means to take the upper half, keeping rows 32 through 63.
 F means to take the lower half, keeping rows 32 through 47.
 B means to take the upper half, keeping rows 40 through 47.
 B keeps rows 44 through 47.
 F keeps rows 44 through 45.
 The final F keeps the lower of the two, row 44.

 The last three characters will be either L or R; these specify exactly one of the 8 columns of seats on the plane (numbered 0 through 7). The same process as above proceeds again, this time with only three steps. L means to keep the lower half, while R means to keep the upper half.

 For example, consider just the last 3 characters of FBFBBFFRLR:

 Start by considering the whole range, columns 0 through 7.
 R means to take the upper half, keeping columns 4 through 7.
 L means to take the lower half, keeping columns 4 through 5.
 The final R keeps the upper of the two, column 5.

 So, decoding FBFBBFFRLR reveals that it is the seat at row 44, column 5.

 Every seat also has a unique seat ID: multiply the row by 8, then add the column. In this example, the seat has ID 44 * 8 + 5 = 357.

 Here are some other boarding passes:

 BFFFBBFRRR: row 70, column 7, seat ID 567.
 FFFBBBFRRR: row 14, column 7, seat ID 119.
 BBFFBBFRLL: row 102, column 4, seat ID 820.

 As a sanity check, look through your list of boarding passes. What is the highest seat ID on a boarding pass?


 */

import raw from "raw.macro";
import { puzzleTransform } from "../../../utils/puzzle-transform";
import { first, toNumber } from "lodash";

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

export const calculateId = (data: string): number => {
  const seat = calculateSeat(data);
  return seat.row * 8 + seat.column;
};
export const solution = (): number => {
  const input = puzzleTransform(raw("./puzzle.txt"));
  let count = 0;
  const ids = input
    .map((data: string) => calculateId(data))
    .sort((a, b) => b - a);
  count = toNumber(first(ids));
  return count;
};
