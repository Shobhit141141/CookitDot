import '../CSS/Nav.css'
import { IoMdHome, IoMdMail, IoIosCreate } from "react-icons/io"
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaBowlFood, FaBookOpen } from "react-icons/fa6";
import { TbMenu } from "react-icons/tb";
import { useState, useEffect, useRef } from 'react';
import { color, motion, spring } from 'framer-motion';
import Userinput from './UserSignUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdLogout } from "react-icons/md";
import { useLogout } from '../hooks/useLogout';
import { useAuthcontext } from '../hooks/useAuthcontext';

import Confetti from 'react-confetti'
function Nav() {

    let flag = 0;
    const [userr, setUser] = useState(false)
    const { Logout } = useLogout()
    const { user } = useAuthcontext()

    const handlemenu = (event) => {
        const menubar = document.querySelector('#menubar')
        const menulinks = document.querySelector("#links")
        const nav = document.querySelector("#nav")
        if (flag == 0) {

            menulinks.className = "open";
            flag = 1;


        }
        else if (flag == 1) {

            menulinks.className = "";
            flag = 0;


        }

    }
    const notify = () => toast.success(`Hello ${user.username} 
    email : ${user.email}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const [isConfettiActive, setIsConfettiActive] = useState(false);

    const handleClick = (e) => {
        // Set the state to activate confetti
        e.preventDefault();
        e.stopPropagation();
        setIsConfettiActive(true);
        console.log('confetti clicked')

        // Reset the state after a delay to stop confetti
        setTimeout(() => {
            setIsConfettiActive(false);
        }, 2000); // Adjust the delay as needed
    };
    const confettiConfig = {
        angle: 90,
        spread: 360,
        startVelocity: 40,
        elementCount: 70,
        dragFriction: 0.12,
        duration: 1000,
        stagger: 3,
        width: '100vw',
        height: '100vh',
        colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
    };

    document.onclick = function (e) {
        const menubar = document.querySelector('#menubar')
        const menulinks = document.querySelector("#links")
        const nav = document.querySelector("#nav")
        if (!menulinks.contains(e.target) && !menubar.contains(e.target)) {
            menulinks.className = "";
            flag = 0;

        }
    }

    const handlelogout = () => {
        Logout()
    }


    const handlelinkClick = () => {
        const menulinks = document.querySelector("#links")
        const id = document.querySelector("#logo")
        // id.scrollIntoView({ block: 'start', behavior: 'smooth' })
        menulinks.className = "";
        flag = 0

        console.log("close via link");
    }
    let flag2 = 0;
    const handleUserClick = () => {
        setUser((prevUser) => !prevUser)
    }



    const logoVariants = {
        hidden: { opacity: 0, scale: 1, x: 0 },
        visible: { opacity: 1, scale: 1, x: 0 },
    };


    const navVariants = {
        hidden: { opacity: 0, scale: 1, y: "-25vh" },
        visible: { opacity: 1, scale: 1, y: 0 },
    };
    const tbMenuVariants = {
        hidden: { opacity: 0, scale: 1, x: 0 },
        visible: { opacity: 1, scale: 1, x: 0 },
    };
    const userinputVariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: { opacity: 1, scale: 1 },
    };

   


    return (
        <>
          

            <motion.div
                id='menubar'
                variants={tbMenuVariants}
                initial="hidden"
                animate="visible"
                drag  // Enable drag property
                dragMomentum={false} // Disable momentum for smoother dragging
                onClick={event => {
                    handlemenu(event);
                }}
            >
                <TbMenu />
            </motion.div>

            {/* <div className="nav" id='nav'>
                <TbMenu  id='menubar' onClick={event => {
                    handlemenu(event)
                }} /> */}
            <div className='navbar-area'>
                <motion.div className="logo" id='logo'
                    variants={navVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.8, delay: 0 }}
                >
                    <h1>CookIt.</h1>

                </motion.div>
                <div id="links"

                >

                    {/* <p>Home <div><IoMdHome className='home-icon'/></div> </p>
                <p>recipes</p>
                <p>Create</p> */}

                    <Link to="/">
                        <motion.div className="header-links"
                            variants={navVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.8, delay: 0 }}
                            onClick={handlelinkClick}
                        >
                            <p className='var'>Home</p>
                            <IoMdHome className='home-icon' />
                        </motion.div>
                    </Link>

                    <Link to="/Recipes">
                        <motion.div className="header-links"
                            variants={navVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.8, delay: 0 }}
                            onClick={handlelinkClick}
                        >
                            <p className='var'>Recipe</p>
                            <FaBowlFood className='home-icon' />
                        </motion.div>
                    </Link>

                    <Link to="Create">
                        <motion.div className="header-links"
                            variants={navVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.8, delay: 0 }}
                            onClick={handlelinkClick}
                        >
                            <p className='var'>Create</p>
                            <IoIosCreate className='home-icon' />
                        </motion.div>
                    </Link>

                    {!user &&
                        <Link to="Login">
                            <motion.div
                                variants={navVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.8, delay: 0 }}
                                className="user-links"
                                onClick={handlelinkClick}
                            >
                                <FaUser className='user-icon' />
                            </motion.div>
                        </Link>
                    }

                    {user &&
                        <motion.div
                            variants={navVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.8, delay: 0 }}
                            className="user-links"
                            onClick={handlelogout}
                        >
                            <MdLogout className='user-icon' />
                        </motion.div>
                    }



                </div>
            </div>
            {user && <motion.span
                variants={tbMenuVariants}
                initial="hidden"
                animate="visible"
                drag
                dragMomentum={false}
                style={{ color: 'white', position: 'absolute' }}

                className='username_navbar'
            >

                <h4>{user.username}</h4>
            </motion.span>}


        </>
    );
}

export default Nav;