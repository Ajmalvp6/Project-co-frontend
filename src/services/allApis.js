
import { baseUrl } from "./baseUrl";
import { commonApi } from "./commonApi";


// register

export const registerApi=async(bodyData)=>{
    return await commonApi("POST",`${baseUrl}/user/register`,bodyData)
}

// login

export const loginApi=async(bodyData)=>{
    return await commonApi("POST",`${baseUrl}/user/login`,bodyData)
}

// add project 

export const addProjectApi=async(bodyData,headerData)=>{
    return await commonApi("POST",`${baseUrl}/user/add-project`,bodyData,headerData)
}

// get home project 3 

export const homeProjectApi=async()=>{
    return await commonApi("GET",`${baseUrl}/home-projects`,{},{})
}

// all projects

export const allProjectApi=async(searchData)=>{
    return await commonApi("GET",`${baseUrl}/all-projects?search=${searchData}`,{},{})
}



// user projects

export const UserProjectApi=async(reqHeader)=>{
    return await commonApi("GET",`${baseUrl}/user-projects`,{},reqHeader)
}

// edit project 

export const editProjectApi=async(bodyData,headerData,id)=>{
    return await commonApi("PUT",`${baseUrl}/user/${id}/edit-project`,bodyData,headerData)
}


// delete project 


export const deleteProjectApi=async(headerData,id)=>{
    return await commonApi("DELETE",`${baseUrl}/user/delete-project/${id}`,{},headerData)
}

// edit profile

export const editProfileApi=async(bodyData,headerData,id)=>{
    return await commonApi("PUT",`${baseUrl}/user/${id}/edit-profile`,bodyData,headerData)
}






