import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { baseUrl } from "../services/baseUrl";



function ProjectCard({project}) {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="d-flex">
      <Card  onClick={handleShow} style={{ width: "19rem"  }} className="m-2 mt-3">
        <Card.Img
          variant="top"
          style={{height:"13rem"}}
          src={`${baseUrl}/uploads/${project?.coverImg}`}
        />
        <Card.Body>
          <Card.Title>{project?.title}</Card.Title>
          <Card.Text>
           {project?.description}
          </Card.Text>
        </Card.Body>
      </Card>

    

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                    <img className="w-100" src={`${baseUrl}/uploads/${project?.coverImg}`} alt="" />
                </Col>
                
                <Col>

                <h5>project description</h5>
                <p>{project?.description}</p>
                
                </Col>
            </Row>

            

           <div className="d-flex mt-3">
                <h5 className="">Technologies</h5> 
                <p className="ms-3">{project?.technologies}</p>
           </div>
           <hr />

          <a href={project?.website}>
             <i class="fa-solid fa-2x fa-link"></i> 
             </a>
             <a href={project?.gitHub}>
             <i class="fa-brands fa-2x ms-3 fa-github"></i>
             </a>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      
    </div>
  );
}

export default ProjectCard;
