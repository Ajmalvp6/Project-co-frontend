import React, { useContext } from 'react'
import { NavItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';  
import { useNavigate } from 'react-router-dom';
import { tokenAuthContext } from '../services/AuthContext';



function Header({dashboard}) {

  const {isAutherised,setIsAutherised}=useContext(tokenAuthContext)

  const navigate=useNavigate()


  const logout=()=>{
    sessionStorage.clear()
    setIsAutherised(false)
    navigate("/")
  }


  return (
    <div>
    <Navbar className="" style={{backgroundColor:"#ff5e00"}}>
        <Container>
          <Navbar.Brand href="/" className='d-flex'>
            <img
              alt=""
              src="https://i.postimg.cc/Gm9NMqSx/images-3-removebg-preview-1.png"
              width="80"
              height="70"
              className="d-inline-block align-top"
            />{' '}
            <h4 className='text-white mt-3 ms-2'>Project-co</h4>
          
          </Navbar.Brand>
        
        <NavItem>
        {
            dashboard && <button onClick={logout} className='btn btn-danger'>Logout</button>
          }
       
        </NavItem>
        </Container>
      </Navbar>
  </div>
  )
}

export default Header