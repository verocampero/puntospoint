import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

const Buttons = () => {
    const list = ['Clientes', 'Transacciones', 'Dinero', 'Cashback'];
    const [activeItem, setActiveItem] = useState(list[0]);

    const getButtonStyles = (label: string) => ({
        borderColor: '#79757F',
        backgroundColor: activeItem === label ? '#E7DFF8' : 'white',
        color: '#1D192B',
        borderRadius: '8px',
        '&:hover': {
            backgroundColor: 'white',
        },
        ...(activeItem === label && { border: 'none' })
    });

    return (
        <Box display="flex" sx={{ justifyContent: 'space-between', marginBottom: '30px' }}>
            <Box sx={{ display: 'flex', gap: '4px' }}>
                {['Clientes', 'Transacciones'].map((label) => (
                    <Button
                        key={label}
                        variant="outlined"
                        sx={{ ...getButtonStyles(label), textTransform: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                        onClick={() => setActiveItem(label)}
                    >
                        {activeItem === label && <DoneIcon />} {label}
                    </Button>
                ))}
            </Box>
            <Box sx={{ display: 'flex', gap: '4px' }}>
                {['Dinero', 'Cashback'].map((label) => (
                    <Button
                        key={label}
                        variant="outlined"
                        sx={{ ...getButtonStyles(label), textTransform: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
                        onClick={() => setActiveItem(label)}
                    >
                        {activeItem === label && <DoneIcon />} {label}
                    </Button>
                ))}
            </Box>
        </Box>
    );
};

export default Buttons;
