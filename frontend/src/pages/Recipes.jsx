import "../CSS/Recipes.css"
import { IoSearch } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { Suspense, lazy } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow"

import { useAuthcontext } from "../hooks/useAuthcontext";
import { IoMdHome } from "react-icons/io";

function Recipes() {
    const [search, setSearch] = useState('')
    const [recipes, setrecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const [submit, setSubmit] = useState(true)
    const [noresult, setresult] = useState(false)
    const [error, seterror] = useState('')


    const { user } = useAuthcontext()
    const cataloguevariants = {
        hidden: { opacity: 0, y: -100, scale: 0 },
        visible: {
            opacity: 1, y: 0, scale: 1,
            transition: { duration: 0.6, staggerChildren: 0.4 }
        }
    }

    const api_url = import.meta.env.VITE_SERVER_URL

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`${api_url}api/recipe/`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (!response.ok) {
                    // Handle specific HTTP error codes
                    setLoading(false);
                    seterror("Failed to fetch :(");
                    return;
                }

                const json = await response.json();
                const sortedRecipes = json.sort((a, b) => {
                    // Assuming 'createdAt' is a date field in the recipe object
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });

                setLoading(false);
                setresult(true);
                setrecipes(sortedRecipes);
            } catch (error) {
                console.error('Error fetching data:', error.message);

                if (error.message === 'Failed to fetch') {
                    setLoading(false);
                    seterror('Network error occurred. Please check your connection.');
                } else {
                    setLoading(false);
                    seterror('An unexpected error occurred.');
                }
            }
        };
        if (user) {
            fetchRecipe();
        }

    }, [user]);

    const filteredRecipes = recipes.filter((item) => {
        return search.toLowerCase() === ''
            ? item // If search is empty, keep all items
            : item.title.toLowerCase().includes(search);
    });






    return (
        <div className="recipes-page">
            <motion.header

                initial={{ opacity: 0, x: "-100%" }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}

                className="header">

                <h1>Try something new today </h1>

                <div className="search">
                    <input type="text" placeholder="search for recipe" onChange={(e) => setSearch(e.target.value)} />
                    <IoSearch className="search-icon" />
                </div>

            </motion.header>

            <Link to='/UserRecipe'>
            <div className="my-recipe-link" >
                <h4>My Recipes</h4>
            </div>
            </Link>

            <motion.div className="recipes-section"
                variants={cataloguevariants}
                initial="hidden"
                animate="visible"
            >

                {loading && (
                    <h2 className="loading-msg2">Loading...</h2>
                )}
                {error && (
                    <h2 className="error-msg">{error}</h2>
                )}
                {filteredRecipes.length > 0

                    ? filteredRecipes.map((item) => (



                        <motion.div className="recipe-card" key={item._id}
                            variants={cataloguevariants}


                        >
                            <Link to={`/Recipes/${item._id}`}>
                                <div className="overlay">


                                    {/* <img src={item.image} alt="" className="recipeimg" /> */}

                                    <Suspense fallback={<div>Loading img..</div>}>
                                        <img src={item.image} alt="" className="recipeimg" />
                                    </Suspense>

                                    <div className="read-more">
                                        <p>See full</p>
                                    </div>
                                </div>
                                <div className="recipe-details">
                                    <h3>{item.title}</h3>
                                    <div>
                                        <span>
                                            <FaRegClock />
                                            <p>{item.time} mins</p>
                                        </span>
                                        <p>{item.cuisine}</p>
                                    </div>
                                    <p className="createdat">created {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}</p>
                                </div>
                            </Link>

                        </motion.div>


                    )

                    )
                    : (noresult && <div className="noresult"> <h3>No result found :( <br /> Please enter searchfield in lowerCase only</h3> </div>)}



            </motion.div>

        </div>


    );
}

export default Recipes;