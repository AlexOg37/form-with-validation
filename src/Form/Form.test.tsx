import React from 'react';
import { render } from '@testing-library/react';
import Form from './Form';
import { formLabels } from './formLabels';

test('Form renders Submit button', () => {
  const { getByText } = render(<Form />);
  const submitButton = getByText(formLabels.submitButton);
  expect(submitButton).toBeInTheDocument();
});

test('Form renders First name field', () => {
  const { getByText } = render(<Form />);
  const firstNameField = getByText(`${formLabels.nameLabel}:`);
  expect(firstNameField).toBeInTheDocument();
});

test('Form renders Last name field', () => {
  const { getByText } = render(<Form />);
  const lastNameField = getByText(`${formLabels.surnameLabel}:`);
  expect(lastNameField).toBeInTheDocument();
});
