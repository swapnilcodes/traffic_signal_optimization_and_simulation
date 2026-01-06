import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import ToolBox from '../components/ToolBox.tsx';
import type { Map } from '../models/Map.ts';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import type {Point} from '../models/Point.ts';
import type {Road} from '../models/Road.ts';
import HoverRoad from '../components/MapComponents/Hover/Road.tsx';

interface MapEditorProps {
    map: Map
}

export default ()=>{
    const {map}: MapEditorProps = useLocation().state;

    const [mapData, setMap] = useState<Map>(map);
    const [cameraPos, setCameraPos] = useState<Point>({x: 0, y: 0});
    const [scale, setScale] = useState<number>(1);
    const [insertingRoad, setInsertingRoad] = useState<boolean>(false); 

    useEffect(()=>{
        setMap(map);
        setCameraPos({x: 0, y: 0});
        setScale(1);
        setInsertingRoad(false);
    }, []);
    

    function addRoad(){
        setInsertingRoad(true); 
    }
    
    function deleteRoad(){
        
    }

    function handleRoadInsert(start: Point, end: Point){
        setInsertingRoad(false); 
        console.log(`startX: ${start.x}, startY: ${start.y}`);
        console.log(`endX: ${end.x}, endY: ${end.y}`);
    }

    async function save(){
        const json = await window.electron.readMaps();
        let data = JSON.parse(json);
        data[mapData.id] = mapData;
        await window.electron.writeMaps(JSON.stringify(data));
    }

    return (
        <div>
            <ToolBox onAddRoad={addRoad} onDeleteRoad={deleteRoad}/>
            <h1 style={{textAlign: 'center', position: 'fixed', top: '30px', left: '40vw'}}>
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
                    position: 'fixed',
                    right: '4vw'
                }}
                variant='contained'
                onClick={save}
            >
                SAVE
            </Button> 
        
            <div style={{
                width: '100vw',
                height: '100vh', 
                position: 'absolute', 
                top:'0',
                left: '0',
                zIndex: '-1'
            }}>
                {
                   insertingRoad ? (
                       <HoverRoad
                        onClick={handleRoadInsert}
                        currentScale={scale}
                        viewPortSize={[document.documentElement.clientWidth, document.documentElement.clientHeight]}
                       />
                    ):""
                }  
            </div>
        </div>
    );
}
