import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams} from 'react-router-dom';  //in order to grab that id from url
import {useNavigate} from 'react-router-dom' 
import {Link} from 'react-router-dom'


//prop or props?
const ViewOne = (prop) => {
    const navigate = useNavigate()
    const [habit, setHabit] = useState({})
    const {id} = useParams()
    //2- state de siteye yansitacak bilgileri simdi

    useEffect(()=> {
        axios.get(`http://localhost:8000/api/findOneHabit/${id}`)
            // 1- bu obkect olarak habitu getiriyor console log a. 
            // axious back end ile iletisime geciriyor
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
      <div>
        <div style={{ background: '#FFF6FF',color:'black', padding: '10px', width: '80vw', display: 'flex', alignItems: 'center' }}>
            <div style={{ padding: '20px' }}>
                <Link to={`/`}> Home </Link>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
                <h1> Details </h1>
            </div>
            <div style={{padding:'20px'}}>
                <Link to={`/newHabit`}> New Habit </Link>
            </div>
        </div>

        <div style={{ border: '2px solid gray', backgroundColor: '#FFF6FF', padding: '30px', margin: '20px' }}>
            <h2> Name: {habit.name} </h2>
            <h2> Description: {habit.description} </h2>
            <h2> Category: {habit.category} </h2>
            <button onClick={deleteHandler}> Delete {habit.name} </button>
        </div>

      </div>
    )
}

export default ViewOne



// use params url deki id yi cekebilmek icin. appjsx de id nasil yaziyorsa burada da oyle yazip deconstruction ediyorsun
// use effect -> anytime we need to make an api call, display one or display all
// useEffect(()=> {}, []) seklinde kullaniliyor
// api call yapinca axios da kullanmamiz gerekiyor