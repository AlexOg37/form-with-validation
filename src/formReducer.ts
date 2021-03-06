import { Values, State, Actions } from "./actions";

const defaultValues: Values = {
  name: '',
  surname: '',
  passport: '',
  country: '',
  nationality: '',
  sex: '',
  dateOfBirth: '',
  passportExpiration: '' 
}

export const defaultState: State = {
  values: defaultValues,
  errors: {},
}

export const formReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'SET-VALUE':
      const { fieldName, value } = action.payload;
      return {
        ...state,
        values: { ...state.values, [fieldName]: value } };
    case 'SET-ERROR':
      const { fieldName: errorFieldName, error } = action.payload;
      return {
        ...state,
        errors: { ...state.errors, [errorFieldName]: error } };
    case 'RESET-FORM':
      return defaultState;
    default:
      return state;
  }
}
