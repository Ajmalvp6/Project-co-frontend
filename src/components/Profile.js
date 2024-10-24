import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../services/baseUrl";
import { editProfileApi } from "../services/allApis";
import { profileUpdateContext } from "../services/ContextShare";
import { Link } from "react-router-dom";



function Profile() {

  const {editProfile, setEditProfile}=useContext(profileUpdateContext)

  const [preview, setPreview] = useState("");

  const [open, setOpen] = useState(true);
  


  const changeOpen = () => {
    setOpen(!open);
  };

  const [existingImage,setExistingImage]=useState("")

  const [profile,setProfile]=useState({
    username:"",gitHub:"",linkedIn:"",profileImg:"",_id:""
  })

  console.log(profile);
  

  
  


  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      const user=JSON.parse(sessionStorage.getItem("user"))

      setProfile({...profile,username:user.username,gitHub:user.gitHub,
        linkedIn:user.linkedIn,_id:user._id})

        setExistingImage(user.profile)
    }
  },[editProfile])


  useEffect(()=>{
    if(profile.profileImg){
      setPreview(URL.createObjectURL(profile.profileImg))
    }
    else{
      setPreview("")
    }

  },[profile.profileImg])


  

  // console.log(profile);
  
 
  const handleUpdate=async(e)=>{
    e.preventDefault()
    const {username,gitHub,linkedIn,profileImg,_id}=profile

    // body data

    const reqBody = new FormData();
    reqBody.append("username", username);
    reqBody.append("gitHub", gitHub);
    reqBody.append("linkedIn", linkedIn);
    
    preview? reqBody.append("profile", profileImg) : reqBody.append("profile", existingImage)



    // header data
    const token = sessionStorage.getItem("token")
    if(token){
      const headerConfig = {
        "Content-Type": preview?"multipart/form-data":"application/json" ,
        "access_token": `Bearer ${token}`
      };

      const result = await editProfileApi(reqBody,headerConfig,_id)

      // console.log(result);

      if(result.status==200){
        sessionStorage.setItem("user",JSON.stringify(result.data))
        sessionStorage.setItem("currentUser",result.data.username)
        changeOpen()
        setEditProfile(result.data)
      }

      
  
    }
    
    
     
        
    // id
  }

 

  return (
    <div>
      {open ? (
        <div className="p-4 shadow my-4">
          <div className="d-flex justify-content-between">
            <b className="fs-4">My profile</b>
            <i className="fa-solid fa-circle-check fa-2x text-success ms-3"></i>
          </div>

          <div className="text-center">
            <img
              style={{ borderRadius: "200px" }}
              className="w-50 border shadow"
              src={existingImage==""?
                   "https://i.postimg.cc/x8Mpm1gk/3135715.png"
                  : `${baseUrl}/uploads/${existingImage}`
              }
              alt=""
            />
          </div>

          <div className="p-3 mt-4">
            <p className="fs-5">
              <b>Username : </b> {profile.username}
            </p>
            <hr />

            <p className="fs-5">
              <b>LinkedIn : </b> <Link to={profile.linkedIn}>{profile.linkedIn}</Link>
            </p>
            <hr />

            <p className="fs-5">
              <b>GitHub : </b> <Link to={profile.gitHub}>{profile.gitHub}</Link>
            </p>
            <hr />
          </div>

          <div className="text-end">
            <div onClick={changeOpen} style={{ textDecoration: "none" }}>
              <p className="fs-5">Edit</p>
            </div>
          </div>
        </div>
      ) : (
        // Edit profile form
        <div className="p-4 shadow my-4">
          <div className="d-flex justify-content-between">
            <b className="fs-4">Edit profile</b>
            <i className="fa-solid fa-circle-check fa-2x text-success ms-3"></i>
          </div>

          <div className="text-center">
            <label htmlFor="im">
              <input
                onChange={(e)=>setProfile({...profile,["profileImg"]:e.target.files[0]})}
                type="file"
                style={{ display: "none" }}
                id="im"
              />
              
               
               { 
                existingImage=="" ?
               <img
                  style={{ borderRadius: "200px" }}
                  className="w-50 border shadow"
                  src={preview?preview:"https://i.postimg.cc/x8Mpm1gk/3135715.png"}alt="" />
                  :
                  <img
                  style={{ borderRadius: "200px" }}
                  className="w-50 border shadow"
                  src={preview?preview:`${baseUrl}/uploads/${existingImage}`}alt="" />

              }
              
                 
            
            </label>
          </div>

          <div className="p-3 mt-4">
            <p className="fs-5 d-flex align-items-center">
              <b className="me-2">Username:</b>
              <input
                type="text"
                value={profile.username}
                onChange={(e)=>setProfile({...profile,["username"]:e.target.value})}
                className="form-control border-0"
                placeholder="Enter your username"
              />
            </p>
            <hr />

            <p className="fs-5 d-flex align-items-center">
              <b className="me-2">LinkedIn:</b>
              <input
                value={profile.linkedIn}
                onChange={(e)=>setProfile({...profile,["linkedIn"]:e.target.value})}
                type="text"
                className="form-control border-0"
                placeholder="Enter your LinkedIn profile"
              />
            </p>
            <hr />

            <p className="fs-5 d-flex align-items-center">
              <b className="me-2">GitHub:</b>
              <input
                value={profile.gitHub}
                onChange={(e)=>setProfile({...profile,["gitHub"]:e.target.value})}
                type="text"
                className="form-control border-0"
                placeholder="Enter your GitHub profile"
              />
            </p>
            <hr />
          </div>

          <div className="text-center">
            <button onClick={(e)=>handleUpdate(e)}  className="btn-style">
              Update Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;  