import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Projects from '../components/Projects'
import Profile from '../components/Profile'
import { profileUpdateContext } from '../services/ContextShare'

function Dashboard() {

  const {editProfile, setEditProfile}=useContext(profileUpdateContext)

  

    const [userName,setUserName]=useState("")


    useEffect(()=>{
      if(sessionStorage.getItem("currentUser")){
        setUserName(sessionStorage.getItem("currentUser"))
      }
    },[editProfile])


    console.log(userName);
    


  return (
    <div>
        <Header dashboard></Header>
        {/* dashboard ={true} */}
        <Row>

            <Col lg={8}>
            <div className='p-3 shadow my-4 mx-2 shadow rounded'>
                <p className='fs-3'><b>Welcome  <span style={{color:"#ff5e00"}}>{userName}</span></b></p>
                <hr />
            </div>
                <Projects></Projects>
            </Col>

            <Col lg={4}>

            <Profile></Profile>
            
             </Col>
        </Row>
    </div>
  )
}

export default Dashboard