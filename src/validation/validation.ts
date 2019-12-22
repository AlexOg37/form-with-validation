import {
  requiredMessage,
  wrongLengthMessage,
  nonCapitalMessage,
  latinLettersMessage
} from "./errorMessages";

export function validateRequired<T>(value: T): string | undefined {
  return !value ? requiredMessage : undefined;
}

export const validateMinMax = (min: number, max: number) =>
  (value: string): string | undefined => {
    return (value.length < min || value.length > max) ? wrongLengthMessage : undefined;
  }

export const validateCapitalLetter = (value: string) => {
  const rule = /\b([A-Z])([a-z0-9]+)?\b/gm;
  return rule.test(value) ? undefined : nonCapitalMessage;
}

export const validateLatinLetters = (value: string) => {
  const rule = /^[a-zA-Z]+$/;
  return rule.test(value) ? undefined : latinLettersMessage;
}