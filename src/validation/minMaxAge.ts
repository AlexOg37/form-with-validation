import { parseDate } from "./dateFormat";

const getCurrentAgeByDOB = (dob: string): number =>
  parseDate().year() - parseDate(dob, true).year();

export const validateMinAge = (minAge: number, minAgeError: string) =>
(dateOfBirth: string): string =>
  getCurrentAgeByDOB(dateOfBirth) >= minAge ? '' : minAgeError;

export   const validateMaxAge = (maxAge: number, maxAgeError: string) =>
(dateOfBirth: string): string =>
  getCurrentAgeByDOB(dateOfBirth) < maxAge ? '' : maxAgeError;
