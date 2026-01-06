import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import ToolBox from '../components/ToolBox.tsx';
import type { Map } from '../models/Map.ts';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface MapEditorProps {
    map: Map
}

export default ()=>{
    const {map}: MapEditorProps = useLocation().state;
    const [mapData, setMap] = useState<Map>(map);

    
    function addRoad(){
        
    }
    
    function deleteRoad(){

    }

    async function save(){
        const json = await window.electron.readMaps();
        let data = JSON.parse(json);
        data[mapData.id] = mapData;
        await window.electron.writeMaps(JSON.stringify(data));
    }

    return (
        <div>
            < ToolBox onAddRoad={addRoad} onDeleteRoad={deleteRoad}/>
            <h1 style={{textAlign: 'center'}}>
                Edit  
                <TextField variant='standard' value={mapData.name} style={{
                    fontSize: '20px',
                    marginLeft: '20px'
                }}
                onChange={
                    (e)=>{
                        setMap({
                            ...mapData,
                            name: e.target.value
                        });
                    }
                }
                /> 
            </h1>
            <Button
                style={{
                    backgroundColor: 'green',
                    width: '120px',
                    height: '50px',
                    color: 'white',
                    position: 'absolute',
                    right: '4vw'
                }}
                variant='contained'
                onClick={save}
            >
                SAVE
            </Button> 
        </div>
    );
}
