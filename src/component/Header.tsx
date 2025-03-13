import * as React from 'react';
import Box from '@mui/material/Box';
import EventIcon from '@mui/icons-material/Event';
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BarChartIcon from '@mui/icons-material/BarChart';
import GradeIcon from '@mui/icons-material/Grade';
import { useFiltro } from '../Context/FiltroContext';
import { useTheme, useMediaQuery, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const list = [
  { text: 'Hoy', icon: null },
  { text: '7D', icon: null },
  { text: 'Este Mes', icon: null },
  { text: '6M', icon: null },
  { text: 'YTD/YTG', icon: null },
  { text: '1A', icon: null },
  { text: 'MÁX', icon: null },
  { text: 'Personalizado', icon: <EventIcon sx={{ fontSize: 24, color: '#644BBA' }} /> },
];

const daysList = [
  { text: 'TODO', icon: null },
  { text: 'Lunes', icon: null },
  { text: 'Martes', icon: null },
  { text: 'Miércoles', icon: null },
  { text: 'Jueves', icon: null },
  { text: 'Viernes', icon: null },
  { text: 'Sábado', icon: null },
  { text: 'Domingo', icon: null },
];

export default function Header(props: { window?: () => Window }) {
  const { tiempoFiltro, setTiempoFiltro } = useFiltro();  
  const [activeItem, setActiveItem] = React.useState(list[0]); 
  const [activeDay, setActiveDay] = React.useState<{ text: string; icon: React.JSX.Element | null }>(daysList[0]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true); 
  }, []);

  React.useEffect(() => {
    const filtroActivo = list.find(item => item.text === tiempoFiltro);
    if (filtroActivo) {
      setActiveItem(filtroActivo); 
    }
  }, [tiempoFiltro]); 

  const handleNavClick = (item: { text: string, icon: React.JSX.Element | null }) => {
    setActiveItem(item); 
    setTiempoFiltro(item.text); 
  };

  const handleDayClick = (day: { text: string, icon: React.JSX.Element | null }) => {
    setActiveDay(day);
  };

  
  if (!isClient) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box
        sx={{
          marginTop: isMobile ? '80px' : '80px',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '10px',
          textAlign: 'center',
          gap: isMobile ? '8px' : '16px',
        }}
      >
        {isMobile ? (
          <FormControl fullWidth sx={{ maxWidth: '300px', marginBottom: '16px' }}>
            <Select
              labelId="periodo-label"
              value={activeItem.text}
              onChange={(e) => {
                const selectedItem = list.find(item => item.text === e.target.value);
                if (selectedItem) handleNavClick(selectedItem);
              }}
            >
              {list.map((item, index) => (
                <MenuItem key={index} value={item.text}>
                  {item.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '16px',
              alignItems: 'center',
            }}
          >
            {list.map((item, index) => (
              <Button
                key={index}
                sx={{
                  color: activeItem === item ? '#1D192B' : '#1D192B', // Color del texto
                  backgroundColor: activeItem === item ? '#E7DFF8' : 'transparent', // Fondo activo/inactivo
                  fontFamily: 'Roboto, sans-serif',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  mx: 1,
                  '&:hover': {
                    color: '#1D192B',
                  },
                }}
                onClick={() => handleNavClick(item)}
              >
                {item.icon && <Box sx={{ display: 'inline-block', mr: 1 }}>{item.icon}</Box>}
                {item.text}
              </Button>
            ))}
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '8px' : '16px',
            alignItems: 'center',
          }}
        >
          <Button sx={{ color: '#644BBA', fontSize: isMobile ? '12px' : '14px', fontWeight: 600, mx: 1 }}>
            <RemoveRedEyeIcon /> Ver Detalle
          </Button>
          <Box
            sx={{
              borderWidth: '2px',
              borderColor: '#644BBA',
              borderStyle: 'solid',
              borderRadius: '100px',
              padding: '5px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              mx: 1,
            }}
          >
            <Button
              sx={{
                color: 'white', // Siempre activo
                backgroundColor: '#644BBA', // Siempre activo
                borderRadius: '100px',
                fontSize: isMobile ? '12px' : '14px',
                fontWeight: 600,
                '&:hover': {
                  color: 'white',
                  backgroundColor: '#644BBA',
                },
              }}
              onClick={() => handleNavClick({ text: 'Gráfico', icon: <BarChartIcon /> })}
            >
              <BarChartIcon /> Gráfico
            </Button>
            <Button
              sx={{
                color: '#644BBA', // Inactivo
                backgroundColor: 'transparent', // Inactivo
                borderRadius: '100px',
                fontSize: isMobile ? '12px' : '14px',
                fontWeight: 600,
                '&:hover': {
                  color: 'white',
                  backgroundColor: '#644BBA',
                },
              }}
              onClick={() => handleNavClick({ text: 'Pulso', icon: <GradeIcon /> })}
            >
              <GradeIcon /> Pulso
            </Button>
          </Box>
        </Box>
      </Box>

      {tiempoFiltro === '7D' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '10px',
            textAlign: 'center',
            gap: isMobile ? '8px' : '16px',
          }}
        >
          {isMobile ? (
            <FormControl fullWidth sx={{ maxWidth: '300px', marginBottom: '16px' }}>
              <InputLabel id="dia-label">Día</InputLabel>
              <Select
                labelId="dia-label"
                value={activeDay.text}
                onChange={(e) => {
                  const selectedDay = daysList.find(day => day.text === e.target.value);
                  if (selectedDay) handleDayClick(selectedDay);
                }}
                label="Día"
              >
                {daysList.map((day, index) => (
                  <MenuItem key={index} value={day.text}>
                    {day.text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            daysList.map((day, index) => (
              <Button
                key={index}
                sx={{
                  color: activeDay === day ? '#1D192B' : '#1D192B',
                  backgroundColor: activeDay === day ? '#E7DFF8' : 'transparent',
                  fontFamily: 'Roboto, sans-serif',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 600,
                  mx: 1,
                  '&:hover': {
                    color: '#1D192B',
                  },
                }}
                onClick={() => handleDayClick(day)}
              >
                {day.icon && <Box sx={{ display: 'inline-block', mr: 1 }}>{day.icon}</Box>}
                {day.text}
              </Button>
            ))
          )}
        </Box>
      )}
    </Box>
  );
}