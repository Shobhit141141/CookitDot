import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from 'react-to-print';
import { IoPrint } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../CSS/Recipe.css'
function recipe() {
    const { id } = useParams();
    const [recipee, setrecipe] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchrecipe = async () => {
            const response = await fetch('https://cookit-backend.onrender.com/api/recipe/' + id)
            const json = await response.json()

            if (response.ok) {
                setrecipe(json)
                setLoading(false)
            }
        }
        fetchrecipe()
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
        let text = `Do you want to delete ${recipee.title} recipe`;
        if (confirm(text) == true) {
            try {
                const res = await fetch('https://cookit-backend.onrender.com/api/recipe/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
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

            <div className="recipe-options">
                <div className="header-links2" onClick={handlePrint}>
                    <IoPrint className='home-icon2' />
                </div>
                <div className="header-links2" onClick={handleDelete}>
                    <AiFillDelete className='home-icon2' />
                </div>
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