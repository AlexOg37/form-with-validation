import moment from "moment";
import { yearsPassportIsValid } from "./passportValidationRules";
import { validateExpirationDate } from "./expirationDate";
import { expirationError, expirationEarlierThanDOBError, maxExpirationDate } from "./errorMessages";

describe('validateExpirationDate', () => {
  it(`returns no error if expiration date is later DOB and than current date plus ${yearsPassportIsValid} year(s) but not bigger than ${yearsPassportIsValid} year(s)`, () => {
    const dateOfBirth = moment('2000-01-01').format();
    const currentDate = moment('2010-01-01').format();
    const expirationDate = moment('2020-01-01').format();
    const error = validateExpirationDate(dateOfBirth, currentDate)(expirationDate);
    expect(error).toBe('');
  });

  it(`returns error if expiration date is less than current date`, () => {
    const dateOfBirth = moment('2000-01-01').format();
    const currentDate = moment('2011-01-01').format();
    const expirationDate = moment('2011-01-01').format();
    const error = validateExpirationDate(dateOfBirth, currentDate)(expirationDate);
    expect(error).toBe(expirationError);
  });

  it(`returns error if expiration date is less than date of birth plus ${yearsPassportIsValid} year(s)`, () => {
    const dateOfBirth = moment('2001-01-01').format();
    const currentDate = moment('2010-01-01').format();
    const expirationDate = moment('2011-01-01').format();
    const error = validateExpirationDate(dateOfBirth, currentDate)(expirationDate);
    expect(error).toBe(expirationEarlierThanDOBError);
  });

  it(`returns error if expiration date is more than current date plus ${yearsPassportIsValid} year(s)`, () => {
    const dateOfBirth = moment('2000-01-01').format();
    const currentDate = moment('2010-01-01').format();
    const expirationDate = moment('2021-01-01').format();
    const error = validateExpirationDate(dateOfBirth, currentDate)(expirationDate);
    expect(error).toBe(maxExpirationDate);
  });
});
