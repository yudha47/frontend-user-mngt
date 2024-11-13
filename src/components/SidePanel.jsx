import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMenu, getImage } from '../api/Setting'

function SidePanel(){
  const baseUrl = "http://127.0.0.1:8000/uploads"
  const navigate = useNavigate()
  const [listMenu, setListMenu] = useState([])
  const [viewMenu, setViewMenu] = useState("")
  
  const [logo, setLogo] = useState("")

  const settingHandler = () => {
    console.log('oke')
    window.$('#mdl_setting').modal('show')
  }

  useEffect(function() {
    getMenu().then((res) => {
      if(res.responseCode === 200000){
        setListMenu(res.responseData)
      }
    });

    getImage().then((res) => {
      if(res.responseCode === 200000){
        setLogo(res.responseData.logo)
      }
    });
  },[])

  useEffect(function() {
    setViewMenu(
      listMenu.map((row, index) => {
        if(row.name === "Pengaturan Tampilan"){
          return (
            <li className="nav-item active" key={index}>
              <a className="nav-link" href='#' onClick={settingHandler}>
                <i className={'fas fa-fw '+row.default_icon} />
                <span>{row.name}</span></a>
            </li>
          )
        }else{
          return (
            <li className="nav-item active" key={index}>
              <a className="nav-link" href={row.url}>
                <i className={'fas fa-fw '+row.default_icon} />
                <span>{row.name}</span>
                </a>
            </li>
          )
        }
      }
    ))
  },[listMenu])
  
  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon">
          {/* <i className="fas fa-laugh-wink" /> */}
          <img src={baseUrl+'/'+logo} class="rounded-circle" alt="Cinque Terre" style={{width: '50px', height : '50px'}}></img>
        </div>
        <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
      </a>

      <hr className="sidebar-divider my-0" />
      {viewMenu}
    </ul>
  );
}
export default SidePanel;