import { IoMdCloudUpload } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../CSS/Create.css'
import { useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Userinput from "../components/UserSignUp";
import { useAuthcontext } from "../hooks/useAuthcontext";
function Create() {


    const [title, setTitle] = useState('')
    const [time, setTime] = useState('')
    const [cuisine, setCuisine] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [recipe, setrecipe] = useState('')
    const [image, setImage] = useState('')
    const [submit, setSubmit] = useState(false)
    const {user} = useAuthcontext()
    const navigate = useNavigate()
    const api_url = import.meta.env.VITE_SERVER_URL
    const notify = () => toast.success('recipe added successfully ! ', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            alert('not logged in')
            return
        }
        setSubmit(true);
        const recipeee = { title, time, image, cuisine, recipe, ingredients }
        const res = await fetch(`${api_url}api/recipe`, {
            method: 'POST',
            body: JSON.stringify(recipeee, null, 2),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await res.json()
        if (res.ok) {
            notify()
            navigate("/Recipes")

            setCuisine('')
            setTime('')
            setTitle('')
            setImage('')
            setIngredients('')
            setrecipe('')

            console.log('new recipe', json)
            setSubmit(false)





        }
    }
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

    return (
        <>
            <ToastContainer />

            <div className="create" >

                <form className="add-recipe-form" onSubmit={handleSubmit}>
                    <h2>Add new recipe</h2>

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
                        required
                    />
                    <div className='submit-load1'>
                    <button>Submit</button>
                    {submit && <pre> </pre>}
                    </div>
                </form>

            </div>
        </>
    );
}


export default Create;