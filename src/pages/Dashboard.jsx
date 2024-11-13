import React, {useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import {checkToken} from '../api/Auth'
import SidePanel from '../components/SidePanel'
import Setting from '../components/Setting'
import { getImage } from '../api/Setting'

function Dashboard(){
  const navigate = useNavigate()
  const baseUrl = "http://127.0.0.1:8000/uploads"
  
  const [background, setBackground] = useState("")

  useEffect(function() {
    checkToken().then((res) => {
      if(res.responseCode !== 200000){
        window.location.replace('/login')
      }
    });

    getImage().then((res) => {
      if(res.responseCode === 200000){
        setBackground(baseUrl+'/'+res.responseData.background)
      }
    });
  },[])

  return (
    <div id="wrapper">
      <SidePanel/>
      <div id="content-wrapper" className="d-flex flex-column" style={{ backgroundImage: `url("${background}")`, backgroundSize: "cover" }}>
        <div id="content">
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
              <i className="fa fa-bars" />
            </button>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown no-arrow">
                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                  <img className="img-profile rounded-circle" src="/assets/images/undraw_profile.svg" />
                </a>
              </li>
            </ul>
          </nav>

          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
            </div>

            <div className="row">
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-primary shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                          Earnings (Monthly)</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">$40,000</div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-calendar fa-2x text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                  <div className="card-body">
                    <div className="row no-gutters align-items-center">
                      <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                          Earnings (Annual)</div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                      </div>
                      <div className="col-auto">
                        <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright © Your Website 2021</span>
            </div>
          </div>
        </footer>
      </div>
      <Setting/>
    </div>
  )
}

export default Dashboard;