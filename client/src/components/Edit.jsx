import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams, useNavigate} from 'react-router-dom';  //in order to grab that id from url


const options = [
    {value: "PersonalGrowth"},
    {value: "Sprituality"},
    {value: "Finances"},
    {value: "Career"},
    {value: "Fun"},
    {value: "Environment"},
    {value: "FamilyFriends"},
    {value: "PartnerLove"}
]

const Edit = (props) => {
    const navigate = useNavigate() // redirection
    const {id} = useParams()
    const [category, setCategory] = useState("Personal Growth");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({})
    const [dropdown, setDropdown] = useState([])

    useEffect(()=> {
        axios.get(`http://localhost:8000/api/findOneHabit/${id}`)
            // 1- bu obkect olarak habitu getiriyor console log a. 
            // axious back end ile iletisime geciriyor
            .then((res) => {
                generateDropdown(res.data.category)
                console.log(res);
                // setHabit(res.data) bunu kullanamiyoruz cunki view one da bu object ti burada degil. 
                //bu alttakileri yazinca value ye eklenmis oluyor otomatik olarak 
                setName(res.data.name)
                setDescription(res.data.description)              
                setCategory(res.data.category)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    //to generate html, jsx tags
    const generateDropdown = (category) => {
        const optionTags = options.map((option) => {
            if(option.value === category){
                return <option value={option.value} selected>{option.value} </option>;
            } 
            else {
                return <option value={option.value}>{option.value} </option>;
            }
        });
        setDropdown(optionTags);
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const updatedHabit = {category, name, description} //bununla datani geri database e gonderiyorsun
        axios.put(`http://localhost:8000/api/updateHabit/${id}`, updatedHabit)
            .then((res) => {
                console.log(res);
                navigate('/')
            })
            .catch((err)=> {
                console.log(err);
                setErrors(err.response.data.errors)
            })
    }
    return (
        <div>
            <h1> EDIT </h1>
            <form onSubmit={submitHandler}>
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
                <label> Category: </label>
                <select onChange={(e)=> setCategory(e.target.value)}>
                    {
                        dropdown.map((option) => (
                            option
                        ))
                    }
                </select>
                {
                    errors.category?
                    <p> {errors.category.message} </p>:
                    null
                }
                <button type="submit"> Submit </button>
            </form>

        </div>
    )
}

export default Edit