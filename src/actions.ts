export type Values = {
  name: string;
  surname: string;
  passport: string;
  country: string;
  nationality: string;
  sex: string;
  dateOfBirth: string;
  passportExpiration: string;
}

export type Errors = {
  [key in keyof Values]?: string;
};

export type State = {
  values: Values;
  errors: Errors;
}

type SetValueAction = {
  type: 'SET-VALUE',
  payload: { value: Values[keyof Values], fieldName: keyof Values }
}
export const setValue = <T extends keyof Values>(fieldName: T, value: Values[T]): SetValueAction => ({
  type: 'SET-VALUE',
  payload: { fieldName, value }
});

type SetErrorAction = {
  type: 'SET-ERROR',
  payload: { error: string, fieldName: keyof Values }
}
export const setError = <T extends keyof Values>(fieldName: T, error: Values[T]): SetErrorAction => ({
  type: 'SET-ERROR',
  payload: { fieldName, error }
});

type ResetFormAction = {
  type: 'RESET-FORM'
}
export const resetForm = (): ResetFormAction => ({
  type: 'RESET-FORM',
});

export type Actions = SetErrorAction | SetValueAction | ResetFormAction;
