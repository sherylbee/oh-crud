import './App.css';
import './Users/User.css';
import AddUser  from './Users/AddUser';
import Card from './UI/Card';
import {React, useEffect, useState} from 'react';

function User({name, age, dataKey, removeUser}){
  function handleClick(e){
    e.preventDefault();
    removeUser('remove', {name, age, dataKey})
  }
  return (
    <div className='user' style={{color:'white'}} onClick={(e)=>handleClick(e)}>
    <div>
      <span>Username: </span><span className="username">{name}</span>
    </div>
    <div>
      <span>Age: </span><span className="age">{age}</span>
    </div>
    </div>
  )
}



function Modal({type, modalState, close, term}){
  const [showModal, updateShowModal] = useState(modalState)

  useEffect(() => {
    updateShowModal(modalState)
  }, [modalState])

  function dismissModal(okay){
    updateShowModal('hide')
    close(okay, term)
  }
  
  const classes = `${type?type:""}` ;
  return(
    <Card className={`modal ${showModal}`}>  
      <div className={classes}>
        <h1>You're about to toast this user!!!</h1>
        <br />
        <h3>...you cool with that?</h3>
        <div className="button-wrapper">
          <button className='yup' onClick={()=>dismissModal(true)}>Yup</button>
          <button className='nope' onClick={()=>dismissModal(false)}>Nope</button>
        </div>
      </div>
    </Card>

  )
}

function App() {
  let [users, updateUsers] = useState([]);
  let [selectedUser, updateSelectedUser] = useState({username:'', age:'', key:'', dataKey:''})
  const ModalStates = ['show', 'hide', 'hidden']
  let [modalState, updateModalState] = useState(ModalStates[2]) 
  let [displayMsg, updateDisplayMsg] = useState('') 
  const handleCloseModal = (accept, user)=>{
    updateModalState(ModalStates[1])
    if(!accept) return;
    const usersCopy = [...users];//making shallow copy so that react has new reference and recognizes the update
    const idx = usersCopy.findIndex(existingUser=> user.dataKey === existingUser.dataKey);
    usersCopy.splice(idx, 1)
    updateUsers(usersCopy)
  }

  const scheduleUpdateUser = (update, user)=>{
    // eslint-disable-next-line default-case
    switch (update) {
      case 'add':
        console.log(user)

        updateUsers((prev)=>{
          return [...prev, user]
        })
        break;
      case 'remove':
        updateSelectedUser(user)
        updateModalState(ModalStates[0])
    }
  }
  const showMessage = (msg)=>{
    updateDisplayMsg(msg)
  }

  let usersElementList = users.map(user=><User removeUser={scheduleUpdateUser} name={user.username} age={user.age} key={user.key} dataKey={user.key}/>)

  return (
    <div className="App">
      <Modal type="warning" modalState={modalState} close={handleCloseModal} term={selectedUser}/>
      <Card msg={displayMsg} className="addUser">
        <AddUser users={users} onAddUser={scheduleUpdateUser} onNotifyParent={showMessage}/>
      </Card>
      <h1 style={{color:'orange', textDecoration: 'underline'}}>Added Users</h1>

      {usersElementList}
    </div>
  );
}

export default App;
