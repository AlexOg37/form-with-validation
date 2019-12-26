import React from 'react';
import { TextInput } from '../TextInput/TextInput';
import { formLabels } from './formLabels';
import { SelectField } from '../Select/SelectField';
import { countries } from './countries';
import { nationalities } from './nationalities';
import { Values, Errors } from '../actions';
import styled from 'styled-components';
import { Required } from './Required';
import { sexOptions } from './sexOptions';
import { disabledExpirationDate } from '../validation/errorMessages';

export type Validation = (value: string) => string;

const FormWrapper = styled.form`
  max-width: 600px;
  display: flex;
  align-content: center;
  flex-direction: column;
  margin: auto;
  padding: 20px;
  border: 1px solid;
  .submit {
    max-width: 300px;
    width: 100%;
    margin: auto;
    margin-top: 20px;
    height: 30px;
    border-radius: 4px;
  }
`;

type Props = {
  errors: Errors;
  isFormValid: boolean;
  handleFiledChange: (value: string, fieldName: keyof Values) => void;
  handleFiledTouch: (fieldName: keyof Values, validation: Validation) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
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
  handleFormSubmit,
  validateExpirationDate,
  validateDOBField,
  validateName,
  validatePassport,
  validateSelectFields,
  values
}) => {
  return (
    <FormWrapper onSubmit={handleFormSubmit}>
      <TextInput
        label={formLabels.nameLabel}
        name='first-name'
        required={true}
        value={values.name}
        onChange={e => handleFiledChange(e.currentTarget.value, 'name')}
        onBlur={e => handleFiledTouch('name', validateName)}
        error={errors.name}
      />
      <TextInput
        label={formLabels.surnameLabel}
        name='last-name'
        required={true}
        value={values.surname}
        onChange={e => handleFiledChange(e.currentTarget.value, 'surname')}
        onBlur={e => handleFiledTouch('surname', validateName)}
        error={errors.surname}
      />
      <TextInput
        label={formLabels.passportNumber}
        name='passport'
        required={true}
        value={values.passport}
        onChange={e => handleFiledChange(e.currentTarget.value, 'passport')}
        onBlur={e => handleFiledTouch('passport', validatePassport)}
        error={errors.passport}
      />
      <SelectField
        label={formLabels.issuingCountry}
        name='country'
        required={true}
        value={values.country}
        onChange={value => handleFiledChange(value, 'country')}
        onBlur={() => handleFiledTouch('country', validateSelectFields)}
        options={countries}
        error={errors.country}
      />
      <SelectField
        label={formLabels.nationality}
        name='nationality'
        required={true}
        value={values.nationality}
        onChange={value => handleFiledChange(value, 'nationality')}
        onBlur={() => handleFiledTouch('nationality', validateSelectFields)}
        options={nationalities}
        error={errors.nationality}
      />
      <SelectField
        label={formLabels.sex}
        name='sex'
        required={true}
        value={values.sex}
        onChange={value => handleFiledChange(value, 'sex')}
        onBlur={() => handleFiledTouch('sex', validateSelectFields)}
        options={sexOptions}
        error={errors.sex}
      />
      <TextInput
        label={formLabels.dateOfBirth}
        name='date-of-birth'
        required={true}
        value={values.dateOfBirth}
        onChange={e => handleFiledChange(e.currentTarget.value, 'dateOfBirth')}
        onBlur={e => handleFiledTouch('dateOfBirth', validateDOBField)}
        error={errors.dateOfBirth}
      />
      <TextInput
        label={formLabels.passportExpirationDate}
        name='passport-expiration'
        required={true}
        value={values.passportExpiration}
        onChange={e => handleFiledChange(e.currentTarget.value, 'passportExpiration')}
        onBlur={e => handleFiledTouch('passportExpiration', validateExpirationDate)}
        error={errors.passportExpiration}
        disabled={errors.dateOfBirth !== ''}
        disabledLabel={disabledExpirationDate}
      />
      <Required> - is required field</Required>
      <button className='submit' type='submit' disabled={!isFormValid}>{formLabels.submitButton}</button>
    </FormWrapper>
  );
}

export default FormPresentation;
