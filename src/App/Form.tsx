import React, { useReducer } from 'react';
import { TextInput } from '../TextInput/TextInput';
import { formReducer, defaultState } from '../reducer';
import { setValue, Values, setError } from '../actions';
import { validateRequired, validateMinMax, validateCapitalLetter, validateLatinLetters } from '../validation/validation';
import { formData } from './formData';
import { SelectField, tempSelectOptions } from '../Select/SelectField';

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
    e: React.FormEvent<T>,
    fieldName: keyof Values
  ) => {
    dispatch(setValue(fieldName, e.currentTarget.value));
  }

  const handleFiledTouch = <T extends FieldElement, V>(
    e: React.FormEvent<T>,
    fieldName: keyof Values,
    validation: Validation
  ) => {
    const { value } = e.currentTarget;
    const error = validation(value || '');
    dispatch(setError(fieldName, error));
  }
  
  const isFormValid = (Object.keys(values) as Array<keyof typeof values>)
    .every(k => errors[k] === '');

  const { nameLabel, surnameLabel, submitButton, passportNumber } = formData;
  return (
    <>
      <TextInput
        label={nameLabel}
        name='name'
        value={values.name}
        onChange={e => handleFiledChange(e, 'name')}
        onBlur={e => handleFiledTouch(e, 'name', validateName)}
        error={errors.name}
      />
      <TextInput
        label={surnameLabel}
        name='surname'
        value={values.surname}
        onChange={e => handleFiledChange(e, 'surname')}
        onBlur={e => handleFiledTouch(e, 'surname', validateName)}
        error={errors.surname}
      />
      <TextInput
        label={passportNumber}
        name='passport'
        value={values.passport}
        onChange={e => handleFiledChange(e, 'passport')}
        onBlur={e => handleFiledTouch(e, 'passport', validatePassport)}
        error={errors.passport}
      />
      <SelectField
        label='Issuing country'
        name='country'
        value={values.country}
        onChange={value => dispatch(setValue('country', value))}
        onBlur={() => dispatch(setError('country', values.country))}
        options={tempSelectOptions}
      />
      <button type='submit' disabled={!isFormValid}>{submitButton}</button>
    </>
  );
}

export default Form;
