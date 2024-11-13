import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import {login, logout, checkToken} from '../api/Auth';
import { userList, addUser, rmUser, getUserPk, updateUser} from '../api/User';

function MasterUser(){
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [tableUser, setTableUser] = useState();
  const [userId, setUserId] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logOutHandler = () => {
    logout().then((res) => {
      if(res.responseCode === 200000){
        navigate('/login')
      }
    })
  };

  const addUserHandler = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('user_fullname', fullname);
    formData.append('user_email', email);
    formData.append('user_password', password);
    addUser(formData).then((res) => {
      if(res.responseCode === 200000){
        setUserData(res.responseData)
        window.$('#mdl_add_user').modal('hide');
        setFullname('')
        setEmail('')
        setPassword('')
      }
    })
  }

  const rmUserHandler = (id) => {
    rmUser(id).then((res) => {
      if(res.responseCode === 200000){
        setUserData(res.responseData)
      }
    })
  }

  const getUserHandler = (id) => {
    getUserPk(id).then((res) => {
      setUserId(id)
      setFullname(res.responseData.user_fullname)
      setEmail(res.responseData.user_email)
      setPassword('')

      window.$('#mdl_edit_user').modal('show');
    })
  }

  const updateUserHandler = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('user_fullname', fullname);
    formData.append('user_email', email);
    formData.append('user_password', password);
    updateUser(formData).then((res) => {
      if(res.responseCode === 200000){
        setUserData(res.responseData)
        window.$('#mdl_edit_user').modal('hide');
        setFullname('')
        setEmail('')
        setPassword('')
      }
    })
  }

  const reqUser = async () => {
    userList().then((res) => {
      setUserData(res.responseData)
    });
  }

  useEffect(function() {
    checkToken().then((res) => {
      if(res.responseCode !== 200000){
        window.location.replace('/login')
      }else{
        reqUser()
      }
    });
  },[])

  useEffect(function() {
    setTableUser(
      userData.map((row, index) => {
        return (
          <tr key={index}>
            <td>{index+1}</td>
            <td>{row.user_fullname}</td>
            <td>{row.user_email}</td>
            <td>
              <button className="btn btn-sm btn-success mr-2" onClick={() => {getUserHandler(row.user_id)}}>Edit</button>
              <button className="btn btn-sm btn-warning" onClick={() => {rmUserHandler(row.user_id)}}>Hapus</button>
            </td>
          </tr>
        )
      }
    ))
  }, [userData])

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

      <div id="content-wrapper" className="d-flex flex-column">
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
            <h1 className="h3 mb-2 text-gray-800">Master Pengguna</h1>
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <button className="btn btn-sm btn-primary px-4" data-toggle="modal" data-target="#mdl_add_user">Tambah</button>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered text-center" id="dataTable" width="100%" cellSpacing={0}>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Nama Pengguna</th>
                        <th>Email</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableUser}
                    </tbody>
                  </table>
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
      
      <div className="modal fade" id="mdl_add_user" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Tambah Pengguna</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={addUserHandler}>
                <div className="form-group">
                  <label htmlFor="InputFullname">Fullname</label>
                  <input type="text" className="form-control" id="InputFullname" value={fullname} onChange={(e) => setFullname(e.target.value)} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="InputEmail">Email</label>
                  <input type="email" className="form-control" id="InputEmail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="inputPassword">Password</label>
                  <input type="password" className="form-control" id="inputPassword" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className="pull-right">
                  <button type="button" className="btn btn-sm btn-secondary mr-2 px-3" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-sm btn-primary px-3">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <div className="modal fade" id="mdl_edit_user" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Pengguna</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={updateUserHandler}>
                <div className="form-group">
                  <label htmlFor="InputFullname">Fullname</label>
                  <input type="text" className="form-control" id="InputFullname" value={fullname} onChange={(e) => setFullname(e.target.value)} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="InputEmail">Email</label>
                  <input type="email" className="form-control" id="InputEmail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="inputPassword">Password</label>
                  <input type="password" className="form-control" id="inputPassword" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <div className="pull-right">
                  <button type="button" className="btn btn-sm btn-secondary mr-2 px-3" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-sm btn-primary px-3">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default MasterUser;