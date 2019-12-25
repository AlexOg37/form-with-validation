import moment from "moment";
import { expirationError, expirationEarlierThanDOBError, maxExpirationDate } from "./errorMessages";
import { yearsPassportIsValid } from "./passportValidationRules";

export const validateExpirationDate = (dateOfBirth: string, currentDate: string) =>
  (expirationDate: string): string => {
    return (moment(expirationDate) > moment(currentDate) ? '' : expirationError) ||
      (moment(expirationDate) > moment(dateOfBirth).add(yearsPassportIsValid, 'y') ? '' : expirationEarlierThanDOBError) ||
      (moment(expirationDate) <= moment(currentDate).add(yearsPassportIsValid, 'y')  ? '' : maxExpirationDate);
  }
