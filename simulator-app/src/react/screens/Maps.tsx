import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import type {Map} from '../models/Map.ts';
import {v4 as uuid} from 'uuid';

export default function(){
    
    const navigate = useNavigate();
    const [maps, setMaps] = useState<{[key: string]: Map}>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>(''); 

    useEffect(()=>{
        loadMaps();
    }, []);
        
    async function loadMaps(){
        try{
            setError('');
            setLoading(true);
            const json = await window.electron.readMaps(); 
            setMaps(JSON.parse(json));
        } 
        catch(err){
            setError('Unable To load Maps');
        }
        finally{
            setLoading(false);
        }
    }

    function newMap(){
        const map: Map = {
            id: uuid(),
            name: 'New Map',
            roads: {},
            startingPoints: [],
            endingPoints: []
        };
        navigate('/map_editor', {state: {map}});
    }
    
    return(
        <div style={{display: 'grid', alignItems: 'center', justifyContent: 'center'}}>
            <h1 style= {{textAlign: 'center'}}>Maps</h1>
            <Button variant='contained' style={{width: '150px', height: '40px', marginBottom: '40px'}} onClick={newMap}>New Map</Button> 
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {
                    Object.entries(maps).map(([key, value])=>(
                        <div style={{
                            width: '300px', 
                            height: '150px',
                            border: '1px solid black',
                            borderRadius: '2px',
                            cursor: 'pointer', 
                            fontSize: '20px',
                            textAlign: 'center',
                            paddingTop: '130px'
                        }} key={key}>
                            {value.name} 
                        </div>
                    ))
                }
            </div>
        </div>
    );
}


