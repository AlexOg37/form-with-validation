import React, { useReducer } from 'react';
import { TextInput } from '../TextInput/TextInput';
import { formReducer, defaultState } from '../reducer';
import { setValue, Values, setError } from '../actions';
import { validateRequired, validateMinMax, validateCapitalLetter, validateLatinLetters } from '../validation/validation';
import { formData, sexOptions } from './formData';
import { SelectField } from '../Select/SelectField';
import { countries } from './countries';
import { nationalities } from './nationalities';

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
    value: string,
    fieldName: keyof Values,
    validation: Validation
  ) => {
    const error = validation(value || '');
    dispatch(setError(fieldName, error));
  }
  
  const isFormValid = (Object.keys(values) as Array<keyof typeof values>)
    .every(k => errors[k] === '');

  return (
    <>
      <TextInput
        label={formData.nameLabel}
        name='name'
        value={values.name}
        onChange={e => handleFiledChange(e.currentTarget.value, 'name')}
        onBlur={e => handleFiledTouch(e.currentTarget.value, 'name', validateName)}
        error={errors.name}
      />
      <TextInput
        label={formData.surnameLabel}
        name='surname'
        value={values.surname}
        onChange={e => handleFiledChange(e.currentTarget.value, 'surname')}
        onBlur={e => handleFiledTouch(e.currentTarget.value, 'surname', validateName)}
        error={errors.surname}
      />
      <TextInput
        label={formData.passportNumber}
        name='passport'
        value={values.passport}
        onChange={e => handleFiledChange(e.currentTarget.value, 'passport')}
        onBlur={e => handleFiledTouch(e.currentTarget.value, 'passport', validatePassport)}
        error={errors.passport}
      />
      <SelectField
        label={formData.issuingCountry}
        name='country'
        value={values.country}
        onChange={value => handleFiledChange(value, 'country')}
        onBlur={() => handleFiledTouch(values.country, 'country', validateRequired)}
        options={countries}
        error={errors.country}
      />
      <SelectField
        label={formData.nationality}
        name='nationality'
        value={values.nationality}
        onChange={value => handleFiledChange(value, 'nationality')}
        onBlur={() => handleFiledTouch(values.nationality, 'nationality', validateRequired)}
        options={nationalities}
        error={errors.nationality}
      />
      <SelectField
        label={formData.sex}
        name='sex'
        value={values.sex}
        onChange={value => handleFiledChange(value, 'sex')}
        onBlur={() => handleFiledTouch(values.sex, 'sex', validateRequired)}
        options={sexOptions}
        error={errors.sex}
      />
      <TextInput
        label={formData.dateOfBirth}
        name='date-of-birth'
        value={values.dateOfBirth}
        onChange={e => handleFiledChange(e.currentTarget.value, 'dateOfBirth')}
        onBlur={e => handleFiledTouch(e.currentTarget.value, 'dateOfBirth', validatePassport)}
        error={errors.dateOfBirth}
      />
      <TextInput
        label={formData.dateOfBirth}
        name='passport-expiration'
        value={values.passportExpiration}
        onChange={e => handleFiledChange(e.currentTarget.value, 'passportExpiration')}
        onBlur={e => handleFiledTouch(e.currentTarget.value, 'passportExpiration', validatePassport)}
        error={errors.passportExpiration}
      />
      <button type='submit' disabled={!isFormValid}>{formData.submitButton}</button>
    </>
  );
}

export default Form;
