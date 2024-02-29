import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const DisplayAll = (props) => {
    const {habitList, setHabitList} = props 
    useEffect(() => {
        axios.get('http://localhost:8000/api/allHabits')
            .then((response) => {
                console.log(response.data);
                setHabitList(response.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    return (
        <div >
            <div style={{ background: '#FFF6FF',color:'black', padding: '10px', width: '80vw', display: 'flex', alignItems: 'center' }}>
                <div style={{ padding: '20px' }}>
                    <Link to={`/`}>Home</Link>
                </div>
                <div style={{ flex: 1, textAlign: 'center' }}>
                    <h1> Wheel of Life </h1>
                </div>
                <div style={{padding:'20px'}}>
                    <Link to={`/newHabit`}> New Habit </Link>
                </div>
            </div>
            {
                habitList.map((habit) => (
                    <div key={habit._id}>
                        <h2> Category: {habit.category}</h2>
                        <h2> Name: {habit.name} </h2>
                        <h2> Description: {habit.description} </h2>
                        <Link to={`/edit/${habit._id}`}> Edit </Link>
                        <br />
                        <Link to={`/habit/${habit._id}`}> Details </Link>
                    </div>
                ))
            }
        </div>
    )
}

export default DisplayAll