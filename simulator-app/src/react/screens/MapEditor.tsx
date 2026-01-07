import {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import ToolBox from '../components/ToolBox.tsx';
import type { Map } from '../models/Map.ts';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import type {Point} from '../models/Point.ts';
import {RoadTypes, type Road} from '../models/Road.ts';
import HoverRoad from '../components/MapComponents/Hover/Road.tsx';
import {v4 as uuid} from 'uuid';

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


    function handleCameraMove(){

    }
    
    function deleteRoad(){
        
    }

    function handleRoadInsert(start: Point, end: Point){
        setInsertingRoad(false); 

        // Calculating absolute positions
        const absStart = {x: cameraPos.x + start.x, y: cameraPos.y + start.y}; 
        const absEnd = {x: cameraPos.x + end.x, y: cameraPos.y + end.y};
        
        // Creating the road
        const road: Road = {
            id: uuid(),
            name: null,
            type: RoadTypes.SingleLane,
            tilt: 0,
            start: absStart,
            end: absEnd
        };
        
        // Updating the map
        let temp = {...mapData};
        temp.roads[road.id] = road;
        setMap(temp);
    }

    async function save(){
        const json = await window.electron.readMaps();
        let data = JSON.parse(json);
        data[mapData.id] = mapData;
        await window.electron.writeMaps(JSON.stringify(data));
    }

    return (
        <div>
            <ToolBox onAddRoad={()=>setInsertingRoad(true)} onDeleteRoad={deleteRoad}/>
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
