import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MapIcon from '@mui/icons-material/Map';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import TrafficIcon from '@mui/icons-material/Traffic';
import {useNavigate, useLocation} from 'react-router-dom';
import {useState} from 'react';
import {useEffect} from 'react';

export default function(){
    
    const location = useLocation();
    const navigate = useNavigate();    
    const [value, setValue] = useState<string>('404'); 
    

    useEffect(()=>{
        let basePath = '/' + location.pathname.split('/')[0];
        setValue(basePath);
    }, [])

    return (
        <Box sx={{ width: '100vw', position: "fixed", bottom: '0' }}>
          <BottomNavigation
            showLabels
            value='value'
            onChange={(_, newValue) => {
                navigate(newValue);  
                setValue(newValue);
            }}
          >
            <BottomNavigationAction label="Maps" icon={<MapIcon />} value= '/' />
            <BottomNavigationAction label="Cars" icon={<DirectionsCarIcon />} value='/cars' />
            <BottomNavigationAction label="Traffic" icon={<TrafficIcon />} value='/traffic'/>
          </BottomNavigation>
        </Box>
    );

}
