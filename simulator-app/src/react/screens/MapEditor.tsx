import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import ToolBox from '../components/ToolBox.tsx';
import type { Map } from '../models/Map.ts';
import Button from '@mui/material/Button';

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
        data[mapData.mapId] = mapData;
        await window.electron.writeMaps(JSON.stringify(data));
    }

    return (
        <div>
            < ToolBox onAddRoad={addRoad} onDeleteRoad={deleteRoad}/>
            <h1 style={{textAlign: 'center'}}>
                Edit {mapData.mapName}  
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
