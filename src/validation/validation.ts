import {
  requiredMessage,
  nonCapitalMessage,
  latinLettersMessage,
  dateFormatError,
  minAgeError,
  maxAgeError,
  getMinLengthMessage,
  getMaxLengthMessage
} from "./errorMessages";
import { parseDate } from "./dateFormat";
import { minAge, validateMaxAge, validateMinAge, maxAge } from "./minMaxAge";
import { validateExpirationDate } from "./expirationDate";
import { minNameLength, maxNameLength } from "./nameValidationRules";
import { minPassportIdLength, maxPassportIdLength } from "./passportValidationRules";

export const validateRequired = <T>(value: T): string => {
  return !value ? requiredMessage : '';
}

export const validateMinMax = (min: number, max: number) =>
  (value: string): string => {
    if (value.length < min) {
      return getMinLengthMessage(min);
    }
    if (value.length > max) {
      return getMaxLengthMessage(max);
    }
    return '';
  }

export const validateCapitalLetter = (value: string) => {
  const rule = /^[A-Z]/;
  return rule.test(value) ? '' : nonCapitalMessage;
}

export const validateLatinLetters = (value: string) => {
  const rule = /^[a-zA-Z]+$/;
  return rule.test(value) ? '' : latinLettersMessage;
}

export const validateDateFormat = (date: string): string => {
  const isDateValid = parseDate(date, true).isValid();
  return isDateValid ? '' : dateFormatError;
}

export const validateName = (value: string): string => {
  return validateRequired(value) || validateMinMax(minNameLength, maxNameLength)(value) ||
    validateCapitalLetter(value) || validateLatinLetters(value);
}

export const validatePassport = (value: string): string => {
  return validateRequired(value) || validateMinMax(minPassportIdLength, maxPassportIdLength)(value);
}

const validateDateFields = (date: string): string => {
  return validateRequired(date) || validateDateFormat(date);
}

export const validateDOBField = (dob: string): string => {
  return validateDateFields(dob) || validateMinAge(minAge, minAgeError)(dob) ||
    validateMaxAge(maxAge, maxAgeError)(dob);
}

export const getExpirationFieldValidation = (dob: string) =>
  (expirationDate: string) => {
    return validateDateFields(expirationDate) ||
      validateExpirationDate(dob, parseDate().format())(expirationDate);
  }
