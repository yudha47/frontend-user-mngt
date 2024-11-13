import { React, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../api/Auth'
import { getMenu, updateSetting } from '../api/Setting'

function SidePanel(){
  const navigate = useNavigate()
  const [listMenu, setListMenu] = useState([])
  const [optionMenu, setOptionMenu] = useState("")
  
  const fileLogo = useRef([])
  const fileBackground = useRef([])

  const [menuDashboard, setMenuDashboard] = useState('')
  const [iconMenuDashboard, seticonMenuDashboard] = useState('')
  const [menuUser, setMenuUser] = useState('')
  const [iconMenuUser, seticonMenuUser] = useState('')
  const [menuLogout, setMenuLogout] = useState('')
  const [iconMenuLogout, seticonMenuLogout] = useState('')
  const [menuSetting, setMenuSetting] = useState('')
  const [iconMenuSetting, seticonMenuSetting] = useState('')

  const handleLogoSelect = (event) => {
    fileLogo.current = event.target.files[0];
  }

  const handleBackgroundSelect = (event) => {
    fileBackground.current = event.target.files[0];
  }

  const settingHandler = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('logo', fileLogo.current)
    formData.append('background', fileBackground.current)
    formData.append('menu_dashboard', menuDashboard)
    formData.append('icon_menu_dashboard', iconMenuDashboard)
    formData.append('menu_user', menuUser)
    formData.append('icon_menu_user', iconMenuUser)
    formData.append('menu_logout', menuLogout)
    formData.append('icon_menu_logout', iconMenuLogout)
    formData.append('menu_setting', menuSetting)
    formData.append('icon_menu_setting', iconMenuSetting)
    updateSetting(formData).then((res) => {
      if(res.responseCode === 200000){
        window.location.reload();
      }
    })
  }
  
  return (
    <div className="modal fade" id="mdl_setting" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Pengaturan Tampilan</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={settingHandler}>
              <div className="form-group">
                <label htmlFor="InputFullname">Logo</label>
                <input type="file" className="form-control" id="" onChange={handleLogoSelect} />
              </div>
              <div className="form-group">
                <label htmlFor="InputEmail">Background</label>
                <input type="file" className="form-control" id="" onChange={handleBackgroundSelect} />
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="">Menu Dashboard</label>
                  <div className="d-flex justify-content-between">
                    <select class="form-control form-control-sm custom-select" onChange={(e) => setMenuDashboard(e.target.value)}>
                      {/* {optionMenu} */}
                      <option disabled selected>Pilih Urutan Menu</option>
                      <option value="1">Urutan 1</option>
                      <option value="2">Urutan 2</option>
                      <option value="3">Urutan 3</option>
                      <option value="4">Urutan 4</option>
                    </select>
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="">Icon Font Awesome</label>
                  <div className="d-flex justify-content-between">
                    <input type="text" className="form-control" id="" value={iconMenuDashboard} onChange={(e) => seticonMenuDashboard(e.target.value)}/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="">Menu Master Pengguna</label>
                  <div className="d-flex justify-content-between">
                    <select class="form-control form-control-sm custom-select" onChange={(e) => setMenuUser(e.target.value)}>
                      {/* {optionMenu} */}
                      <option disabled selected>Pilih Urutan Menu</option>
                      <option value="1">Urutan 1</option>
                      <option value="2">Urutan 2</option>
                      <option value="3">Urutan 3</option>
                      <option value="4">Urutan 4</option>
                    </select>
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="">Icon Font Awesome</label>
                  <div className="d-flex justify-content-between">
                    <input type="text" className="form-control" id="" value={iconMenuUser} onChange={(e) => seticonMenuUser(e.target.value)}/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="">Menu Logout</label>
                  <div className="d-flex justify-content-between">
                    <select class="form-control form-control-sm custom-select" onChange={(e) => setMenuLogout(e.target.value)}>
                      {/* {optionMenu} */}
                      <option disabled selected>Pilih Urutan Menu</option>
                      <option value="1">Urutan 1</option>
                      <option value="2">Urutan 2</option>
                      <option value="3">Urutan 3</option>
                      <option value="4">Urutan 4</option>
                    </select>
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="">Icon Font Awesome</label>
                  <div className="d-flex justify-content-between">
                    <input type="text" className="form-control" id="" value={iconMenuLogout} onChange={(e) => seticonMenuLogout(e.target.value)}/>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="">Menu Pengaturan</label>
                  <div className="d-flex justify-content-between">
                    <select class="form-control form-control-sm custom-select" onChange={(e) => setMenuSetting(e.target.value)}>
                      {/* {optionMenu} */}
                      <option disabled selected>Pilih Urutan Menu</option>
                      <option value="1">Urutan 1</option>
                      <option value="2">Urutan 2</option>
                      <option value="3">Urutan 3</option>
                      <option value="4">Urutan 4</option>
                    </select>
                  </div>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="">Icon Font Awesome</label>
                  <div className="d-flex justify-content-between">
                    <input type="text" className="form-control" id="" value={iconMenuSetting} onChange={(e) => seticonMenuSetting(e.target.value)}/>
                  </div>
                </div>
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
  );
}
export default SidePanel;