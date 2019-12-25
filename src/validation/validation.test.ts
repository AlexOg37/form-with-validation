import { 
  validateRequired,
  validateMinMax,
  validateCapitalLetter,
  validateLatinLetters,
  validateDateFormat,
  validateMinAge,
  validateMaxAge
} from "./validation";
import {
  requiredMessage,
  wrongLengthMessage,
  nonCapitalMessage,
  latinLettersMessage,
  dateFormatError
} from "./errorMessages";
import moment from "moment";
import { supportedDateFormat } from "./dateFormat";

test('validateRequired returns error message for undefined and empty string', () => {
  expect(validateRequired('')).toBe(requiredMessage);
  expect(validateRequired(undefined)).toBe(requiredMessage);
});

test('validateRequired returns empty string for non-empty string', () => {
  expect(validateRequired('non-empty string value')).toBe('');
});

test("validateMinMax returns error message for string that doesn't fit length limitations", () => {
  expect(validateMinMax(1,5)('')).toBe(wrongLengthMessage);
});

test("validateMinMax returns empty string for string that fits length limitations", () => {
  expect(validateMinMax(1,100)('test string')).toBe('');
});

test("validateCapitalLetter returns error for string that starts from non-capital letter", () => {
  const testString = 'nonCapital';
  expect(validateCapitalLetter(testString)).toBe(nonCapitalMessage);
});

test("validateCapitalLetter returns empty string for string that starts from capital letter", () => {
  const testString = 'Capital';
  const testStringWithNumber = 'C2apital';
  const testStringWithTwoUppercaseLetters = 'CApital';
  expect(validateCapitalLetter(testString)).toBe('');
  expect(validateCapitalLetter(testStringWithNumber)).toBe('');
  expect(validateCapitalLetter(testStringWithTwoUppercaseLetters)).toBe('');
});

test("validateLatinLetters returns error for string that contains non-latin symbols", () => {
  const withSpace = 'with spaces';
  const withNumber = 'test1';
  expect(validateLatinLetters(withSpace)).toBe(latinLettersMessage);
  expect(validateLatinLetters(withNumber)).toBe(latinLettersMessage);
});

test("validateLatinLetters returns empty string for string that contains only latin symbols", () => {
  const onlyLatin = 'testString';
  expect(validateLatinLetters(onlyLatin)).toBe('');
});

describe('validateDateFormat', () => {
  it('validates date with dd/mm/yyyy format', () => {
    const correctDateFormat = '29/02/2020';
    expect(validateDateFormat(correctDateFormat)).toBe('');
  });

  it('returns error for date with wrong delimiters', () => {
    const dateWithSpaces = '01 02 2014';
    expect(validateDateFormat(dateWithSpaces)).toBe(dateFormatError);
  });

  it('returns error for 29th of Feb in non leap year', () => {
    const wrongDate = '29/02/2014';
    expect(validateDateFormat(wrongDate)).toBe(dateFormatError);
  });

  it('returns error for 30th of Feb in leap year', () => {
    const wrongDate = '30/02/2016';
    expect(validateDateFormat(wrongDate)).toBe(dateFormatError);
  });

  it("returns error for month that doesn't exits", () => {
    const wrongDate = '30/13/2016';
    expect(validateDateFormat(wrongDate)).toBe(dateFormatError);
  });
});

const getDOBByAge = (age: number): string => {
  const dateOfBirth = moment();
  dateOfBirth.year(dateOfBirth.year() - age);
  return dateOfBirth.format(supportedDateFormat);
}

describe('validateMinAge', () => {
  const minAgeError = 'minAgeError';
  
  it('returns empty string for age that is bigger than given min age', () => {
    const minAge = 0;
    const currentAge = minAge + 1;
    expect(validateMinAge(minAge, minAgeError)(getDOBByAge(currentAge))).toBe('');
  });

  it('returns empty string for age that is equal to given min age', () => {
    const minAge = 2;
    const currentAge = minAge;
    expect(validateMinAge(minAge, minAgeError)(getDOBByAge(currentAge))).toBe('');
  });

  it('returns error for age that is less than give min age', () => {
    const minAge = 2;
    const currentAge = minAge - 1;
    expect(validateMinAge(minAge, minAgeError)(getDOBByAge(currentAge))).toBe(minAgeError);
  });
});

describe('validateMaxAge', () => {
  const maxAgeError = 'maxAgeError';
      
  it('returns empty string for age that is less than given max age', () => {
    const maxAge = 2;
    const currentAge = maxAge - 1;
    expect(validateMaxAge(maxAge, maxAgeError)(getDOBByAge(currentAge))).toBe('');
  });

  it('returns error for age that is equal to given max age', () => {
    const maxAge = 2;
    const currentAge = maxAge;
    expect(validateMaxAge(maxAge, maxAgeError)(getDOBByAge(currentAge))).toBe(maxAgeError);
  });

  it('returns error for age that is bigger than give max age', () => {
    const maxAge = 2;
    const currentAge = maxAge + 1;
    expect(validateMaxAge(maxAge, maxAgeError)(getDOBByAge(currentAge))).toBe(maxAgeError);
  });
});
