import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import type {Map} from '../models/Map.ts';
import {v4 as uuid} from 'uuid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';


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
        const propMap: Map = {
            id: uuid(),
            name: 'New Map',
            roads: {},
        };
        navigate('/map_editor', {state: {propMap}});
    }
    
    async function deleteMap(key: string){
        try{
            let temp =  { ...maps };
            delete temp[key];
            await window.electron.writeMaps(JSON.stringify(temp));
            setMaps(temp);
        }
        catch(_){
            setError('Failed to delete map');
        }

    }

    function openMap(key: string){
        const propMap = maps[key] as Map;
        navigate('/map_editor', {state: {propMap}});
    }

    
    if (loading){
        return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <CircularProgress />
            </div>
        );
    }

    return(
        <div style={{display: 'grid', alignItems: 'center', justifyContent: 'center', justifyItems: 'center'}}>
            <h1 style= {{textAlign: 'center', marginBottom: "50px"}}>Maps</h1>
            <Button 
                variant='contained'
                style={{
                    width: '150px',
                    height: '40px',
                    marginBottom: '40px'
                }}
                onClick={newMap}>
                New Map
            </Button>  
            <Button 
                variant='contained'
                style={{
                    width: '200px',
                    height: '50px',
                    marginBottom: '40px',
                    backgroundColor: 'green'
                }}
                onClick={newMap}>
                Import From Google Maps
            </Button> 
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {
                    Object.entries(maps).map(([key, value])=>(
                        <div style={{
                            width: '200px', 
                            height: '120px',
                            border: '2px solid black',
                            borderRadius: '2px',
                            cursor: 'pointer', 
                            fontSize: '20px',
                            textAlign: 'center',
                            paddingTop: '60px',
                            margin: '10px 40px',
                            zIndex: '1'
                        }} key={key} >
                            <div onClick={()=>openMap(key)} style={{ fontSize: '25px',color: 'black'}}>{value.name}</div> 
                            <Button 
                                variant='contained'
                                style={{backgroundColor: 'crimson', color: 'white', marginTop:'30px'}}
                                onClick={()=>deleteMap(key)}
                            >
                                < DeleteIcon / >
                            </Button>
                        </div>
                    ))
                }
            </div>
            <div 
                style={{
                    color: 'red',
                    textAlign: 'center',
                    fontSize: '23px'
                }}
            >
                {error}
            </div>
        </div>
    );
}


