import { parseDate } from "./dateFormat";

export const minAge = 5;
export const maxAge = 110;

const getCurrentAgeByDOB = (dob: string): number =>
  parseDate().year() - parseDate(dob, true).year();

export const validateMinAge = (minAge: number, minAgeError: string) =>
(dateOfBirth: string): string =>
  getCurrentAgeByDOB(dateOfBirth) >= minAge ? '' : minAgeError;

export   const validateMaxAge = (maxAge: number, maxAgeError: string) =>
(dateOfBirth: string): string =>
  getCurrentAgeByDOB(dateOfBirth) < maxAge ? '' : maxAgeError;
