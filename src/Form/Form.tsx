import React, { useReducer } from 'react';
import { formReducer, defaultState } from '../formReducer';
import { setValue, Values, setError, resetForm } from '../actions';
import {
  validateRequired,
  validateDOBField,
  getExpirationFieldValidation,
  validateName,
  validatePassport,
} from '../validation/validation';
import FormPresentation, { Validation } from './FormPresentation';

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

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    alert('Form submitted!');
    dispatch(resetForm());
  }
  
  const isFormValid = (Object.keys(values) as Array<keyof typeof values>)
    .every(k => errors[k] === '');

  return (
    <FormPresentation
      errors={errors}
      handleFiledChange={handleFiledChange}
      handleFiledTouch={handleFiledTouch}
      handleFormSubmit={handleFormSubmit}
      isFormValid={isFormValid}
      validateDOBField={validateDOBField}
      validateExpirationDate={getExpirationFieldValidation(values.dateOfBirth)}
      validateName={validateName}
      validatePassport={validatePassport}
      validateSelectFields={validateRequired}
      values={values}
    />
  );
}

export default Form;
