import { validateRequired, validateMinMax } from "./validation";
import { requiredMessage, wrongLengthMessage } from "./errorMessages";

test('validateRequired returns error message for undefined and empty string', () => {
  expect(validateRequired('')).toBe(requiredMessage);
  expect(validateRequired(undefined)).toBe(requiredMessage);
});

test('validateRequired returns undefined for non-empty string', () => {
  expect(validateRequired('non-empty string value')).toBe(undefined);
});

test("validateMinMax returns error message for string that doesn't fit length limitations", () => {
  expect(validateMinMax(1,5)('')).toBe(wrongLengthMessage);
});

test("validateMinMax returns undefined for string that fits length limitations", () => {
  expect(validateMinMax(1,100)('test string')).toBe(undefined);
});
