// __tests__/App.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App'; // Assurez-vous que le chemin est correct

describe('App', () => {
  it('renders correctly', () => {
    const { getByText } = render(<App />);
    expect(getByText('Bienvenue sur mon application de météo et de voyage :)')).toBeTruthy();
  });
});
