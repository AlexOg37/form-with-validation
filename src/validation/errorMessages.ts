import { supportedDateFormat } from "./dateFormat";
import { yearsPassportIsValid, minYearsToGetPassport } from "./passportValidationRules";
import { minAge, maxAge } from "./minMaxAge";

export const requiredMessage = 'Required';
export const wrongLengthMessage = 'Wrong length';
export const nonCapitalMessage = 'Should start from capital letter';
export const latinLettersMessage = 'Should contains only latin letters';
export const dateFormatError = `Doesn't match ${supportedDateFormat} or this date doesn't exists`;
export const minAgeError = `Minimum age is ${minAge}`;
export const maxAgeError = `Max age is ${maxAge}`;

export const expirationError = 'Passport is expired';
export const expirationEarlierThanDOBError = `Passport expiration date can't be less than date of birth and ${minYearsToGetPassport} year(s)`;
export const maxExpirationDate = `Passport expiration date can't more than ${yearsPassportIsValid} year(s)`;
export const disabledExpirationDate = `Please fill in date of birth fist`;