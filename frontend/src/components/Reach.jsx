import '../CSS/Reach.css'
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { RiInstagramFill } from "react-icons/ri";
import { BsLinkedin } from "react-icons/bs";
import { FaCookie } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from 'react-router-dom';
function Reach() {
  

    return (
        <div className="reachus">
            <div style={{ position: 'absoulte', top: '-10px' }} id='container' />
            <div className="contactus-2">
                <pre>Thankyou for coming this far
                </pre>
                <pre>Have a <FaCookie className='contact-us-icon' /></pre>
                <pre>Reach out to us </pre>
            </div>
            <span>
                <div className="quick-links">
                    <Link to="/">Home</Link>
                    <Link to="/recipes">Recipe</Link>
                    <Link to="/Create">Create</Link>
                </div>
                <div className="contact-details">
                    <p>89 Orc St., Minnesota</p>
                    <p>+1  952-564-9589</p>
                    <p>cookitdot@gmail.com</p>
                </div>
            </span>
            <div className="icons">
                <a href="https://maps.app.goo.gl/1mc9r83HjNGB2Yb58"><FaLocationDot className='footer-icons' /></a>
                <a href="mailto:shobhit141141@gmail.com"><IoMdMail className='footer-icons' /></a>
                <a href="tel:9958960178"><IoCall className='footer-icons' /></a>
                <a href="/"><RiInstagramFill className='footer-icons' /></a>

                <FaLinkedinIn className='footer-icons' />

            </div>

        </div>
    );
}

export default Reach;