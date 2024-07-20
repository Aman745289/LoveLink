import React from 'react'
import Nav from '../components/nav'
import Authmodal from '../components/AuthModal'
import { useState } from 'react'


const Home=() => {
   const [showModal, setShowModal] = useState(false)
   const[isSignUp, setisSignUp]=useState(true)


  const authToken=false


  const handleclick = ()=>{
    console.log('clicked')
    setShowModal(true)
    setisSignUp(true)
  }


    return (
      <div class="overlay">
      <Nav minimal={false} 
      
      setShowModal={setShowModal} 
      showModal={showModal}
      setisSignUp={setisSignUp}
      />
      <div className="home">
      
        <h1 className='title'>swipe right</h1>
        <button className="primary-btn" onClick={handleclick}>
          {authToken ? 'signout' : 'create account'}
        </button>

        {showModal && (
           <Authmodal setShowModal={setShowModal}  isSignUp={isSignUp} />
         )}

      </div>
      </div>
      
    );
  }
  
  export default Home;