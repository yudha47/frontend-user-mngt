import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import {login, logout, checkToken} from '../api/Auth';

function Dashboard(){
  const navigate = useNavigate();

  const logOutHandler = () => {
    logout().then((res) => {
      if(res.responseCode === 200000){
        navigate('/login')
      }
    })
  };

  useEffect(function() {
    checkToken().then((res) => {
      if(res.responseCode !== 200000){
        window.location.replace('/login')
      }
    });
  },[])

  return (
    <div id="wrapper">
      {/* Sidebar */}
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        {/* Sidebar - Brand */}
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div>
          <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
        </a>
        {/* Divider */}
        <hr className="sidebar-divider my-0" />
        {/* Nav Item - Dashboard */}
        <li className="nav-item active">
          <a className="nav-link" href="/dashboard">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span></a>
        </li>
        <li className="nav-item active">
          <a className="nav-link" href="/master-pengguna">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Master Pengguna</span></a>
        </li>
        <li className="nav-item active">
          <a className="nav-link" href="#" onClick={logOutHandler}>
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Logout</span></a>
        </li>
      </ul>
      {/* End of Sidebar */}
      {/* Content Wrapper */}
      <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
          {/* Topbar */}
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {/* Sidebar Toggle (Topbar) */}
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
              <i className="fa fa-bars" />
            </button>
            {/* Topbar Search */}
            {/* <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              <div className="input-group">
                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm" />
                  </button>
                </div>
              </div>
            </form> */}
            {/* Topbar Navbar */}
            <ul className="navbar-nav ml-auto">
              {/* Nav Item - User Information */}
              <li className="nav-item dropdown no-arrow">
                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                  <img className="img-profile rounded-circle" src="/assets/images/undraw_profile.svg" />
                </a>
                {/* Dropdown - User Information */}
                {/* <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                  <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                    Logout
                  </a>
                </div> */}
              </li>
            </ul>
          </nav>
          {/* End of Topbar */}
          {/* Begin Page Content */}
          <div className="container-fluid">
            {/* Page Heading */}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
              {/* <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50" /> Generate Report</a> */}
            </div>
            {/* Content Row */}
            <div className="row">
              {/* Earnings (Monthly) Card Example */}
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
              {/* Earnings (Monthly) Card Example */}
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
          {/* /.container-fluid */}
        </div>
        {/* End of Main Content */}
        {/* Footer */}
        <footer className="sticky-footer bg-white">
          <div className="container my-auto">
            <div className="copyright text-center my-auto">
              <span>Copyright © Your Website 2021</span>
            </div>
          </div>
        </footer>
        {/* End of Footer */}
      </div>
      {/* End of Content Wrapper */}
    </div>
  )
}

export default Dashboard;