import {useState} from 'react';
import Button from '@mui/material/Button';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

interface ToolBoxProps {
    onAddRoad: ()=>any,
    onDeleteRoad: ()=>any,
    onZoomIn: ()=> any,
    onZoomOut: ()=> any
};

export default function({onAddRoad, onDeleteRoad, onZoomIn, onZoomOut}: ToolBoxProps){
    return (
        <div style={{
            position: 'fixed',
            left: '15px',
            top: '12vh',
            width: '10vw',
            height: '80vh',
            backgroundColor: 'rgb(40, 40, 40)',
            display: 'grid', 
            alignItems: 'center',
            justifyContent: 'center' 
        }}>
            <Button variant='outlined' 
                style={{
                    width: '7vw',
                    minHeight: '40px',
                    color: 'white',
                    border: '1px solid crimson'
                }}
                onClick={(e)=>onAddRoad()}
            >
                Add Road
            </Button>             
            <Button variant='outlined' 
                style={{
                    width: '7vw',
                    minHeight: '40px',
                    color: 'white',
                    border: '1px solid crimson'
                }}>
                Del Road
            </Button>
            <Button variant='outlined'
                style = {{
                    width: '30px',
                    height: '50px',
                    color: 'white',
                    border: '1px solid green'
                }}               
                onClick={(e)=>onZoomIn()}
            >
                < ZoomInIcon/ >
            </Button>
            <Button variant='outlined'
                style = {{
                    width: '30px',
                    height: '50px',
                    color: 'white',
                    border: '1px solid green'
                }}                
                onClick={(e)=>onZoomOut()}
            >
                < ZoomInIcon/ >
            </Button>
        </div>
    );
}
