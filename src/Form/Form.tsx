import React, { useReducer } from 'react';
import { formReducer, defaultState } from '../reducer';
import { setValue, Values, setError } from '../actions';
import { validateRequired, validateMinMax, validateCapitalLetter, validateLatinLetters, validateDateFormat, validateMinAge, validateMaxAge } from '../validation/validation';
import FormPresentation, { Validation } from './FormPresentation';
import { minAgeError, maxAgeError } from '../validation/errorMessages';

const validateName = (value: string): string => {
  return validateRequired(value) || validateMinMax(2, 10)(value) ||
    validateCapitalLetter(value) || validateLatinLetters(value);
}

const validatePassport = (value: string): string => {
  return validateRequired(value) || validateMinMax(6, 9)(value);
}

const validateDateFields = (date: string): string => {
  return validateRequired(date) || validateDateFormat(date);
}

const validateDOBField = (dob: string): string => {
  return validateDateFields(dob) || validateMinAge(18, minAgeError)(dob) ||
    validateMaxAge(65, maxAgeError)(dob);
}

// const validateExpirationDate = (dateOfBirth: string) => (expirationDate: string): string => {
//   return validateDateFields(expirationDate) ||
//     (moment(expirationDate) > moment() ? '' : 'Passport is expired') ||
//     (moment(expirationDate) > moment(dateOfBirth) ? '' : `Passport expiration date can't be earlier than date of birth`) ||
//     (moment().add(10) );
// }

const Form: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, defaultState);
  const { values, errors } = state;

  const handleFiledChange = (
    value: string,
    fieldName: keyof Values
  ) => {
    dispatch(setValue(fieldName, value || ''));
  }

  const handleFiledTouch = (
    fieldName: keyof Values,
    validation: Validation
  ) => {
    const error = validation(values[fieldName]);
    dispatch(setError(fieldName, error));
  }
  
  const isFormValid = (Object.keys(values) as Array<keyof typeof values>)
    .every(k => errors[k] === '');

  return (
    <FormPresentation
      errors={errors}
      handleFiledChange={handleFiledChange}
      handleFiledTouch={handleFiledTouch}
      isFormValid={isFormValid}
      validateDOBField={validateDOBField}
      validateExpirationDate={validateDOBField}
      validateName={validateName}
      validatePassport={validatePassport}
      validateSelectFields={validateRequired}
      values={values}
    />
  );
}

export default Form;
