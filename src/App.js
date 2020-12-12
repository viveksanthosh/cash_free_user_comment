import React, { useState } from 'react';
import { SelectUsers, Comments } from './Components'
import { SelectedUserContext } from './contexts'
import './App.css';

const App = () => {
  const [selectedUser, setSelectedUser] = useState(2)
  const onSelectedUserChange = (user_id) => {
    setSelectedUser(user_id)
  }

  return <SelectedUserContext.Provider value={selectedUser}>
    <header>CashFree</header>
    <div className='container'>
      <SelectUsers selectedUser={selectedUser}
        onSelectedUserChange={onSelectedUserChange} />
      <Comments />
    </div>
    <footer></footer>
  </SelectedUserContext.Provider>
};

export default App;
