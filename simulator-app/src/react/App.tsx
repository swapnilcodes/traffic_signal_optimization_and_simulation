import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Maps from './screens/Maps.tsx';
import NavBar from './components/NavBar.tsx';
import Cars from './screens/Cars.tsx';
import Traffic from './screens/Traffic.tsx';
import MapEditor from './screens/MapEditor.tsx';
import Intro from './screens/Intro.tsx';

function App() {

  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={< Intro/ >}></Route>
                <Route path='/maps' element={< Maps/ >}></Route>
                <Route path='/cars' element={<Cars/>}></Route>
                <Route path='/traffic' element={<Traffic/>}></Route>
                <Route path='/map_editor/:mapId?' element={< MapEditor/ >}></Route>
            </Routes> 
            <NavBar/>
        </BrowserRouter>
    </div>
  )
}

export default App
