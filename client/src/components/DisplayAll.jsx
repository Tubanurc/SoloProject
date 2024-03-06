import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import click2 from "../assets/click2.wav"

const playSound = () => {
    let audio1 = new Audio(click2);
    audio1.volume = 0.3; 
    audio1.play()
}



const DisplayAll = (props) => {
    const { habitList, setHabitList } = props;
        


    useEffect(() => {
        axios.get('http://localhost:8000/api/allHabits')
            .then((response) => {
                console.log(response.data);
                setHabitList(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <div className="display-all-container">
                <div className="display-all-link">
                    <Link to="/" onClick={playSound}>Home</Link>
                </div>
                <div className="display-all-title">
                    <h1>Wheel of Life</h1>
                </div>
                <div className="display-all-link">
                    <Link to="/newHabit" onClick={playSound}>New Habit</Link>
                </div>
            </div>
            <div className='allhabits'>

            

            {habitList.map((habit) => (
                <div key={habit._id} className="habit-card">
                    <h4>{habit.category}</h4>
                    <h5>{habit.name}</h5>
                    <h6>{habit.description}</h6>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div class="button2"><Link to={`/edit/${habit._id}`} onClick={playSound}>Edit</Link></div>
                        <div class="button2"><Link to={`/habit/${habit._id}`} onClick={playSound}>Details</Link></div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};



export default DisplayAll