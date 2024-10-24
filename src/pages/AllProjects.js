import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { allProjectApi } from '../services/allApis'
import { Col, Row } from 'react-bootstrap'

function AllProjects() {

    const [allProjects,setAllProjects]=useState([])
    const [searchData,setSearchData]=useState("")


    const getAllProjects=async()=>{
        const result = await allProjectApi(searchData)
        if(result.status==200){
            console.log(result);
            setAllProjects(result.data);
            
        }
        
        
    } 

    useEffect(()=>{
        getAllProjects()
    },[searchData])

    console.log(allProjects);
    

  return (
    <div>
        <Header></Header>
        <div className='my-5'>
            <h1 className='text-center'>Explore all projects in </h1>
            <p className='text-center'>project master</p>
        </div>

        <div className='text-center mb-5'>
            <label  htmlFor="" className='border py-3 rounded-5 shadow'>
            <i class="fa-solid fa-magnifying-glass px-3"></i>
                <input onChange={(e)=>setSearchData(e.target.value)} type="text" placeholder='Search By Technologies Eg:html,css' style={{border:"none", outline: "none",width:"300px"}} className='px-3 mx-2 ' />
            </label>
        </div>

        

        <hr className='container w-75' />

        <div className='w-75 container mt-5'>
            <Row>
                {
                    allProjects?.length>0 ?
    
                    allProjects.map(i=>(
    
                       <Col lg={4}> <ProjectCard project={i}></ProjectCard></Col>
                        
                    ))
    
                   
    
                    :
    
                    <h1 className='text-center'>No projects Uploaded yet</h1>
                }
            </Row>
            
        </div>
    </div>
  )
}

export default AllProjects