import {
  requiredMessage,
  wrongLengthMessage,
  nonCapitalMessage,
  latinLettersMessage,
  dateFormatError
} from "./errorMessages";
import moment from 'moment';
import { supportedDateFormat } from "./dateFormat";

export const validateRequired = <T>(value: T): string => {
  return !value ? requiredMessage : '';
}

export const validateMinMax = (min: number, max: number) =>
  (value: string): string => {
    return (value.length < min || value.length > max) ? wrongLengthMessage : '';
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
  const isDateValid = moment(date, supportedDateFormat, true).isValid();
  return isDateValid ? '' : dateFormatError;
}

const getCurrentAgeByDOB = (dob: string): number =>
  moment().year() - moment(dob, supportedDateFormat, true).year();

export const validateMinAge = (minAge: number, minAgeError: string) =>
  (dateOfBirth: string): string =>
    getCurrentAgeByDOB(dateOfBirth) >= minAge ? '' : minAgeError;

export   const validateMaxAge = (maxAge: number, maxAgeError: string) =>
  (dateOfBirth: string): string =>
    getCurrentAgeByDOB(dateOfBirth) < maxAge ? '' : maxAgeError;
