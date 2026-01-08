import {useState, useEffect} from 'react';
import type {Point} from '../../../models/Point';
import type {Road} from '../../../models/Road';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';

// Must provide relative co-ordinates
interface RoadProps {
    road: Road,
    currentScale: number,
    addRoadLeft: (roadId: string)=>void
    addRoadUp: (roadId: string)=>void
    addRoadRight: (roadId: string)=>void
    addRoadDown: (roadId: string)=>void
};

export default function({road, currentScale, addRoadLeft, addRoadUp, addRoadRight, addRoadDown}: RoadProps){
    console.log (`y: ${road.start.y}`);
    const width = Math.abs( ( road.end.x  ) - ( road.start.x  ) ) * currentScale;
    const height = 9 * currentScale;
        
    return (
        <div
            style= {{
                position: 'absolute',
                top: `${road.start.y}%`,
                left: `${road.start.x}%`,
                width: `${width}%`,
                height: `${height}%`, 
                backgroundColor: 'rgb(40, 40, 40)',
                transform: `rotate(${road.tilt}deg)`
            }}
            id='permanent_road'
        >
            <Button
                style={{
                    position: 'absolute', 
                    top: '-40%',
                    left: `50%`,
                    color: 'darkgreen',
                    width: '40px',
                    height: '40px'
                }}
                onClick={()=>addRoadUp(road.id)}
            >
                < AddCircleOutlineIcon/ >
            </Button>
            <Button
                style={{
                    position: 'absolute', 
                    left: '-5%',
                    top: `50%`,
                    color: 'darkgreen',
                    width: '40px',
                    height: '40px'
                }}
                onClick={()=>addRoadLeft(road.id)}
            >
                < AddCircleOutlineIcon/ >
            </Button>
            <Button
                style={{
                    position: 'absolute', 
                    left: '100%',
                    top: `50%`,
                    color: 'darkgreen',
                    width: '40px',
                    height: '40px'
                }}
                onClick={()=>addRoadRight(road.id)}
            >
                < AddCircleOutlineIcon/ >
            </Button>
            <Button
                style={{
                    position: 'absolute', 
                    left: '50%',
                    top: `100%`,
                    color: 'darkgreen',
                    width: '40px',
                    height: '40px'
                }}
                onClick={()=>addRoadDown(road.id)}
            >
                <AddCircleOutlineIcon/>
            </Button>
        </div>
    );
}

