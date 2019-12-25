import { 
  validateRequired,
  validateMinMax,
  validateCapitalLetter,
  validateLatinLetters,
  validateDate
} from "./validation";
import {
  requiredMessage,
  wrongLengthMessage,
  nonCapitalMessage,
  latinLettersMessage,
  dateFormatError
} from "./errorMessages";

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

describe('validateDate', () => {
  it('validates date with dd/mm/yyyy format', () => {
    const correctDateFormat = '29/02/2020';
    expect(validateDate(correctDateFormat)).toBe('');
  });

  it('returns error for date with wrong delimiters', () => {
    const dateWithSpaces = '01 02 2014';
    expect(validateDate(dateWithSpaces)).toBe(dateFormatError);
  });

  it('returns error for 29th of Feb in non leap year', () => {
    const wrongDate = '29/02/2014';
    expect(validateDate(wrongDate)).toBe(dateFormatError);
  });

  it('returns error for 30th of Feb in leap year', () => {
    const wrongDate = '30/02/2016';
    expect(validateDate(wrongDate)).toBe(dateFormatError);
  });

  it("returns error for month that doesn't exits", () => {
    const wrongDate = '30/13/2016';
    expect(validateDate(wrongDate)).toBe(dateFormatError);
  });
});
