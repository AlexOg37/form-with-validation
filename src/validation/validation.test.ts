import { validateRequired, validateMinMax, validateCapitalLetter } from "./validation";
import { requiredMessage, wrongLengthMessage, nonCapitalMessage } from "./errorMessages";

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

test("validateCapitalLetter returns error for string that starts from non-capital letter", () => {
  const testString = 'nonCapital';
  expect(validateCapitalLetter(testString)).toBe(nonCapitalMessage);
});

test("validateCapitalLetter returns undefined for string that starts from capital letter", () => {
  const testString = 'Capital';
  expect(validateCapitalLetter(testString)).toBe(undefined);
});
