import { IoMdCloudUpload } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../CSS/Create.css'
import { useState, useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthcontext } from "../hooks/useAuthcontext";
import axios from "axios";

function Update() {

    const { id } = useParams();
    const [title, setTitle] = useState('')
    const [time, setTime] = useState('')
    const [cuisine, setCuisine] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [recipe, setrecipe] = useState('')
    const [image, setImage] = useState('')
    const [submit, setSubmit] = useState(false)
    const { user } = useAuthcontext()
    const navigate = useNavigate()

    const notify = () => toast.success('recipe updated successfully ! ', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
    });



    function convertToBase64(e) {
        console.log(e)
        var reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setImage(reader.result)
        }
        reader.onerror = () => {
            console.log("error: ", error)
        }
    }


    const headers = {
        'Content-Type': 'application/json',
        'Authorization': user ? `Bearer ${user.token}` : '',
    };

    const config = {
        headers: headers,
    };
    useEffect(() => {
        if(!user){
            alert('not logged in')
            return
        }


        axios.get('http://localhost:5000/api/recipe/' + id, config)
            .then(res => {
                setTitle(res.data.title)
                setTime(res.data.time)
                setCuisine(res.data.cuisine)
                setIngredients(res.data.ingredients)
                setrecipe(res.data.recipe)
                setImage(res.data.image)
            })
            .catch(err => {
                console.log(err)
            })
    }, [user])


    const handleSubmit = async (e) => {
     
        e.preventDefault()
        setSubmit(true)
        const recipeee = { title, time, image, cuisine, recipe, ingredients }
        if(user){
            axios.patch('http://localhost:5000/api/recipe/' + id, recipeee, config)
            .then(res => {
                notify()
                navigate("/Recipes")
            })
        }

    }

    return (
        <>
            <ToastContainer />
            <div className="create">

                <form className="add-recipe-form" onSubmit={handleSubmit}>
                    <h2>Update </h2>

                    <label>Title</label>
                    <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        required
                    />

                    <label>Time in mins </label>
                    <input
                        type="text"
                        onChange={(e) => setTime(e.target.value)}
                        value={time}
                        required
                    />
                    <h6>please enter numeric only , eg (120) not (120 min)</h6>
                    <br />
                    <label>Cuisine</label>
                    <input
                        type="text"
                        onChange={(e) => setCuisine(e.target.value)}
                        value={cuisine}
                        required
                    />

                    <label>Ingredients</label>
                    <textarea name="recipe" onChange={(e) => setIngredients(e.target.value)}
                        value={ingredients}
                        required cols="30" rows="5"></textarea>

                    <label>recipe</label>
                    <textarea name="recipe" onChange={(e) => setrecipe(e.target.value)}
                        value={recipe}
                        required cols="30" rows="10"></textarea>

                    <label>Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={convertToBase64}

                    />
                    <div className="submit-load">
                        <button>Submit</button>
                        {submit && <pre> </pre>}
                    </div>

                </form>

            </div>

        </>
    );
}


export default Update;