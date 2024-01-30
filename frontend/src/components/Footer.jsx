import '../CSS/Footer.css'
import ContactForm from './ContactForm';
import Reach from './Reach';
import { motion } from 'framer-motion';
function Footer() {


    return (
        <div className="footer"
        
        >
            {/* contact form */}
            <div className="contactform"><ContactForm /></div>

            {/* reach out to us */}
            <div className="contactus">
                
                <Reach />
            </div>
        </div>
    );
}

export default Footer;