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

export const login = async (formData) => {
  try{
    const reqLogin = await axios.post(`${baseUrl}/login`, formData, configNoAuth)
    if(reqLogin.data.responseCode === 200000){
      localStorage.setItem('user_id', reqLogin.data.responseData.data.user_id)
      localStorage.setItem('user_token', reqLogin.data.responseData.token)
      localStorage.setItem('user_fullname', reqLogin.data.responseData.data.user_fullname)
      localStorage.setItem('user_email', reqLogin.data.responseData.data.user_email)
    }
  
    return reqLogin.data
  }catch(err){
    return err.response.data
  }
}

export const logout = async () => {
  const token = localStorage.getItem('user_token')
  const config = {
    headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' }
  }

  const bodyParameters = {
    key: "value"
  }
  
  try{
    const reqLogout = await axios.post(`${baseUrl}/logout`, bodyParameters, config)
    localStorage.clear()
    return reqLogout.data
  }catch(err){
    return err.response.data
  }
}

export const checkToken = async () => {
  const token = localStorage.getItem('user_token')
  const config = {
    headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' }
  }

  const bodyParameters = {
    key: "value"
  }

  try{
    const validateToken = await axios.post(`${baseUrl}/validate-token`, bodyParameters, config)
    return validateToken.data
  }catch(err){
    return err.response.data
  }
}