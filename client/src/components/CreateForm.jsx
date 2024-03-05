import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'


const CreateForm = (props) => {
    const navigate = useNavigate() // redirection
    const {habitList, setHabitList} = props;
    const [category, setCategory] = useState("PersonalGrowth");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({})

    
    const audio = new Audio();
    audio.src = "/Users/tuban/Desktop/c_d/mySoloProj/client/src/components/button.wav"


    const submitHandler = (e) => {
        e.preventDefault()
        const newHabit = {category, name, description}
        axios.post('http://localhost:8000/api/createHabit', newHabit)
            .then((res) => {
                console.log(res);
                setHabitList([...habitList, res.data])
                navigate('/')
                
            })
            .catch((err)=> {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors)
            })
    }

    return (
        <div>
            <div className="display-all-container">
                <div className="display-all-link">
                    <Link to="/">Home</Link>
                </div>
                <div className="display-all-title">
                    <h1> New Habit </h1>
                </div>
                <div className="display-all-link">
                    <Link to="/newHabit">New Habit</Link>
                </div>
            </div>
            <form onSubmit={submitHandler} className="habit-card2">
                <div style={{ padding: '10px', margin: '10px', fontSize: '24px'}}>
                    <label> Name: </label>
                    <br />
                    <input type="text" onChange={(e)=> setName(e.target.value)} value={name}/>
                    {
                        errors.name?
                        <p> {errors.name.message} </p>:
                        null
                    }
                </div>
                <div style={{ padding: '10px', margin: '10px', fontSize: '24px'}}>
                    <label> Description: </label>
                    <br />
                    <input type="text" onChange={(e)=> setDescription(e.target.value)} value={description}/>
                    {
                        errors.description?
                        <p> {errors.description.message} </p>:
                        null
                    }
                </div>
                <div style={{ padding: '10px', margin: '10px' }}>
                    <label> Category: </label>
                    <br />
                    <select onChange={(e)=> setCategory(e.target.value)}>
                        <option value="PersonalGrowth"> Personal Growth</option>
                        <option value="Sprituality"> Sprituality</option>
                        <option value="Finances">Finances</option>
                        <option value="Career"> Career</option>
                        <option value="Health"> Health</option>
                        <option value="Fun"> Fun</option>
                        <option value="Environment"> Environment</option>
                        <option value="Community"> Community</option>
                        <option value="FamilyFriends"> Family Friends</option>
                        <option value="PartnerLove"> Love</option>
                    </select>
                    {
                        errors.category?
                        <p> {errors.category.message} </p>:
                        null
                    }
                </div>

                <button className="button" onClick={() => "audio.play()"} type="submit"> Submit </button>

            </form>

        </div>
    )
}
export default CreateForm