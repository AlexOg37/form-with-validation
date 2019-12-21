import { validateRequired } from "./validation";
import { requiredMessage } from "./errorMessages";

test('validateRequired returns error message for undefined and empty string', () => {
  expect(validateRequired('')).toBe(requiredMessage);
  expect(validateRequired(undefined)).toBe(requiredMessage);
});

test('validateRequired returns undefined for non-empty string', () => {
  expect(validateRequired('non-empty string value')).toBe(undefined);
});