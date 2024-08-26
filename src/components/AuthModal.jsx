import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie'


const Authmodal=({setShowModal, isSignUp}) => {
  const [Name, setName]=useState(null)
  const [email, setEmail]=useState(null)
  const [password, setPassword]=useState(null)
  const [confirmPassword, setconfirmPassword]=useState(null)
  const [error, setError]=useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  let navigate = useNavigate()

  console.log(Name, email, password, confirmPassword)

  const handleClick = () => {
    setShowModal(false)
  }
   
  const handlesubmit = async(e) => {
       e.preventDefault()
       try{
         if(isSignUp && ( password !== confirmPassword)){
          setError('password is incorrect')
          return 
         }
         console.log('posting', email, password);
         
         const response = await axios.post(`http://localhost:5000/${isSignUp ?'signup' : 'login'}`, {email,password})
         
         
         setCookie('AuthToken', response.data.authToken)
         setCookie('UserId', response.data.userId)
         const success = response.status === 201

         if(success && isSignUp) navigate('/onboarding')
         if(success && !isSignUp) navigate('/Dashboard')
       }catch(err){
        console.log(err)
       }
      }

  
    return (
      <div className="auth-modal">
        <div className="close-icon" onClick={handleClick}>x</div>
        
        <h2>{isSignUp ? 'CREATE ACCOUNT': 'LOG IN'}</h2>
        <p>By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
        <form onClick={handlesubmit}>
        <input
             type="text"
             id="Name"
             name="Name"
             placeholder="Name"
             required={true}
             onChange={(e) => setName(e.target.value)}
          />
          <input
             type="email"
             id="email"
             name="email"
             placeholder="email"
             required={true}
             onChange={(e) => setEmail(e.target.value)}
          />
          <input
             type="password"
             id="password"
             name="password"
             placeholder="password"
             required={true}
             onChange={(e) => setPassword(e.target.value)}
          />
          {isSignUp && <input
             type="password"
             id="password-check"
             name="password-check"
             placeholder="confirm password"
             required={true}
             onChange={(e) => setconfirmPassword(e.target.value)}
          />}
          <input className='secondary-btn' type="submit" />
          <p>{error}</p>
          <hr/>
          <h2>GET THE APP</h2>
        </form>
      </div>
    );
  }
  
  export default Authmodal;