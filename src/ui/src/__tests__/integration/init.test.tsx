import React from 'react';
import { AuthScreen } from '../../screens';
import { render, screen, fireEvent } from '@testing-library/react-native';

describe('First Test', () => {
  it('Should call button', () => {
    render(<AuthScreen />)
    const button = screen.getByText("Entrar com Github")
    fireEvent.press(button);
    expect(button).toBeTruthy()
  });
});