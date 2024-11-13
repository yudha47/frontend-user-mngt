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

export const getMenu = async () => {
  const req = await axios.get(`${baseUrl}/list-menu`, config)
  return req.data
}

export const updateSetting = async (formData) => {
  try{
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    const reqUpdate = await axios.post(`${baseUrl}/update-setting`, formData, config)
    return reqUpdate.data
  }catch(err){
    return err.response.data
  }
}

export const getImage = async () => {
  const req = await axios.get(`${baseUrl}/data-image`, config)
  return req.data
}