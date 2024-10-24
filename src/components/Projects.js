import React, { useContext, useEffect, useState } from "react";
import Project from "./Project";
import { Button, Modal, Col, Row } from "react-bootstrap";
import { addProjectApi } from "../services/allApis";
import { addResponseContext } from "../services/ContextShare";



function Projects() {


  // access context 

  const {addUpdate, setaAddUpdate} = useContext(addResponseContext)
 

  



  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false)
    setProjectInputs({...projectInputs,title: "",
      description: "",
      technologies: "",
      website: "",
      gitHub: "",
      coverImg: "",})
  };
  const handleShow = () => setShow(true);

  const [preview,setPreview]=useState("")

  const [projectInputs, setProjectInputs] = useState({
    title: "",
    description: "",
    technologies: "",
    website: "",
    gitHub: "",
    coverImg: "",
  });

  console.log(projectInputs);

  // preview generation from file image
  useEffect(()=>{
    if(projectInputs.coverImg){
      setPreview(URL.createObjectURL(projectInputs.coverImg))
    }
    else{
      setPreview("")
    }

  },[projectInputs.coverImg])

  console.log(preview);
  
  const handleAdd=async(e)=>{
    e.preventDefault()
    const {title,description,technologies,website,gitHub,coverImg}=projectInputs
    if(!title || !description || !technologies || !website || !gitHub || !coverImg){
      alert("please fill all datas")
    }
    else{
      // header token, (content type) multipart/formdata

      // access token 
      if(sessionStorage.getItem("token")){
        const token=sessionStorage.getItem("token")
        const headerConfig={
          "Content-Type":"multipart/form-data",
          "access_token":`Bearer ${token}`
      }
      // body-form data
      const reqBody=new FormData()
      reqBody.append("title",title)
      reqBody.append("description",description)
      reqBody.append("technologies",technologies)
      reqBody.append("website",website)
      reqBody.append("gitHub",gitHub)
      reqBody.append("coverImg",coverImg)
       


      try{const result = await addProjectApi(reqBody,headerConfig)
      console.log(result);


      if(result.status==201){
        // change context state data
        setaAddUpdate(result.data)
        alert(`${result.data.title} data added successfully`)
        handleClose( )
        
      }
      else{
        alert(result.data.response.data)
      }
    }
    catch(error){
      console.log(error);
      
    }
      
      

    }
    }

  }

  const setInputs=(e)=>{
    const {name,value}=e.target
    setProjectInputs({...projectInputs,[name]:value})
  }

  return (
    <div>
      <div className="mt-4 shadow p-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fs-4">Projects</h5>
          <button
            onClick={handleShow}
            className="btn btn-light btn-style text-white w-25 shadow"
          >
            Add Project
          </button>
        </div>
        <Project />
      </div>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#ff5e00" }}>
            Add New Project
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <label htmlFor="pl">
                <input onChange={(e)=>setProjectInputs({...projectInputs,["coverImg"]:e.target.files[0]})} id="pl" type="file" style={{ display: "none" }} />
                <img
                  
                  style={{ cursor: "pointer" }}
                  className="w-100"
                  value={projectInputs.coverImg}
                  src={preview? preview :"https://i.postimg.cc/3NzBt5Ss/360-F-481134373-0-W4kg2y-Ke-BRHNEklk4-F9-UXt-GHdub3t-Yk-removebg-preview.png"}
                  alt="project-upload"
                />
              </label>
            </Col>
            <Col>
              <input
              value={projectInputs.title}
                type="text"
                onChange={(e)=>setInputs(e)}
                name="title"
                className="form-control mb-3"
                style={{ border: "none" }}
                placeholder="Project Name"
              />
              <hr />
              <input
                type="text"
                value={projectInputs.technologies}
                name="technologies"
                onChange={(e)=>setInputs(e)}
                className="form-control mb-3"
                style={{ border: "none" }}
                placeholder="Language Used"
              />
              <hr />
              <input
                 value={projectInputs.gitHub}
                type="text"
                name="gitHub"
                onChange={(e)=>setInputs(e)}
                className="form-control mb-3"
                style={{ border: "none" }}
                placeholder="GitHub Link"
              />
              <hr />
              <input
                 value={projectInputs.website}
                name="website"
                type="text"
                onChange={(e)=>setInputs(e)}
                className="form-control"
                style={{ border: "none" }}
                placeholder="Website Link"
              />
              <hr />
            </Col>
          </Row>

          <hr />

          <textarea
            name="description"
            value={projectInputs.description}
            onChange={(e)=>setInputs(e)}
            id=""
            className="form-control"
            style={{ border: "none" }}
            placeholder="Project Overview"
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>handleAdd(e)}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Projects;
