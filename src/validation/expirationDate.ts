import { expirationError, expirationEarlierThanDOBError, maxExpirationDate } from "./errorMessages";
import { yearsPassportIsValid, minYearsToGetPassport } from "./passportValidationRules";
import { parseDate } from "./dateFormat";

export const validateExpirationDate = (dateOfBirth: string, currentDate: string) =>
  (expirationDate: string): string => {
    return (parseDate(expirationDate) > parseDate(currentDate) ? '' : expirationError) ||
      (parseDate(expirationDate) > parseDate(dateOfBirth).add(minYearsToGetPassport, 'y') ? '' : expirationEarlierThanDOBError) ||
      (parseDate(expirationDate) <= parseDate(currentDate).add(yearsPassportIsValid, 'y')  ? '' : maxExpirationDate);
  }
