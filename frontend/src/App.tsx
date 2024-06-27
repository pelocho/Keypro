import 'bootstrap/dist/css/bootstrap.min.css';
import Topbar from './components/Topbar/Topbar';
import MapComponent from './components/MapComponent/MapComponent';
import SignInModal from './components/SignInModal/SignInModal';
import { useState } from 'react';


function App() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false)
  }

  return (
    <>
      <Topbar handleOpen={handleOpen}></Topbar>
      <MapComponent></MapComponent>
      <SignInModal show={isOpen} handleClose={handleClose}></SignInModal>
    </>
  )
}

export default App
