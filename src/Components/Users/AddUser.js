import {React, useState} from "react";
import './AddUser.css'

const AddUser = ({users, onAddUser, onNotifyParent})=>{
    const [user, updateUserAsync] = useState({username:'', age:''});
    const checkAForMissingValues = (userToCheck)=>{
        let userValues = [];
        for(let key in userToCheck){
            //userValues tracks a list of undefined prop i.e. unfilled form values  
            if(!user[key]){
                userValues = [...userValues, key]
            }
        }
        return userValues;
    }
    const updateUser = (target)=>{
        //this is e.target containing all props of the targeted element
        //see the jsx below for the ~id~ and ~value~ mappings
        const {id, value} = target;
        updateUserAsync({...user, [id]:value})
        let missingValues = checkAForMissingValues({...user, [id]:value});
        if(missingValues.length<=1){
            onNotifyParent("");
        }
    }

    const addUserHandler = (e)=>{
        e.preventDefault();
        user.key = user.dataKey = Math.floor(Math.random()*1000);
        let warningMessage = ""
            let missingValues = checkAForMissingValues(user)
            if(!missingValues.length){
                //if userValues is empty, everything is defined, so OK to create a user and clear the warning in the parent state for dissemination
                onAddUser('add', user)
                updateUserAsync({username:'', age:''})
                onNotifyParent(warningMessage)
            }
            else{
                //otherwise don't create a user because it has blanks. Instead create a warning message containing the fields to fix and lift it up to the parent
                warningMessage = `Please submit ${missingValues.join(' and ')}...`
                onNotifyParent(warningMessage)
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