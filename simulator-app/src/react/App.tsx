import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Maps from './screens/Maps.tsx';
import NavBar from './components/NavBar.tsx';
import Cars from './screens/Cars.tsx';
import Traffic from './screens/Traffic.tsx';


function App() {

  return (
    <div>
        <NavBar/>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={< Maps/ >}></Route>
                <Route path='/cars' element={<Cars/>}></Route>
                <Route path='/traffic' element={<Traffic/>}></Route>

            </Routes> 
        </BrowserRouter>
    </div>
  )
}

export default App
