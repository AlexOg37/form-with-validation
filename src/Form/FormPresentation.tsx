import React from 'react';
import { TextInput } from '../TextInput/TextInput';
import { formData, sexOptions } from './formData';
import { SelectField } from '../Select/SelectField';
import { countries } from './countries';
import { nationalities } from './nationalities';
import { Values, Errors } from '../actions';

export type Validation = (value: string) => string;

type Props = {
  errors: Errors;
  isFormValid: boolean;
  handleFiledChange: (value: string, fieldName: keyof Values) => void;
  handleFiledTouch: (fieldName: keyof Values, validation: Validation) => void;
  validateName: Validation;
  validateExpirationDate: Validation;
  validateDOBField: Validation;
  validatePassport: Validation;
  validateSelectFields: Validation;
  values: Values;
}

const FormPresentation: React.FC<Props> = ({
  errors,
  isFormValid,
  handleFiledChange,
  handleFiledTouch,
  validateExpirationDate,
  validateDOBField,
  validateName,
  validatePassport,
  validateSelectFields,
  values
}) => {
  return (
    <>
      <TextInput
        label={formData.nameLabel}
        name='first-name'
        value={values.name}
        onChange={e => handleFiledChange(e.currentTarget.value, 'name')}
        onBlur={e => handleFiledTouch('name', validateName)}
        error={errors.name}
      />
      <TextInput
        label={formData.surnameLabel}
        name='last-name'
        value={values.surname}
        onChange={e => handleFiledChange(e.currentTarget.value, 'surname')}
        onBlur={e => handleFiledTouch('surname', validateName)}
        error={errors.surname}
      />
      <TextInput
        label={formData.passportNumber}
        name='passport'
        value={values.passport}
        onChange={e => handleFiledChange(e.currentTarget.value, 'passport')}
        onBlur={e => handleFiledTouch('passport', validatePassport)}
        error={errors.passport}
      />
      <SelectField
        label={formData.issuingCountry}
        name='country'
        value={values.country}
        onChange={value => handleFiledChange(value, 'country')}
        onBlur={() => handleFiledTouch('country', validateSelectFields)}
        options={countries}
        error={errors.country}
      />
      <SelectField
        label={formData.nationality}
        name='nationality'
        value={values.nationality}
        onChange={value => handleFiledChange(value, 'nationality')}
        onBlur={() => handleFiledTouch('nationality', validateSelectFields)}
        options={nationalities}
        error={errors.nationality}
      />
      <SelectField
        label={formData.sex}
        name='sex'
        value={values.sex}
        onChange={value => handleFiledChange(value, 'sex')}
        onBlur={() => handleFiledTouch('sex', validateSelectFields)}
        options={sexOptions}
        error={errors.sex}
      />
      <TextInput
        label={formData.dateOfBirth}
        name='date-of-birth'
        value={values.dateOfBirth}
        onChange={e => handleFiledChange(e.currentTarget.value, 'dateOfBirth')}
        onBlur={e => handleFiledTouch('dateOfBirth', validateDOBField)}
        error={errors.dateOfBirth}
      />
      <TextInput
        label={formData.passportExpirationDate}
        name='passport-expiration'
        value={values.passportExpiration}
        onChange={e => handleFiledChange(e.currentTarget.value, 'passportExpiration')}
        onBlur={e => handleFiledTouch('passportExpiration', validateExpirationDate)}
        error={errors.passportExpiration}
        disabled={errors.dateOfBirth !== ''}
      />
      <button type='submit' disabled={!isFormValid}>{formData.submitButton}</button>
    </>
  );
}

export default FormPresentation;
