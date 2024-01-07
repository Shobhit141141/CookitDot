import "../CSS/Recipes.css"
import { IoSearch } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'


function recipes() {
    const [search, setSearch] = useState('')
    const [recipes, setrecipes] = useState([])
    const [loading, setLoading] = useState(true)
    const [noresult, setresult] = useState(false)
    const [error, seterror] = useState("")
    const cataloguevariants = {
        hidden: { opacity: 0, y: -100, scale: 0 },
        visible: {
            opacity: 1, y: 0, scale: 1,
            transition: { duration: 0.6, staggerChildren: 0.4 }
        }
    }
    useEffect(() => {
        const fetchrecipe = async () => {
            const response = await fetch('https://cookit-backend.onrender.com/api/recipe')



            try {
                const json = await response.json()
                if (!response.ok) {
                    // Handle specific HTTP error codes
                    setLoading(false)
                    seterror("failed to fetch :(")
                }
                if (response.ok) {
                    setLoading(false)
                    setresult(true)
                    setrecipes(json)
                }
            } catch (error) {


                console.error('Error fetching data:', error.message);
                if (error.message === 'Failed to fetch') {
                    setLoading(false)
                    seterror('Network error occurred. Please check your connection.')
                }
            }
        }
        fetchrecipe()
    }, [])
    const filteredRecipes = recipes.filter((item) => {
        return search.toLowerCase() === ''
            ? item // If search is empty, keep all items
            : item.title.toLowerCase().includes(search);
    });




    return (
        <div className="recipes-page">
            <header className="header">
                <h1>Try something new today </h1>
                <div className="search">
                    <input type="text" placeholder="search for recipe" onChange={(e) => setSearch(e.target.value)} />
                    <IoSearch className="search-icon" />
                </div>
            </header>

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
                                    <img src={item.image} alt="" className="recipeimg" />
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
                                </div>
                            </Link>

                        </motion.div>


                    )

                    )
                    : (noresult && <div className="noresult"> <h3>No result found :(</h3> </div>)}



            </motion.div>

        </div>


    );
}

export default recipes;