import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../CSS/Contact.css'

import { motion } from 'framer-motion';
const ContactForm = () => {
  const initialFormdata = {
    name: '',
    // phone: '',
    email: '',
    message: '',
  }

  const [formData, setFormData] = useState(initialFormdata)
  const [submit, setSubmit] = useState(false)
  const form = useRef();
  const notify = () => toast.success('Message sent successfully !', {
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
    const { name, email, message } = formData;

    if (!name.trim()) {
      errors.name = 'Name is required';
    }



    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email address';
    }

    if (!message.trim()) {
      errors.message = 'Message is required';
    }


    // const phonePattern = /^[0-9]{10}$/;
    // if (!phonePattern.test(phone.trim())) {
    //   errors.phone = 'Invalid phone number (10 digits)';
    // }

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
      emailjs.sendForm('service_glkpokz', 'template_ftyxuwz', form.current, 'XhhCt2I1IkNP1b5K7')
        .then((result) => {
          console.log(result.text);
          notify();
          setFormData(initialFormdata)
          setSubmit(false)


        }, (error) => {
          console.log(error.text);
        });
    }
  };



  return (
    <>
      <motion.pre
        // initial={{ opacity: 0, x: "-100%" }}
        // whileInView={{ opacity: 1, x: 0 }}
        // transition={{ duration: 0.4, delay: 0.6 }}

        className='contact-title'>
        Suggest. Recommend. Advise.
      </motion.pre>
      <motion.form ref={form} onSubmit={handleSubmit}
      // initial={{ opacity: 0, x: "-100%" }}
      // whileInView={{opacity:1,x:0}}
      // transition={{ duration: 0.4, delay: 0.6}}

      >




        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error-msg">{errors.name}</span>}
          </label>
        </div>
        {/* <div>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="error-msg">{errors.phone}</span>}
          </label>
        </div> */}

        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </label>
        </div>

        <div>
          <label>
            Message:
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}

            />
            {errors.message && <span className="error-msg">{errors.message}</span>}
          </label>
        </div>
        <div className='submit-load1'>
          <button type="submit" onClick={validateForm} className='submit-btn'>Submit</button>

          {submit && <pre> </pre>}
        </div>

        <ToastContainer />
      </motion.form>
    </>
  );
};

export default ContactForm;
