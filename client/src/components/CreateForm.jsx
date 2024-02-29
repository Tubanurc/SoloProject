import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const CreateForm = (props) => {
    const navigate = useNavigate() // redirection
    const {habitList, setHabitList} = props;
    const [category, setCategory] = useState("PersonalGrowth");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({})
    
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
            <h2> Add Habit </h2>
            <form onSubmit={submitHandler}>
                <label> Category: </label>
                <select onChange={(e)=> setCategory(e.target.value)}>
                    <option value="PersonalGrowth"> PersonalGrowth</option>
                    <option value="Sprituality"> Sprituality</option>
                    <option value="Finances">"Finances</option>
                    <option value="Career"> Career</option>
                    <option value="Health"> Health</option>
                    <option value="Fun"> Fun</option>
                    <option value="Environment"> Environment</option>
                    <option value="Community"> Community</option>
                    <option value="FamilyFriends"> Family Friends</option>
                    <option value="PartnerLove"> Partner Love</option>
                </select>
                {
                    errors.category?
                    <p> {errors.category.message} </p>:
                    null
                }
                <label> Name: </label>
                <input type="text" onChange={(e)=> setName(e.target.value)} value={name}/>
                {
                    errors.name?
                    <p> {errors.name.message} </p>:
                    null
                }
                <label> Description: </label>
                <input type="text" onChange={(e)=> setDescription(e.target.value)} value={description}/>
                {
                    errors.description?
                    <p> {errors.description.message} </p>:
                    null
                }

                <button type="submit"> Submit </button>
            </form>

        </div>
    )
}
export default CreateForm