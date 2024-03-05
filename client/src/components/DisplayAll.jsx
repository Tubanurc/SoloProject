import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'



//that is all


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
                    <Link to="/">Home</Link>
                </div>
                <div className="display-all-title">
                    <h1>Wheel of Life</h1>
                </div>
                <div className="display-all-link">
                    <Link to="/newHabit">New Habit</Link>
                </div>
            </div>
            <div className='allhabits'>

            

            {habitList.map((habit) => (
                <div key={habit._id} className="habit-card">
                    <h4>{habit.category}</h4>
                    <h5>{habit.name}</h5>
                    <h6>{habit.description}</h6>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div class="button2"><Link to={`/edit/${habit._id}`}>Edit</Link></div>
                        <div class="button2"><Link to={`/habit/${habit._id}`}>Details</Link></div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};



export default DisplayAll