import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';  //in order to grab that id from url
import {useNavigate} from 'react-router-dom' 
import {Link} from 'react-router-dom'
import click2 from "../assets/click2.wav"

const playSound = () => {
    let audio1 = new Audio(click2);
    audio1.volume = 0.3; 
    audio1.play()
}
//prop or props?
const ViewOne = (prop) => {
    const navigate = useNavigate()
    const [habit, setHabit] = useState({})
    const {id} = useParams()
    //2- state de siteye yansitacak bilgileri simdi

    useEffect(()=> {
        axios.get(`http://localhost:8000/api/findOneHabit/${id}`)
            .then((res) => {
                console.log(res);
                setHabit(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/api/deleteHabit/${id}`)
        .then(() => {
            navigate('/')
        })
        .catch((err) => {
            console.log(err);
        })
    }
    return (
        <div >
            <div className="display-all-container">
                <div className="display-all-link">
                    <Link to="/" onClick={playSound}>Home</Link>
                </div>
                <div className="display-all-title">
                    <h1>Details</h1>
                </div>
                <div className="display-all-link">
                    <Link to="/newHabit" onClick={playSound}>New Habit</Link>
                </div>
            </div>
            <div className="habit-card2">
                <h2>  {habit.name} </h2>
                <h2>  {habit.description} </h2>
                <h2>  {habit.category} </h2>
                <button class="button" onClick={deleteHandler} > Delete </button>
            </div>

        </div>
    )
}

export default ViewOne



// use params url deki id yi cekebilmek icin. appjsx de id nasil yaziyorsa burada da oyle yazip deconstruction ediyorsun
// use effect -> anytime we need to make an api call, display one or display all
// useEffect(()=> {}, []) seklinde kullaniliyor
// api call yapinca axios da kullanmamiz gerekiyor