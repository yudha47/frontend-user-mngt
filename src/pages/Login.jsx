import React, {useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import {login, logout} from '../api/Auth'

function Login(){
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const inputRef = useRef(null)

  const loginHandler = (e) => {
    e.preventDefault()
    console.log('okeee')

    const formData = new FormData();
    formData.append('user_email', email);
    formData.append('user_password', password);
    login(formData).then((res) => {
      // console.log(res)
      if(res.responseCode === 200000){
        window.location.replace('/dashboard')
      }else{
        // setValidation(res.responseMessage)
        console.log(res)
        inputRef.current.focus()
      }
    })
  }

  const logOutHandler = async () => {
    logout().then((res) => {
      console.log(res.responseCode)
      if(res.responseCode === 200000){
        navigate('/login')
      }
    })
  };

  useEffect(function() {
    // checkUserToken()
  },[])

  return (
    <div>
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form onSubmit={loginHandler} className="login100-form validate-form">
              <span className="login100-form-title p-b-26">
                WELCOME
              </span>
              <span className="login100-form-title p-b-48">
                <i className="zmdi zmdi-font" />
              </span>
              <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                <input className="input100" type="text" ref={inputRef} value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <span className="focus-input100" data-placeholder="Email" />
              </div>
              <div className="wrap-input100 validate-input" data-validate="Enter password">
                <span className="btn-show-pass">
                  <i className="zmdi zmdi-eye" />
                </span>
                <input className="input100" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <span className="focus-input100" data-placeholder="Password" />
              </div>
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn" />
                  <button type="submit" className="login100-form-btn">
                    Login
                  </button>
                </div>
              </div>
              <div className="text-center p-t-115">
                <span className="txt1">
                  Don’t have an account? 
                </span>
                <a className="txt2" href="/assets/#">
                  Sign Up |
                </a>
                <a href="#" onClick={logOutHandler} className="txt2">
                   Logout
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div id="dropDownSelect1" />
    </div>
  )
}

export default Login;