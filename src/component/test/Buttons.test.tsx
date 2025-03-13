import { render, screen, fireEvent } from '@testing-library/react';
import Buttons from '../Buttons';
import '@testing-library/jest-dom';

test('Cambia el estado activo al hacer clic en un botón', () => {
    render(<Buttons />);

    const clientesButton = screen.getByText('Clientes');
    const transaccionesButton = screen.getByText('Transacciones');

    expect(transaccionesButton).toHaveStyle('background-color: white');

    fireEvent.click(transaccionesButton);

    expect(clientesButton).toHaveStyle('background-color: white');
});
