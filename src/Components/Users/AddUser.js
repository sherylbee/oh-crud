import {React, useState} from "react";
import './AddUser.css'

const AddUser = ({users, onAddUser})=>{
    const [user, updateUserAsync] = useState({username:'', age:''});
    
    const updateUser = (target)=>{
        //this is e.target containing all props of the targeted element
        //see the jsx below for the ~id~ and ~value~ mappings
        const {id, value} = target;
        updateUserAsync({...user, [id]:value})
    }
    const addUserHandler = (e)=>{
        e.preventDefault();
        user.key = user.dataKey = Math.floor(Math.random()*1000);
        onAddUser('add', user)
        updateUserAsync({username:'', age:''})
    }
    return(
        <form onSubmit={addUserHandler}>

            <label htmlFor="username">Username</label>
            <input value={user?.username} type="text" id="username" onChange={(e)=>{return updateUser(e.target)}}/>

            <label htmlFor="age">Age</label>
            <input value={user?.age} type="number" id="age" onChange={(e)=>{return updateUser(e.target)}}/>
            
            <button type="submit">Add User</button>
        </form>
    )
}

export default AddUser;