import { useEffect, useRef } from 'react';
import '../CSS/Aboutus.css'
import about from '../aboutitems'
import { motion, useAnimation, useInView } from 'framer-motion'

function Aboutus() {
    const ref = useRef(null)
    const isinview = useInView(ref, { once: true })

    const mainctrl = useAnimation()
    useEffect(() => {
        if (isinview) {
            mainctrl.start('visible')
        }
    }, [isinview])


    const cataloguevariants = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1, scale: 1,
            transition: { duration: 0.6, staggerChildren: 0.8 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };
    return (
        <div className='about-page' >
            <h1 className="aboutus" >
                COOKING CHRONICLES.
                <p ref={ref}>Our secret to create perfect recipe </p>
            </h1>

            <motion.div className="about-content"
                
                variants={cataloguevariants}
                initial="hidden"
                animate={mainctrl}
            >

                {about.map((items, index) => (


                    <motion.span key={index} id={index}

                        variants={cataloguevariants}

                    >

                        <div className="about-icon" >
                            <img src={items.img} alt="" />
                        </div>
                        <div className="about-detail">
                            <h2>{items.title}</h2>
                            <p>{items.content}</p>
                        </div>

                    </motion.span>

                )

                )}
            </motion.div>
        </div>


    );
};




export default Aboutus;