import axios from "axios"

const baseUrl = "http://127.0.0.1:8000/api"
const token = localStorage.getItem('user_token')
const config = {
  headers: { 
              'Authorization': `Bearer ${token}`,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "true",
              "Access-Control-Max-Age": "1800",
              "Access-Control-Allow-Headers": "content-type",
              "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH",
            }
}

const configNoAuth = {
  headers: { 
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": "false",
              "Access-Control-Max-Age": "1800",
              "Access-Control-Allow-Headers": "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization",
              "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTION",
              "withCredentials": "true",
            }
}

export const userList = async () => {
  const req = await axios.get(`${baseUrl}/users`, config)
  return req.data
}

export const userOnline = async () => {
  const req = await axios.get(`${baseUrl}/user-online`, config)
  return req.data
}

export const addUser = async (formData) => {
  try{
    const reqAdd = await axios.post(`${baseUrl}/add-user`, formData, config)
    return reqAdd.data
  }catch(err){
    return err.response.data
  }
}

export const rmUser = async (id) => {
  try{
    const reqRm = await axios.get(`${baseUrl}/remove-user/${id}`, config)
    return reqRm.data
  }catch(err){
    return err.response.data
  }
}

export const getUserPk = async (id) => {
  try{
    const reqRm = await axios.get(`${baseUrl}/get-user-pk/${id}`, config)
    return reqRm.data
  }catch(err){
    return err.response.data
  }
}

export const updateUser = async (formData) => {
  try{
    const reqUpdate = await axios.post(`${baseUrl}/update-user`, formData, config)
    return reqUpdate.data
  }catch(err){
    return err.response.data
  }
}