import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Home.css";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";
import { homeProjectApi } from "../services/allApis";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [homeProjects,setHomeProjects]=useState([])

  const getHomeProjects=async()=>{
     const result = await homeProjectApi()
     setHomeProjects(result.data);
     
  }

  useEffect(() => {
    if (sessionStorage.getItem("userId")) {
      setIsLoggedIn(true);
    }
  });

  useEffect(()=>{
    getHomeProjects()
  },[])

  console.log(homeProjects);
  

  console.log(isLoggedIn);

  return (
    <div>
      <div className="spotlight d-flex justify-content-center align-items-center py-5 px-2">
        <Container>
          <Row>
            <Col lg={6} md={6} className="d-flex align-items-center">
              <div>
                <h1 className="head">"Upload Your Projects Now"</h1>
                <p>
                  "Easily upload and showcase your projects with a few simple
                  steps."
                </p>

                {isLoggedIn ? (
                  <Link to={"/dashboard"}>
                    {" "}
                    <button className="btn-style">Explore Profile</button>
                  </Link>
                ) : (
                  <Link to={"/authentication"}>
                    {" "}
                    <button className="btn-style">Get Started</button>
                  </Link>
                )}
              </div>
            </Col>
            <Col
              lg={6}
              md={6}
              className="d-flex align-items-center justify-content-center"
            >
              <div>
                <img
                  src="https://i.postimg.cc/Gp9qBPSf/enthua.png"
                  alt="Project Upload"
                  className="img-fluid"
                />
              </div>
            </Col>
          </Row>

          <div className="rated px-4 py-5">
            <Row>
              <Col
                lg={9}
                className="d-flex align-items-center justify-content-center"
              >
                <div>
                  <h3 style={{ color: "#001f3f" }}>
                    Join thousands of users sharing their projects with us
                  </h3>
                  <p>
                    Trusted by developers and creators worldwide to showcase
                    their work.
                  </p>
                </div>
              </Col>
              <Col
                lg={3}
                className="d-flex align-items-center justify-content-center"
              >
                <p>
                  {" "}
                  <i style={{ color: "#008459" }} className="fa fa-star"></i>
                  <i style={{ color: "#008459" }} className="fa fa-star"></i>
                  <i style={{ color: "#008459" }} className="fa fa-star"></i>
                  <i style={{ color: "#008459" }} className="fa fa-star"></i>
                  <i style={{ color: "#008459" }} className="fa fa-star"></i>
                  We're rated
                </p>
              </Col>
            </Row>
          </div>

          <div className="features">
            <h1 className="features-text mt-3 py-5 text-center">
              Explore Project
            </h1>
            <div className="d-flex justify-content-evenly flex-wrap">
              {
                homeProjects?.length>0 ? 
                homeProjects.map(i=>(

                  <ProjectCard project={i}></ProjectCard>

                ))
                 
                
                :

                

                <h1 className="text-center">No Projects Uploaded Yet </h1>
                
              }
              
            </div>

            <div className="text-center py-5">
              <Link style={{ textDecoration: "none" }} to={"/all-projects"}>
                <p>
                  Exlore More Projects <i class="fa-solid fa-forward"></i>
                </p>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Home;
