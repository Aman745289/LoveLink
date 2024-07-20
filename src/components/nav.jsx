import React from 'react';
import colorLogo from "../images/color-logo.png";



const Nav=({minimal, setShowModal,showModal, setisSignUp}) => {
  
  const handleclick = () => {
    setShowModal(true)
    setisSignUp(false)
    
  };
  const authToken=false



    return (
      <nav>
        <div className="logo-container">
            <img className="logo" src={minimal ? colorLogo :colorLogo } alt="logo"/>
             <h3 className='home-btn'>About</h3>
        </div>
        {!authToken && !minimal &&<button className="nav-button"
        onClick={handleclick}
        disabled={showModal}
        >Log in</button>}
      </nav>
    );
  }
  
  export default Nav;