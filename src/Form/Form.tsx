import React, { useReducer } from 'react';
import { formReducer, defaultState } from '../reducer';
import { setValue, Values, setError } from '../actions';
import { validateRequired, validateMinMax, validateCapitalLetter, validateLatinLetters } from '../validation/validation';
import FormPresentation from './FormPresentation';

const validateName = (value: string): string => {
  return validateRequired(value) || validateMinMax(2, 10)(value) ||
    validateCapitalLetter(value) || validateLatinLetters(value);
}

const validatePassport = (value: string): string => {
  return validateRequired(value) || validateMinMax(6, 9)(value);
}

type Validation = (value: string) => string;

type FieldElement = HTMLInputElement | HTMLSelectElement;

const Form: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, defaultState);
  const { values, errors } = state;

  const handleFiledChange = <T extends FieldElement>(
    value: string,
    fieldName: keyof Values
  ) => {
    dispatch(setValue(fieldName, value || ''));
  }

  const handleFiledTouch = <T extends FieldElement, V>(
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
      validateName={validateName}
      validatePassport={validatePassport}
      validateSelectFields={validateRequired}
      values={values}
    />
  );
}

export default Form;
