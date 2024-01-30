import React, { useState } from 'react';

import { BiCheck } from "react-icons/bi";
import { FaCheck, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';
import '../CSS/User.css';
import signupimg from '/assets/signup.jpg';
import { useAuthcontext } from '../hooks/useAuthcontext';
import { useSignup } from '../hooks/useSignup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';


const UserSignUp = () => {
  // State for managing form data and validation
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [nameCheck, setNameCheck] = useState('');
  const [emailCheck, setEmailCheck] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [submit, setSubmit] = useState('Sign Up')
  const { signup, loading, error } = useSignup()


  const notify = () => toast.success('Sign Up Successful ! ', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  });

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmit('. . .')

    await signup(username, email, password)

    setSubmit('Sign Up')
  }

  // Validation functions
  function validateName() {
    const name = username.trim();
    if (name.length === 0 || !name.match(/^[A-Za-z][A-Za-z0-9]*$/) || name.includes(' ')) {
        setNameCheck(<FaTimes style={{ color: 'red' }} />);
        return false;
    }
    setNameCheck(<FaCheck style={{ color: 'green' }} />);
    return true;
}

  function validateEmail() {
    const mail = email.trim();
    if (mail.length === 0 || !mail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setEmailCheck(<FaTimes style={{ color: 'red' }} />);
      return false;
    }
    setEmailCheck(<FaCheck style={{ color: 'green' }} />);
    return true;
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function validatePassword() {
    const trimmedPassword = password.trim();
    if (trimmedPassword.length === 0 || !trimmedPassword.match(/^.{8,}$/)) {
      setPasswordCheck(<FaTimes style={{ color: 'red' }} />);
      return false;
    }
    setPasswordCheck(<FaCheck style={{ color: 'green' }} />);
    return true;
  }

  function validateForm(event) {
    if (!validateName() || !validateEmail() || !validatePassword()) {
      event.preventDefault();
    }
  }

  return (
    <>

      <div id="c2-signup">
        <div className="signup">





          <div className="signup-header">
            <img src={signupimg} alt="" />
            
            {error && <p className='error-msg-signup' style={{ color: 'red' }}> {error}</p>}

            <div className='change-signup'>
                <h4>Already have an account</h4>
                <Link to='/Login'
                ><p> LogIn</p>
                </Link>
                </div>
          </div>

          <form onSubmit={handleSubmit} className='loginform2'>

            <div className="inputs-signup">

              <div className="titlesforsignup">
                <p>Username</p>
                <div className="fields">
                  <input
                    type="text"
                    name="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyUp={validateName}
                    id='name-input'

                  />
                  <span>{nameCheck}</span>

                </div>

              </div>


              <div className="titlesforsignup">
                <p>Email</p>
                <div className="fields">
                  <input
                    type="email"
                    name="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyUp={validateEmail}
                    id='mail-input'
                  />
                  <span>{emailCheck}</span>
                </div>
              </div>


              <div className="titlesforsignup">
                <p>Password</p>
                <div className="fields">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyUp={validatePassword}
                    id='pass-input'
                  />
                  <span className='eye-icon2' onClick={togglePasswordVisibility} >
                    {showPassword ? <IoEyeOffSharp /> : <IoEyeSharp />}
                  </span>
                  <span className='password-check-icon'>
                    {passwordCheck}
                  </span>

                </div>
                <h5>use lowercase , uppercase and symbols</h5>
              </div>





              <button id="signupbtn"
                onClick={validateForm}
              >
                <pre>{submit}</pre>
              </button>

            





            </div>
          </form>

          {Object.keys(error).length === 0 && <ToastContainer />}
        </div>

      </div>
    </>
  );
};

export default UserSignUp;
