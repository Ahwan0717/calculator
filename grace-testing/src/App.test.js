import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  expect(getByText((content, element) => {
    return element.id.toLowerCase() === 'calculator';
  })).toBeTruthy();
});

//container is the all encompassing render
//getByText accepts one callback function