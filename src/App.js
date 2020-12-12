import React, { useState } from 'react';
import { SelectUsers, Comments } from './Components'
import './App.css';

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null)
  const onSelectedUserChange = (user_id) => {
    setSelectedUser(user_id)
  }
  return <>
    <header>CashFree</header>
    <div className='container'>
      <SelectUsers selectedUser={selectedUser}
        onSelectedUserChange={onSelectedUserChange} />
      <Comments />
    </div>
    <footer></footer>
  </>
};

export default App;
