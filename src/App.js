
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Home from './pages/Home';
import Auth from './pages/Auth';
import AllProjects from './pages/AllProjects';
import Dashboard from './pages/Dashboard';
import { useContext } from 'react';
import { tokenAuthContext } from './services/AuthContext';
import Pnf from './pages/Pnf';

function App() {

  const{isAutherised}=useContext(tokenAuthContext)

  return (
    <div className="App">


     
     <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/authentication' element={ <Auth></Auth>}></Route>
      <Route path='/register' element={ <Auth register></Auth>}></Route>
      <Route path='/all-projects' element={ <AllProjects></AllProjects>}></Route>
      
      <Route path='/dashboard' element={isAutherised? <Dashboard></Dashboard>:<Navigate to={'/authentication'}/>}></Route>

      <Route path='/*' element={<Pnf></Pnf>}></Route>

      

     </Routes>
     <Footer></Footer>
    </div>
  );
}

export default App;
