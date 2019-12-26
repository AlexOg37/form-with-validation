import styled from 'styled-components';

const getInputBorderColor = (error: string | undefined): string => {
  if (typeof error === 'undefined') {
    return 'border-color: grey;';
  }
  if (error === '') {
    return 'border-color: green;';
  }
  return 'border-color: red;';
}

export const FormFieldWrapper = styled.div<{ error: string | undefined; disabled: boolean; }>`
  display: flex;
  flex-direction: column;
  input, select {
    border-width: 2px;
    border-style: solid;
    ${props => getInputBorderColor(props.error)}
    ${props => props.disabled && 'background: #e9e9e9; border-color: lightgrey; cursor: not-allowed;'}
    border-radius: 4px;
    line-height: 20px;
    padding: 6px 8px;
    max-width: 264px;
    font-size: 14px;
    margin: 4px 0;
  }
  select {
    height: 36px;
    max-width: 284px;
  }
  .error {
    font-size: 11px;
    color: red;
  }
`;
