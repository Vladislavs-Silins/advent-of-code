/**
 * The first half of this puzzle is complete! It provides one gold star: *
 --- Part Two ---

 The line is moving more quickly now, but you overhear airport security talking about how passports with invalid data are getting through. Better add some data validation, quick!

 You can continue to ignore the cid field, but each other field has strict rules about what values are valid for automatic validation:

 byr (Birth Year) - four digits; at least 1920 and at most 2002.
 iyr (Issue Year) - four digits; at least 2010 and at most 2020.
 eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
 hgt (Height) - a number followed by either cm or in:
 If cm, the number must be at least 150 and at most 193.
 If in, the number must be at least 59 and at most 76.
 hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
 ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
 pid (Passport ID) - a nine-digit number, including leading zeroes.
 cid (Country ID) - ignored, missing or not.

 Your job is to count the passports where all required fields are both present and valid according to the above rules. Here are some example values:

 byr valid:   2002
 byr invalid: 2003

 hgt valid:   60in
 hgt valid:   190cm
 hgt invalid: 190in
 hgt invalid: 190

 hcl valid:   #123abc
 hcl invalid: #123abz
 hcl invalid: 123abc

 ecl valid:   brn
 ecl invalid: wat

 pid valid:   000000001
 pid invalid: 0123456789

 Here are some invalid passports:

 eyr:1972 cid:100
 hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

 iyr:2019
 hcl:#602927 eyr:1967 hgt:170cm
 ecl:grn pid:012533040 byr:1946

 hcl:dab227 iyr:2012
 ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

 hgt:59cm ecl:zzz
 eyr:2038 hcl:74454a iyr:2023
 pid:3556412378 byr:2007

 Here are some valid passports:

 pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
 hcl:#623a2f

 eyr:2029 ecl:blu cid:129 byr:1989
 iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

 hcl:#888785
 hgt:164cm byr:2001 iyr:2015 cid:88
 pid:545766238 ecl:hzl
 eyr:2022

 iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719

 Count the number of valid passports - those that have all required fields and valid values. Continue to treat cid as optional. In your batch file, how many passports are valid?

 */

import raw from 'raw.macro';
import { puzzleTransform } from '../../../utils/puzzle-transform';
import { isEmpty, keys, omit, xor, toNumber } from 'lodash';

type DocumentField = 'byr' | 'iyr' | 'eyr' | 'hgt' | 'hcl' | 'ecl' | 'pid' | 'cid';

type Document = {
  [key in DocumentField]?: string;
}
const FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
const VALIDATOR = {
  byr: (data: string) => {
    try {
      const value = toNumber(data);
      const hasFourDigits = data.length === 4;
      const isInInterval = value >= 1920 && value <= 2002;
      return hasFourDigits && isInInterval;
    } catch (e) {
      return false;
    }
  },
  iyr: (data: string) => {
    try {
      const value = toNumber(data);
      const hasFourDigits = data.length === 4;
      const isInInterval = value >= 2010 && value <= 2020;
      return hasFourDigits && isInInterval;
    } catch (e) {
      return false;
    }
  },
  eyr: (data: string) => {
    try {
      const value = toNumber(data);
      const hasFourDigits = data.length === 4;
      const isInInterval = value >= 2020 && value <= 2030;
      return hasFourDigits && isInInterval;
    } catch (e) {
      return false;
    }
  },
  hgt: (data: string) => {
    try {
      const measure = data.slice(-2);
      const value = toNumber(data.slice(0, -2));
      const isCmInInterval = measure === 'cm' && value >= 150 && value <= 193;
      const isInInInterval = measure === 'in' && value >= 59 && value <= 76;
      return isCmInInterval && isInInInterval;
    } catch (e) {
      return false;
    }
  },
  hcl: (data: string) => {
    try {
      return /^#[0-9a-f]{6}$/.test(data);
    } catch (e) {
      return false;
    }
  }
};

const parser = (input: string[]): Document[] => {
  const documentList: Document[] = [];
  let document: Document = {};

  input.forEach((line: string) => {
    if (isEmpty(line.trim())) {
      documentList.push(document);
      document = {};
      return;
    }
    const parsedLine = line.split(' ');
    const parsedObject = parsedLine.reduce((partOfDocument: Document, token: string, index: number) => {
      const [key, value] = token.split(':');
      return { ...partOfDocument, [key]: value };
    }, {});
    document = { ...document, ...parsedObject };
  });
  return documentList;
};

export const solution = (): number => {
  const input = puzzleTransform(raw('./puzzle.txt'));
  const documents = parser(input);
  console.log(documents);
  let count = 0;
  documents.forEach((item: Document) => {
    const keyList = keys(omit(item, 'cid'));
    const result = xor(keyList, FIELDS);
    // console.log(keyList, result);
    if (isEmpty(result)) {
      count++;
    }
  });
  return count;
};
