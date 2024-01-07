import '../CSS/Nav.css'
import { IoMdHome, IoMdMail, IoIosCreate } from "react-icons/io"
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaBowlFood, FaBookOpen } from "react-icons/fa6";
import { TbMenu } from "react-icons/tb";
import { useState } from 'react';
import { motion } from 'framer-motion';

function Nav() {

    let flag = 0;
    const handlemenu = () => {
        const menubar = document.querySelector('#menubar')
        const menulinks = document.querySelector("#links")
        if (flag == 0) {

            menulinks.className = "open";
            flag = 1;
            console.log("open");

        }
        else if (flag == 1) {

            menulinks.className = "";
            flag = 0;
            console.log("close");

        }
    }


    const logoVariants = {
        hidden: { opacity: 0, scale: 1, x:0},
        visible: { opacity: 1, scale: 1, x:0},
    };


    const navVariants = {
        hidden: { opacity: 0, scale: 1, y: "-25vh" },
        visible: { opacity: 1, scale: 1, y: 0 },
    };


    return (
        <div className="nav">
            <TbMenu id='menubar' onClick={handlemenu} />
            <motion.div className="logo"
                variants={navVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.8, delay: 0}}
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
                    >
                        <p className='var'>Create</p>
                        <IoIosCreate className='home-icon' />
                    </motion.div>
                </Link>

                {/* <Link to="Aboutus">
                    <div className="header-links">
                        <p className='var'>About</p>
                        <FaBookOpen className='home-icon' />
                    </div>
                </Link> */}


                {/* <div className="header-links">
                    <p className='var'>Contact</p>
                    <IoMdMail className='home-icon'/>
                </div> */}

            </div>
        </div>
    );
}

export default Nav;