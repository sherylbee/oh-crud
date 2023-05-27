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
        let userValues = [];
           for(let key in user){
                if(!user[key]){
                    userValues = [...userValues, key]
                    console.log(`please submit ${key}`)
                }
            }
            if(!userValues.length){
                onAddUser('add', user)
                updateUserAsync({username:'', age:''})
            }

    }
    return(
        <form onSubmit={addUserHandler}>

            {/* <label htmlFor="username">Username</label> */}
            <div className="input username">
                <input placeholder="Username" value={user?.username} type="text" id="username" onChange={(e)=>{return updateUser(e.target)}}/>
            </div>
       

            {/* <label htmlFor="age">Age</label> */}
            <div className="input age">
                <input placeholder="Age" value={user?.age} type="number" id="age" onChange={(e)=>{return updateUser(e.target)}}/>
            </div>
       
            
            <button type="submit">Add User</button>
        </form>
    )
}

export default AddUser;