import {
  requiredMessage,
  wrongLengthMessage,
  nonCapitalMessage
} from "./errorMessages";

export function validateRequired<T>(value: T): string | undefined {
  return !value ? requiredMessage : undefined;
}

export const validateMinMax = (min: number, max: number) =>
  (value: string): string | undefined => {
    return (value.length < min || value.length > max) ? wrongLengthMessage : undefined;
  }

export const validateCapitalLetter = (value: string) => {
  const rule = new RegExp(/\b([A-Z])([a-z]+)?\b/gm);
  return rule.test(value) ? undefined : nonCapitalMessage;
}
