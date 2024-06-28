import 'bootstrap/dist/css/bootstrap.min.css';
import Topbar from './components/Topbar/Topbar';
import MapComponent from './components/MapComponent/MapComponent';
import SignInModal from './components/SignInModal/SignInModal';
import { useState, useEffect } from 'react';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';
import { jwtDecode } from 'jwt-decode';
import api from './api';

interface AuthTokenPayload {
  exp: number;
}

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    auth()
  })

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)
    try {
      const res = await api.post("/api/token/refresh/", { refresh: refreshToken });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true)
      } else {
        setIsAuthorized(false)
      }
    } catch (error) {
      console.log(error)
      setIsAuthorized(false)
    }
  }

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (!token) {
      setIsAuthorized(false)
      return
    }

    const decoded = jwtDecode<AuthTokenPayload>(token);
    const tokenExpiration = decoded.exp
    const now = Date.now() / 1000

    if (tokenExpiration < now) {
      await refreshToken()
    } else {
      setIsAuthorized(true)
    }
  }

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false)
  }

  return (
    <>
      <Topbar handleOpen={handleOpen} isAuthorized={isAuthorized}></Topbar>
      <MapComponent></MapComponent>
      <SignInModal show={isOpen} handleClose={handleClose}></SignInModal>
    </>
  )
}

export default App
