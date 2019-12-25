import {
  requiredMessage,
  wrongLengthMessage,
  nonCapitalMessage,
  latinLettersMessage,
  dateFormatError
} from "./errorMessages";
import moment from 'moment';
import { dateFormat } from "./dateFormat";

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
  const isDateValid = moment(date, dateFormat, true).isValid();
  return isDateValid ? '' : dateFormatError;
}

export const validateMinAge = (minAge: number, minAgeError: string) =>
  (dateOfBirth: string) => {
    const currentAge = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    return currentAge >= minAge ? '' : minAgeError;
  }

export   const validateMaxAge = (maxAge: number, maxAgeError: string) =>
  (dateOfBirth: string) => {
    const currentAge = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
    return currentAge < maxAge ? '' : maxAgeError;
  }
