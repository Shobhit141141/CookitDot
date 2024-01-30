import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import signup from '/assets/signup.jpg';
import '../CSS/UserLogIn.css'
import { IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5';
import { useLogin } from '../hooks/useLogin';
import { Link } from 'react-router-dom';

const UserLogIn = () => {

    const [showPassword, setShowPassword] = useState(false);
    const { login, error, loading } = useLogin()
    const handleLogin = async (e) => {
        e.preventDefault();
        setSubmit('. . .');
    
        await login(formData.username, formData.password);
   
    
        setSubmit('Log In');
    };

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    const initialFormdata = {
        username: '',
        email: '',
        password: '',
    }

    const [formData, setFormData] = useState(initialFormdata)
    const [submit, setSubmit] = useState('Log in')

    const notify = () => toast.success('Logged In successfully !', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        const { username, password } = formData;

        if (!name.trim()) {
            errors.name = 'Name is required';
        }



        if (!password.trim()) {
            errors.password = 'password is required';
        }




        setErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if (isValid) {
            setSubmit(true)
            console.log('LogIn Successful')
            setSubmit(false)
        }
    };

    
    



    return (
        <div id="c2-login">

            <div className="login">





                <div className="login-header">
                    <img src={signup} alt="" />
                    {error && <p className='error-msg-signup' style={{ color: 'red' }}> {error}</p>}

                </div>

                <form onSubmit={handleLogin} className='loginform' >

                    <div className="inputs-login">
                        <div >
                            <label className='login-label'>
                                Name:
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    id='name2-input'
                                />
                                {errors.name && <span className="error-msg">{errors.name}</span>}
                            </label>
                        </div>



                        <div>
                            <label className='login-label'>
                                Password:
                                <div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}

                                        id='pass2-input'
                                    />
                                    <span onClick={togglePasswordVisibility}
                                        className='eye-icon'
                                    >
                                        {showPassword ? <IoEyeOffSharp /> : <IoEyeSharp />}
                                    </span>
                                </div>
                                {errors.password && <span className="error-msg">{errors.password}</span>}
                            </label>
                        </div>


                        <button id="loginbtn">
                            {submit}
                        </button>
                        <div className='change-login'>
                            <h4>Don't have an account</h4><Link to='/SignUp'><p> SignUp</p></Link></div>

                    </div>
                </form>









               
                {<ToastContainer/>}
            </div>

        </div>


    );
};

export default UserLogIn;
