import React, { useReducer } from 'react';
import { TextInput } from './TextInput';
import { formReducer, defaultState } from './reducer';
import { setValue, Values, setError } from './actions';
import { validateRequired, validateMinMax } from './validation';

const validateName = (value: string): string | undefined => {
  return validateRequired(value) || validateMinMax(5, 10)(value)
}

const App: React.FC = () => {
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
  
  const isFormValid = () => {
    const noErrors = (Object.keys(values) as Array<keyof typeof values>)
      .every(k => errors[k] === '');
    return noErrors;
  }

  return (
    <>
      <TextInput
        label='First name'
        name='name'
        value={values.name}
        onChange={handleTextFiledChange}
        onBlur={handleTextFiledTouch}
        error={errors.name}
      />
      <br/>
      <TextInput
        label='Last name'
        name='surname'
        value={values.surname}
        onChange={handleTextFiledChange}
        onBlur={handleTextFiledTouch}
        error={errors.surname}
      />
      <br/>
      <button type='submit' disabled={!isFormValid()}>Submit</button>
    </>
  );
}

export default App;
