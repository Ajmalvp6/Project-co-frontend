import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteProjectApi, UserProjectApi } from '../services/allApis'
import { addResponseContext, editResponseContext } from '../services/ContextShare'
import EditProject from './EditProject'







function Project() {

  const {addUpdate, setaAddUpdate} = useContext(addResponseContext)
 
  const {editUpdate}=useContext(editResponseContext)

    


  const [projects,setProjects]=useState([])

  


  const getUserProjects=async()=>{
    if(sessionStorage.getItem("token")){
      const  token = sessionStorage.getItem("token")
      const headerConfig={
        "Content-Type":"application/json",
        "access_token":`Bearer ${token}`
      }
      const result = await UserProjectApi(headerConfig)
      console.log(result.data);
      if(result.status==200){
        setProjects(result.data)

      }
      

    }
    
  }



  const handleDelete=async(e,id)=>{
    e.preventDefault()
    // header 
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader={
        "Content-Type":"application/json",
         "access_token":`Bearer ${token}`
         
      }
     try{ const result = await deleteProjectApi(reqHeader,id)
      // console.log(result);
      if(result.status==200){
        getUserProjects()

      }
    }
      catch(error){
        console.log(error);
        
      }
      
    }
    
  }


  useEffect(()=>{
    getUserProjects()
  },[addUpdate,editUpdate])

  console.log(projects);
  

  return (
    <div>
       {
        projects?.length>0 ?
        projects.map(i=>(
          <div className=' shadow mt-3 rounded'>
          <div className='d-flex justify-content-between'>
              <p className='fs-4'>{i.title}</p>
              <div className='d-flex'>
              <Link to={i.gitHub} style={{textDecoration:"none"}} ><i class="fa-2x mx-3 fa-brands fa-github text-black"></i></Link>
              <Link to={i.website} style={{textDecoration:"none"}}> <i class="fa-2x mx-3 fa-solid fa-link text-black"></i></Link>
              <EditProject project={i}></EditProject>
             <div onClick={(e)=>handleDelete(e,i._id)} style={{textDecoration:"none"}}> <i class="fa-2x mx-3 fa-solid fa-trash text-black"></i></div>
             

              </div>
          </div>
      </div>
        ))
       

        : <h1 className='text-center'>No Projects added yet</h1>
        
        }
    </div>
  )
}

export default Project