import { parseDate } from "./dateFormat";
import { validateMinAge, validateMaxAge } from "./minMaxAge";

const getDOBByAge = (age: number): string => {
  const currentDate = parseDate();
  currentDate.year(currentDate.year() - age);
  
  return currentDate.format();
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
