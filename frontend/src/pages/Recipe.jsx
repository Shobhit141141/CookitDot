import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import { IoPrint } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { RiEditBoxFill } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import { useAuthcontext } from "../hooks/useAuthcontext";
import { jwtDecode } from "jwt-decode"

import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import '../CSS/Recipe.css'
function recipe() {
    const { id } = useParams();
    const [recipee, setrecipe] = useState(null)
    const [loading, setLoading] = useState(true)
    const [submit, setSubmit] = useState(true)
    const [owner, ownercheck] = useState(false)
    const { user } = useAuthcontext()
    const api_url = import.meta.env.VITE_SERVER_URL
    const navigate = useNavigate()
    useEffect(() => {
        const fetchrecipe = async () => {
            const response = await fetch(`${api_url}api/recipe/` + id,
                {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
            const json = await response.json()

            if (response.ok) {
                const token = user.token
                const decodedToken = jwtDecode(token);
                const userId = decodedToken._id;
                if (json.user_id === userId) {
                    ownercheck(true)
                }
                setrecipe(json)
                console.log('hello')
                console.log()
                setLoading(false)
            }
        }
        if (user) {
            fetchrecipe()
        }

    }, [])
    const notify = () => toast.success('recipe deleted successfully ! ', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "recipe",
    });

    const handleDelete = async () => {

        if (!user) {
            return
        }
        let text = `Do you want to delete ${recipee.title} recipe`;
        if (confirm(text) == true) {
            try {
                const res = await fetch(`${api_url}api/recipe/` + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (res.ok) {

                    notify()
                    navigate("/Recipes")
                } else {

                    console.error('Failed to delete recipe');
                }
            } catch (error) {
                console.error('Error deleting recipe:', error);

            }
        }

    };

    return (

        <div>
            <ToastContainer />
            <div className="recipe-options">
                <div className="header-links2" onClick={handlePrint}>
                    <IoPrint className='home-icon2' />
                </div>

                {owner && <div className="header-links2" onClick={handleDelete}>
                    <AiFillDelete className='home-icon2' />
                </div>}

                {owner && <Link to={`/Update/${id}`}>
                    <div className="header-links2">
                        <RiEditBoxFill className='home-icon2' />
                    </div>
                </Link>}

                
            </div>
            <div className="single-recipe" ref={componentRef}>
                {loading && (
                    <h2 className="loading-msg">Loading...</h2>
                )}
                {recipee && (

                    <div className="detailed-recipe" >

                        <div className="recipe-titles">
                            <div className="recipe-details-titles">
                                <h1>{recipee.title}
                                    <div className="logo">
                                        <h6>by CookIt.</h6>
                                    </div>
                                </h1>
                                <h3><pre>Time : </pre>{recipee.time} min</h3>
                                <h3><pre>Cuisine : </pre>{recipee.cuisine}</h3>
                            </div>
                            <img src={recipee.image} />
                        </div>

                        <div className="ingredients">
                            <h2>Ingredients</h2>
                            <pre>{recipee.ingredients}</pre>
                        </div>
                        <div className="recipe">
                            <h2>recipe</h2>
                            <pre>{recipee.recipe}</pre>
                        </div>
                    </div>
                )}


            </div>

        </div>
    );
}

export default recipe;