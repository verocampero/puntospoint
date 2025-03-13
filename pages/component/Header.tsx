import * as React from 'react';
import Box from '@mui/material/Box';
import EventIcon from '@mui/icons-material/Event';
import Button from '@mui/material/Button';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BarChartIcon from '@mui/icons-material/BarChart';
import GradeIcon from '@mui/icons-material/Grade';
import { useFiltro } from './FiltroContext';
import GraficYTG from './GraficYTG'

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

export default function Header(props: { window?: () => Window }) {
  const { tiempoFiltro, setTiempoFiltro } = useFiltro();  
  const [activeItem, setActiveItem] = React.useState(list[0]);

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box sx={{ marginTop: '80px', display: 'flex', justifyContent: 'center', padding: '10px', textAlign: 'center' }}>
        {list.map((item, index) => (
          <Button
            key={index}
            sx={{
              color: activeItem === item ? '#1D192B' : '#1D192B',
              backgroundColor: activeItem === item ? '#E7DFF8' : 'transparent',
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
        <Button sx={{ color: '#644BBA', fontSize: '14px', fontWeight: 600, mx: 1 }}>
          <RemoveRedEyeIcon /> Ver Detalle
        </Button>
        <Box sx={{ borderWidth: '2px', borderColor: '#644BBA', borderStyle: 'solid', borderRadius: '100px', padding: '5px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', mx: 1 }}>
          <Button
            sx={{
              color: activeItem.text === 'Gráfico' ? 'white' : '#644BBA',
              backgroundColor: activeItem.text === 'Gráfico' ? '#644BBA' : 'transparent',
              borderRadius: '100px',
              fontSize: '14px',
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
              color: activeItem.text === 'Pulso' ? 'white' : '#644BBA',
              backgroundColor: activeItem.text === 'Pulso' ? '#644BBA' : 'transparent',
              borderRadius: '100px',
              fontSize: '14px',
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
  );
}
