import type {Road} from '../models/Road.ts';
import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';

interface PropertiesBarProps  {
    selectedRoad: Road | undefined,
    onValChange: (road: Road)=> void, 
    rotateRoad: (roadId: string)=> void,
}

export default function({ selectedRoad, onValChange, rotateRoad }: PropertiesBarProps){
    const [road, setRoad] = useState<Road|undefined>(selectedRoad);
    useEffect(()=>{
        setRoad(selectedRoad);
    }, [selectedRoad]);

    useEffect(()=>{
        if(road) onValChange(road);
    }, [road]);
        
    if(!road){
        return <></>;
    }


    return (
        <div style={{
            position: 'absolute',
            top: '10vh',
            right: '2vw',
            width: '15vw',
            height: '80vh',
            backgroundColor: 'pink',
            fontSize: '18px',
            display: 'flex-box',
            alignItems: 'center',
            justifyContent: "center",
            alignContent: 'center',
            justifyItems: "center",
            overflow: 'auto'
        }}>
            <h3
                style={{
                    textAlign: 'center',
                    width: '100%'
                }}
            >
                Properties Bar
            </h3>
        
            <h4>RoadId: {road?.id}</h4>
            
            <h4>Start: </h4> 
            <h4>X: </h4>
            <input type='number' value={road.start.x} onChange={(e)=>{
                if(!e.target.value) return;
                const temp = {...road};
                temp.start.x = Number.parseInt(e.target.value);
                setRoad(temp);
            }} style={{width: '70%'}}/>
            <h4>Y: </h4>
            <input type='number' value={road.start.y} onChange={(e)=>{
                if(!e.target.value) return;
                const temp = {...road};
                temp.start.y = Number.parseInt(e.target.value);
                setRoad(temp);
            }}/>
            <h4>End: </h4> 
            <h4>X: </h4>
            <input type='number' value={road.end.x} onChange={(e)=>{
                if(!e.target.value) return;
                const temp = {...road};
                temp.end.x = Number.parseInt(e.target.value);
                setRoad(temp);
            }} style={{width: '70%'}}/>
            <h4>Y: </h4>
            <input type='number' value={road.start.y} onChange={(e)=>{
                if(!e.target.value) return;
                const temp = {...road};
                temp.end.y = Number.parseInt(e.target.value);
                setRoad(temp);
            }}/>
            <Button variant='contained' onClick={()=>rotateRoad(road.id)}>
                Rotate Road
            </Button> 
            
        </div>
    );
}
