import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Col, Row } from "react-bootstrap";
import { baseUrl } from "../services/baseUrl";
import { editProjectApi } from "../services/allApis";
import { editResponseContext } from "../services/ContextShare";

function EditProject({ project }) {


  const {setEditUpdate}=useContext(editResponseContext)



  const [projectInputs, setProjectInputs] = useState({
    _id: project?._id,
    title: project?.title,
    description: project?.description,
    technologies: project?.technologies,
    website: project?.website,
    gitHub: project?.gitHub,
    coverImg: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false);

    setProjectInputs({_id: project?._id,
      title: project?.title,
      description: project?.description,
      technologies: project?.technologies,
      website: project?.website,
      gitHub: project?.gitHub,
      coverImg: ""})

  }

  
  const handleShow = () => {setShow(true)
    setProjectInputs({_id: project?._id,
      title: project?.title,
      description: project?.description,
      technologies: project?.technologies,
      website: project?.website,
      gitHub: project?.gitHub,
      coverImg: ""})
  };

  const [preview, setPreview] = useState("");

  const setInputs = (e) => {
    const { name, value } = e.target;
    setProjectInputs({ ...projectInputs, [name]: value });
  };

  const handleUpdate = async(e) => {
    e.preventDefault();

    const { title, description, technologies, website, gitHub, coverImg,_id } =
      projectInputs;
    if (!title || !description || !technologies || !website || !gitHub) {
      alert("please fill all datas");
    } else {
      // header token, (content type) multipart/formdata

      // access token
      if (sessionStorage.getItem("token")) {
        const token = sessionStorage.getItem("token")

        


        const headerConfig = {
          "Content-Type": preview?"multipart/form-data":"application/json" ,
          "access_token": `Bearer ${token}`
        };
        // body-form data
        const reqBody = new FormData();
        reqBody.append("title", title);
        reqBody.append("description", description);
        reqBody.append("technologies", technologies);
        reqBody.append("website", website);
        reqBody.append("gitHub", gitHub);
        preview? reqBody.append("coverImg", coverImg) : reqBody.append("coverImg", project?.coverImg)


        // api call

        const result=await editProjectApi(reqBody,headerConfig,_id)

        console.log(result.data);
        


        if(result.status==200){
          alert(`${result.data.title} project is updated..`)
          setEditUpdate(result.data)
          handleClose()
        }
        

      }
    }
  };

  // preview generation from file image
  useEffect(() => {
    if (projectInputs.coverImg) {
      setPreview(URL.createObjectURL(projectInputs.coverImg));
    } else {
      setPreview("");
    }
  }, [projectInputs.coverImg]);

  return (
    <div>
      <>
        <Link onClick={handleShow} style={{ textDecoration: "none" }}>
          <i className="fa-2x mx-3 fa-solid fa-pen-to-square text-black"></i>
        </Link>
      </>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#ff5e00" }}>Edit Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <label htmlFor="pl">
                <input
                  onChange={(e) =>
                    setProjectInputs({
                      ...projectInputs,
                      ["coverImg"]: e.target.files[0],
                    })
                  }
                  id="pl"
                  type="file"
                  style={{ display: "none" }}
                />
                <img
                  style={{ cursor: "pointer" }}
                  className="w-100"
                  value={projectInputs.coverImg}
                  src={
                    preview
                      ? preview
                      : `${baseUrl}/uploads/${project?.coverImg}`
                  }
                  alt="project-upload"
                />
              </label>
            </Col>
            <Col>
              <input
                value={projectInputs.title}
                type="text"
                onChange={(e) => setInputs(e)}
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
                onChange={(e) => setInputs(e)}
                className="form-control mb-3"
                style={{ border: "none" }}
                placeholder="Language Used"
              />
              <hr />
              <input
                value={projectInputs.gitHub}
                type="text"
                name="gitHub"
                onChange={(e) => setInputs(e)}
                className="form-control mb-3"
                style={{ border: "none" }}
                placeholder="GitHub Link"
              />
              <hr />
              <input
                value={projectInputs.website}
                name="website"
                type="text"
                onChange={(e) => setInputs(e)}
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
            onChange={(e) => setInputs(e)}
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
          <Button onClick={(e) => handleUpdate(e)} variant="primary">
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditProject;
