import 'bootstrap/dist/css/bootstrap.min.css';
import Topbar from './components/Topbar/Topbar';
import MapComponent from './components/MapComponent/MapComponent';
import { useState, useEffect } from 'react';
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';
import { jwtDecode } from 'jwt-decode';
import api from './api';
import SessionControlModal from './components/SessionControlModal/SessionControlModal';
import MyMarkersPopup from './components/MyMarkersPopup/MyMarkersPopup';

interface AuthTokenPayload {
  exp: number;
}

function App() {
  const [markers, setMarkers] = useState([]);
  const [myMarkers, setMyMarkers] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isOpenSignIn, setIsOpenSignIn] = useState(false);
  const [isOpenMyMarkers, setIsOpenMyMarkers] = useState(false);
  const [sessionControl, setSessionControl] = useState("");

  useEffect(() => {
    getMarkers();
    auth();
  }, []);

  function getMarkers() {
    api.get("/api/markers/")
      .then((res) => res.data)
      .then((data) => setMarkers(data))
      .catch((err) => alert(err));
  }

  function getMyMarkers() {
    api.get("/api/mymarkers/")
      .then((res) => res.data)
      .then((data) => setMyMarkers(data))
      .catch((err) => alert(err));
  }

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

  function handleOpenSignIn() {
    setSessionControl("/api/token/")
    setIsOpenSignIn(true);
  }

  function handleCloseSignIn() {
    setIsOpenSignIn(false)
  }

  function handleOpenRegister() {
    setSessionControl("/api/user/register/");
    setIsOpenSignIn(true);
  }

  function handleLogOut() {
    localStorage.clear()
    window.location.reload()
  }

  function handleOpenMyMarkers() {
    getMyMarkers();
    setIsOpenMyMarkers(true);
  }

  function handleCloseMyMarkers() {
    setIsOpenMyMarkers(false);
  }

  return (
    <>
      <Topbar handleOpenSignIn={handleOpenSignIn} handleOpenMyMarkers={handleOpenMyMarkers} handleOpenRegister={handleOpenRegister} handleLogOut={handleLogOut} isAuthorized={isAuthorized}></Topbar>
      <MapComponent markers={markers} isAuthorized={isAuthorized}></MapComponent>
      <SessionControlModal show={isOpenSignIn} route={sessionControl} handleCloseSignIn={handleCloseSignIn}></SessionControlModal>
      <MyMarkersPopup show={isOpenMyMarkers} myMarkers={myMarkers} handleCloseMyMarkers={handleCloseMyMarkers}></MyMarkersPopup>
    </>
  )
}

export default App
