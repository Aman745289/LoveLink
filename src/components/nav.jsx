import React from 'react';
import colorLogo from "../images/color-logo.png";



const Nav=({minimal, authToken, setShowModal,showModal, setisSignUp}) => {
  
  const handleclick = () => {
    setShowModal(true)
    setisSignUp(false)
    
  };



    return (
      <nav>
        <div className="logo-container">
            <img className="logo" src={colorLogo } alt="logo"/>
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