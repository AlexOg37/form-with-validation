import React, { useReducer } from 'react';
import { TextInput } from '../TextInput/TextInput';
import { formReducer, defaultState } from '../reducer';
import { setValue, Values, setError } from '../actions';
import { validateRequired, validateMinMax, validateCapitalLetter, validateLatinLetters } from '../validation/validation';
import { formData } from './formData';

const validateName = (value: string): string | undefined => {
  return validateRequired(value) || validateMinMax(2, 10)(value) ||
    validateCapitalLetter(value) || validateLatinLetters(value);
}

const Form: React.FC = () => {
  const [state, dispatch] = useReducer(formReducer, defaultState);
  const { values, errors } = state;

  const handleTextFiledChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    dispatch(setValue(name as keyof Values, value));
  }

  const handleTextFiledTouch = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const error = validateName(value || '') || '';
    dispatch(setError(name as keyof Values, error));
  }
  
  const isFormValid = (Object.keys(values) as Array<keyof typeof values>)
    .every(k => errors[k] === '');

  const { nameLabel, surnameLabel, submitButton } = formData;
  return (
    <>
      <TextInput
        label={nameLabel}
        name='name'
        value={values.name}
        onChange={handleTextFiledChange}
        onBlur={handleTextFiledTouch}
        error={errors.name}
      />
      <TextInput
        label={surnameLabel}
        name='surname'
        value={values.surname}
        onChange={handleTextFiledChange}
        onBlur={handleTextFiledTouch}
        error={errors.surname}
      />
      <button type='submit' disabled={!isFormValid}>{submitButton}</button>
    </>
  );
}

export default Form;
