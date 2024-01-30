import '../CSS/Home.css'

import images from '../catalogueitems'
import Aboutus from '../pages/Aboutus'
import Nav from '../components/Nav';
import { motion } from "framer-motion"

import { useEffect, useState } from 'react';
import Userinput from '../components/UserSignUp';
function Home() {


    

    const cataloguevariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: { opacity: 1, scale: 1 },
    };

    return (
        <div>
            <div className="home">
          
                <div className="home-content">
                    <motion.section className="monologue"
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 2 }}
                    >
                        <motion.h1
                            initial={{ opacity: 0, x: "-50vw" }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            CREATE.
                        </motion.h1>
                        <motion.h1
                            initial={{ opacity: 0, x: "-50vw" }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            EAT.
                        </motion.h1>
                        <motion.h1
                            initial={{ opacity: 0, x: "-50vw" }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            REPEAT.
                        </motion.h1>
                    </motion.section>

                    <section className="catalogue">
                        <div className="cards">

                            <div className="card1">
                                <motion.div className="card"
                                    initial="hidden"
                                    animate="visible"
                                    variants={cataloguevariants}
                                    
                                  
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                >
                                    <img src={images.a} alt="" />
                                </motion.div>

                                <motion.div className="card"
                                    initial="hidden"
                                    animate="visible"
                                    variants={cataloguevariants}
                                    
                                  
                                    transition={{ duration: 0.8, delay: 0.8 }}
                                >
                                    <img src={images.b} alt="" />
                                </motion.div>
                            </div>

                            <div className="card2">
                                <motion.div className="card"
                                    initial="hidden"
                                    animate="visible"
                                    variants={cataloguevariants}
                                   
                                  
                                    transition={{ duration: 0.8, delay: 1 }}
                                >
                                    <img src={images.c} alt="" />
                                </motion.div>

                                <motion.div className="card"
                                    initial="hidden"
                                    animate="visible"
                                    variants={cataloguevariants}
                                    
                                    transition={{ duration: 0.8, delay: 1.2 }}
                                >
                                    <img src={images.e} alt="" />
                                </motion.div>
                            </div>
                        </div>
                    </section>



                </div>


            </div>
            <Aboutus />
        </div>
    );
}

export default Home;