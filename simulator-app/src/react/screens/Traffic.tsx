import {useState, useEffect} from 'react';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function(){
    return (
        <div style={{display: 'grid', alignItems: 'center', justifyContent: 'center', justifyItems: 'center'}}>
            <h1 style= {{textAlign: 'center', margin: '30px 0'}}>
               Simulate Traffic  
            </h1>
            <h2 style={{marginTop: '50px'}}>Choose a Map</h2> 
            <FormControl fullWidth style={{marginBottom: '70px'}}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="map"
              >
                    <MenuItem value={10}>Rajarampuri</MenuItem>
                    <MenuItem value={20}>Shahupuri</MenuItem>
                    <MenuItem value={30}>Ruikar Colony</MenuItem>
                    <MenuItem value={40}>Tarabai park</MenuItem>
              </Select>
            </FormControl>
            
            <h2>Traffic Density: </h2>
            <input type="number" style={{width: '300px', height: '60px'}}/>
            <Button variant='contained' style={{marginTop: '70px'}}>Generate Traffic</Button> 
        </div>
    );
}
