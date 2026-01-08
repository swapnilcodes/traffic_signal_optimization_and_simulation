import {useState, useEffect} from 'react';
import type {Point} from '../../../models/Point';

interface HoverRoadProps  {
    onClick: (start: Point, end: Point)=>any,
    currentScale: number,
};

export default function({onClick, currentScale}:HoverRoadProps){
    // Default Width
    const width = 60;
    const [centre, setCentre] = useState<Point>({x: 0, y: 0});
    
    function handleMouseMove(event: MouseEvent){
        const xPercent = ( event.clientX/(document.documentElement.clientWidth/100) );
        const yPercent = ( event.clientY/(document.documentElement.clientHeight/100));

        setCentre({x: xPercent, y: yPercent}); 
    }

    function handleClick(event: MouseEvent){
        window.removeEventListener('click', handleClick);
        window.removeEventListener('mousemove', handleMouseMove);
        const xPercent = (event.clientX/(document.documentElement.clientWidth/100));
        const yPercent = (event.clientY/(document.documentElement.clientHeight/100));
        onClick(
            {x: xPercent - (width /2), y: yPercent - (9/2)}, 
            {x: xPercent + (width/2), y: yPercent + (9/2)}
        );
    }

    useEffect(()=>{
        window.addEventListener('mousemove', handleMouseMove); 
        setTimeout(() => {
         window.addEventListener('click', handleClick);           
        }, 1000);
        return ()=>{
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);   
        };
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


