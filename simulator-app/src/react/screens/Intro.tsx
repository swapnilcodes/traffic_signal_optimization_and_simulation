import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';


export default function(){
    
    const [error, setError] = useState<string | null>(null); 
    const navigate = useNavigate();    

    useEffect(()=>{
        config();
    }, [])
    
    async function config(){
        setError(null);
        try{
           const res = await window.electron.config();
           console.log(res);
           if(res) navigate('/maps');
           else setError('config failed');
        }
        catch(err){
            setError('Config failed');
        }
    }

    return (
       <div style={{width: '100vw', height: '100vh', fontSize: '25px', textAlign: 'center'}}>
        {!error? "Loading" : error }         
       </div> 
    );
}
