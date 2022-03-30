import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { TextField, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function Rooms({username}) {
    const [rooms, setRooms] = useState([])
    const [newRoom, setNewRoom] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        const myRooms = localStorage.getItem('rooms');
        if (myRooms) {
            setRooms([...myRooms.split(',')]);
        }
    }, [])
    const addRoom = (e) => {
        if (newRoom) {
            console.log(newRoom)
            setRooms([...rooms, newRoom]);
            localStorage.setItem('rooms', [...rooms, newRoom])
        }
    }
    const deleteRoom = (room) => {
        setRooms([...rooms.filter((r) => {return r !== room})]);
        localStorage.setItem('rooms', [...rooms.filter((r) => {return r !== room})])
    }

  return (
    <div className='rooms-container' >
        <TextField sx={{m:1, mt: 0}} value={newRoom} onChange={(e) => setNewRoom(e.target.value)} ></TextField>
        <Button sx={{m: 1}} onClick={addRoom} variant="contained">Add new room</Button>
        <div className='rooms-list'>
        {rooms.map(room => {
            return (
            <div className='room-container'>
                <Link onClick={(e) => navigate(`/chat/${room}`, {state: {username: username}})} >{room}</Link>
                <Button onClick={() => deleteRoom(room)} color='error' variant="text">Remove</Button>
            </div>
            )
        })}
        </div>
    </div>
  )
}
