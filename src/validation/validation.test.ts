import { 
  validateRequired,
  validateMinMax,
  validateCapitalLetter,
  validateLatinLetters,
  validateDateFormat,
} from "./validation";
import {
  requiredMessage,
  nonCapitalMessage,
  latinLettersMessage,
  dateFormatError,
  getMinLengthMessage
} from "./errorMessages";

describe('validateRequired', () => {
  it('returns error message for undefined and empty string', () => {
    expect(validateRequired('')).toBe(requiredMessage);
    expect(validateRequired(undefined)).toBe(requiredMessage);
  });
  
  it('returns empty string for non-empty string', () => {
    expect(validateRequired('non-empty string value')).toBe('');
  });
});

describe('validateMinMax', () => {
  it("returns error message for string that doesn't fit length limitations", () => {
    expect(validateMinMax(1,5)('')).toBe(getMinLengthMessage(1));
  });
  
  it("returns empty string for string that fits length limitations", () => {
    expect(validateMinMax(1,100)('test string')).toBe('');
  });
});

describe('validateCapitalLetter', () => {
  it("returns error for string that starts from non-capital letter", () => {
    const testString = 'nonCapital';
    expect(validateCapitalLetter(testString)).toBe(nonCapitalMessage);
  });
  
  it("returns empty string for string that starts from capital letter", () => {
    const testString = 'Capital';
    const testStringWithNumber = 'C2apital';
    const testStringWithTwoUppercaseLetters = 'CApital';
    expect(validateCapitalLetter(testString)).toBe('');
    expect(validateCapitalLetter(testStringWithNumber)).toBe('');
    expect(validateCapitalLetter(testStringWithTwoUppercaseLetters)).toBe('');
  });
});

describe('validateLatinLetters', () => {
  it("returns error for string that contains non-latin symbols", () => {
    const withSpace = 'with spaces';
    const withNumber = 'test1';
    expect(validateLatinLetters(withSpace)).toBe(latinLettersMessage);
    expect(validateLatinLetters(withNumber)).toBe(latinLettersMessage);
  });

  it("returns empty string for string that contains only latin symbols", () => {
    const onlyLatin = 'testString';
    expect(validateLatinLetters(onlyLatin)).toBe('');
  });
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
