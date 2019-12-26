import { yearsPassportIsValid, minYearsToGetPassport } from "./passportValidationRules";
import { validateExpirationDate } from "./expirationDate";
import { expirationError, expirationEarlierThanDOBError, maxExpirationDate } from "./errorMessages";
import { parseDate } from "./dateFormat";

describe('validateExpirationDate', () => {
  it(`returns no error if expiration date is > DOB + ${minYearsToGetPassport} and > current date + ${yearsPassportIsValid} year(s) but <= ${yearsPassportIsValid} year(s)`, () => {
    const dateOfBirth = parseDate('01-01-2000').format();
    const currentDate = parseDate('01-01-2010').format();
    const expirationDate = parseDate('01-01-2020').format();
    const error = validateExpirationDate(dateOfBirth, currentDate)(expirationDate);
    expect(error).toBe('');
  });

  it(`returns error if expiration date is less than current date`, () => {
    const dateOfBirth = parseDate('01-01-2000').format();
    const currentDate = parseDate('01-01-2011').format();
    const expirationDate = parseDate('01-01-2011').format();
    const error = validateExpirationDate(dateOfBirth, currentDate)(expirationDate);
    expect(error).toBe(expirationError);
  });

  it(`returns error if expiration date is less than date of birth plus ${minYearsToGetPassport} year(s)`, () => {
    const dateOfBirth = parseDate('01-01-2000').format();
    const currentDate = parseDate('01-01-2005').format();
    const expirationDate = parseDate('01-01-2006').format();
    const error = validateExpirationDate(dateOfBirth, currentDate)(expirationDate);
    expect(error).toBe(expirationEarlierThanDOBError);
  });

  it(`returns error if expiration date is more than current date plus ${yearsPassportIsValid} year(s)`, () => {
    const dateOfBirth = parseDate('01-01-2000').format();
    const currentDate = parseDate('01-01-2010').format();
    const expirationDate = parseDate('01-01-2021').format();
    const error = validateExpirationDate(dateOfBirth, currentDate)(expirationDate);
    expect(error).toBe(maxExpirationDate);
  });
});
