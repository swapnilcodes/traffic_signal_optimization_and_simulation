import {useState, useEffect} from 'react';
import type {Point} from '../../../models/Point';

interface HoverRoadProps  {
    onClick: (start: Point, end: Point)=>any,
    currentScale: number,
    viewPortSize: [number, number]
};

export default function({onClick, currentScale, viewPortSize}:HoverRoadProps){
    // Default Width
    const width = 60;
    const [centre, setCentre] = useState<Point>({x:0, y:0});
    
    function handleMouseMove(event: MouseEvent){
        const xPx = event.clientX;
        const yPx = event.clientY;
        const xPercent = ( xPx/(viewPortSize[0]/100) );
        const yPercent = ( yPx/(viewPortSize[1]/100) ) ;
        setCentre({x: xPercent, y: yPercent}); 
    }

    function handleClick(event: MouseEvent){
        onClick({x: centre.x - width, y: centre.y}, {x: centre.x+width, y: centre.y});
    }

    useEffect(()=>{
        window.addEventListener('mousemove', handleMouseMove); 
        setTimeout(() => {
         window.addEventListener('click', handleClick);           
        }, 1000);
        
        // Clean Up
        return ()=>{
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
        }
    }, []);

    return (
        <div style={{
            width: `${( width * currentScale )}%`, 
            height: `${9 * currentScale}%`,
            position: 'fixed',
            top: `${centre.y}%`,
            left: `${centre.x - (width/2)}%`,
            backgroundColor: 'rgb(60, 60, 60)',
            cursor: 'pointer'
        }}>
            
        </div>
    );
}


