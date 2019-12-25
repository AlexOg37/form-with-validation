import { supportedDateFormat } from "./dateFormat";
import { yearsPassportIsValid } from "./passportValidationRules";

export const requiredMessage = 'Required';
export const wrongLengthMessage = 'Wrong length';
export const nonCapitalMessage = 'Should start from capital letter';
export const latinLettersMessage = 'Should contains only latin letters';
export const dateFormatError = `Doesn't match ${supportedDateFormat} or this date doesn't exists`;
export const minAgeError = 'minAgeError';
export const maxAgeError = 'maxAgeError';

export const expirationError = 'Passport is expired';
export const expirationEarlierThanDOBError = `Passport expiration date can't be less than date of birth and ${yearsPassportIsValid} year(s)`;
export const maxExpirationDate = `Passport expiration date can't more than ${yearsPassportIsValid} year(s)`;