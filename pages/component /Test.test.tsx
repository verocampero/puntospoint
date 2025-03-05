import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestComponent from './Test';

describe('TestComponent', () => {
    test('renders the component', () => {
        render(<TestComponent />);
        expect(screen.getByText('Test Component')).toBeInTheDocument();
        expect(screen.getByText('This is a component for testing purposes.')).toBeInTheDocument();
    });
});