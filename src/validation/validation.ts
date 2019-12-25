import {
  requiredMessage,
  wrongLengthMessage,
  nonCapitalMessage,
  latinLettersMessage
} from "./errorMessages";

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