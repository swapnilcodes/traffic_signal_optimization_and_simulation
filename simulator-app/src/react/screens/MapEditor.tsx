import {useState, useEffect,} from 'react';
import {useLocation} from 'react-router-dom';
import ToolBox from '../components/ToolBox.tsx';
import type { Map } from '../models/Map.ts';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import type {Point} from '../models/Point.ts';
import {RoadTypes, type Road} from '../models/Road.ts';
import HoverRoad from '../components/MapComponents/Hover/Road.tsx';
import {v4 as uuid} from 'uuid';
import PermanentRoad from '../components/MapComponents/Permanent/Road';
import type {ReactElement} from 'react';
import PropertiesBar from '../components/RoadPropertiesBar.tsx';
import {addRoadAbove, rotateRoadBlock, insertNewRoad, addRoadBelow, addRoadToLeft, addRoadToRight, calculatePossibleBoundsForRoad} from '../services/mapMaking';


interface MapEditorProps {
    propMap: Map
};

export default ()=>{
    const {propMap}: MapEditorProps = useLocation().state;

    const [map, setMap] = useState<Map>(propMap);
    const [cameraPos, setCameraPos] = useState<Point>({x: 0, y: 0});
    const [scale, setScale] = useState<number>(1);

    // Hover Road Properties
    const [insertingRoad, setInsertingRoad] = useState<boolean>(false); 
    const [hoverRoadTilt, setHoverRoadTilt] = useState<90 | 0>(0);
    const [hoverRoadBounds, setHoverRoadBounds] = useState<{start: Point, end: Point} | undefined>() 

    const [selectedRoad, setSelectedRoad] = useState<Road>();
        
    // state variables for detecting camera movement (mouse drag).
    const [initialMousePos, setInitialMousePos] = useState<Point>({x: -1, y: -1}); 
    
    useEffect(()=>{
        setMap(propMap);
        setCameraPos({x: 0, y: 0});
        setScale(1);
        setInsertingRoad(false);
        setHoverRoadTilt(0);
        setHoverRoadBounds(undefined);
    }, []);


    function handleCanvasDrag(e: React.MouseEvent){
        if(initialMousePos.x === -1 || initialMousePos.y === -1) return; 
        const percentX =  e.clientX / (document.documentElement.clientWidth/100);
        const percentY =  e.clientY / (document.documentElement.clientHeight/100);
        const movX = ( percentX - initialMousePos.x )/15;           
        const movY = ( percentY - initialMousePos.y )/15; 
        setCameraPos({x: cameraPos.x - movX, y: cameraPos.y - movY});
    }

    function handleCanvasMouseDown(e: React.MouseEvent){
        if(initialMousePos.x !== -1 || initialMousePos.y !== -1) return;
        const percentX = e.clientX / (document.documentElement.clientWidth/100);
        const percentY = e.clientY / (document.documentElement.clientHeight/100);
        setInitialMousePos({x: percentX, y: percentY});
    }
    function handleCanvasMouseUp(){
        setInitialMousePos({x: -1, y: -1});
    }

    function handleRoadInsert(start: Point, end: Point, tilt: number){
        setInsertingRoad(false); 
        setHoverRoadTilt(0);
        setHoverRoadBounds(undefined);

        // Calculating absolute positions
        const absStart = {x: cameraPos.x + start.x, y: cameraPos.y + start.y}; 
        const absEnd = {x: cameraPos.x + end.x, y: cameraPos.y + end.y};
        
        // Creating the road
        const road: Road = {
            id: uuid(),
            name: null,
            type: RoadTypes.SingleLane,
            tilt: tilt,
            start: absStart,
            end: absEnd
        };
        
        // Updating the map
        setMap(insertNewRoad({...map}, road));
    }

    function deleteRoad(){
        
    }

    function createNewRoadAbove(road: Road){
        const width = road.end.x - road.start.x;
        const tempRoad: Road = {
            id: uuid(),
            name: null,
            tilt: 0,
            type: RoadTypes.SingleLane,
            end: {
                x: ( road.start.x + (width/2) ) ,
                y: road.start.y,
            },
            start: {
                x: road.start.x + (width/2) - 6,
                y: road.start.y - 60,
            },
            down: road.id
        };
        setHoverRoadTilt(90); 
        const bounds = calculatePossibleBoundsForRoad(map, tempRoad); 
        setHoverRoadBounds( {
            start: {
                x: cameraPos.x + bounds.start.x,
                y: cameraPos.x + bounds.start.y
            },
            end: {
                x: cameraPos.x + bounds.end.x,
                y: cameraPos.x + bounds.end.y
            }
        });
        setInsertingRoad(true);
    }


    // Updates the road in the map and then updates the state 
    function updateRoad(road: Road){
        let temp = {...map};
        temp.roads[road.id] = road;
        setMap(temp);
    }
    
    // Renders road on the screen.
    function renderRoads(){
        const roads: ReactElement[] = []; 
         
        for (let roadKey in map.roads){
            let road = map.roads[roadKey];
            // Skipping roads which are out of bounds
            if(road.end.x < cameraPos.x - 50 && road.end.y < cameraPos.y - 50) continue;
            if(road.start.x > cameraPos.x + 50 && road.start.y > cameraPos.y + 50) continue;
                    
            const relativeStart: Point = {
                x: (road.start.x-cameraPos.x), 
                y: (road.start.y-cameraPos.y)
            };
            const relativeEnd: Point = {
                x: relativeStart.x + (road.end.x - road.start.x), 
                y: relativeStart.y + (road.end.y - road.start.y),
            };

            let temp = {...road};
            temp.start = relativeStart;
            temp.end = relativeEnd;

            let element = (
                <PermanentRoad
                    road={temp}
                    key={roadKey}
                    currentScale={scale}
                    rotate={()=>setMap(rotateRoadBlock({...map}, road.id))}
                    addRoadUp={()=>createNewRoadAbove(road)}
                    addRoadDown={()=>createNewRoadBelow(road)}
                    addRoadLeft={()=>createNewRoadLeft(road)}
                    addRoadRight={()=>createNewRoadRight(road)}
                    onSelect={()=>{ 
                        setSelectedRoad(road);
                    }}
                />
            );

            roads.push(element);
        }  

        return roads;
    }    

    async function save(){
        const json = await window.electron.readMaps();
        let data = JSON.parse(json);
        data[map.id] = map;
        await window.electron.writeMaps(JSON.stringify(data));
    }
    return (
        <div>
            <h3 style={{position: 'absolute', top: "10px", left: '10px'}}>Camera Pos x: {cameraPos.x} y: {cameraPos.y}</h3>
            <ToolBox onAddRoad={()=>setInsertingRoad(true)} onDeleteRoad={deleteRoad}/>
            <PropertiesBar selectedRoad={selectedRoad} onValChange={updateRoad} rotateRoad={()=>selectedRoad?setMap(rotateRoadBlock({...map}, selectedRoad.id)):undefined }/>
            <h1 style={{textAlign: 'center', position: 'fixed', top: '30px', left: '40vw'}}>
                Edit  
                <TextField variant='standard' value={map.name} style={{
                    fontSize: '20px',
                    marginLeft: '20px'
                }}
                onChange={
                    (e)=>{
                        setMap({
                            ...map,
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
            
            <div 
                style={{
                    width: '100vw',
                    height: '100vh', 
                    position: 'absolute', 
                    top:'0',
                    left: '0',
                    zIndex: '-1'
                }}
                onMouseDown={handleCanvasMouseDown}
                onMouseUp={handleCanvasMouseUp}
                onMouseMove={handleCanvasDrag}             
            >
                {
                   insertingRoad ? (
                       <HoverRoad
                        onClick={handleRoadInsert}
                        currentScale={scale}
                        tilt={hoverRoadTilt}
                        bounds={hoverRoadBounds}
                       />
                    ):""
                }  
                {
                    renderRoads()
                }
            </div>
        </div>
    );
}
