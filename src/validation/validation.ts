import { requiredMessage } from "./errorMessages";

export function validateRequired<T>(value: T): string | undefined {
  return !value ? requiredMessage : undefined;
}

export const validateMinMax = (min: number, max: number) => (value: string): string | undefined => {
  return value.length < min || value.length > max ? 'Wrong length' : undefined;
}