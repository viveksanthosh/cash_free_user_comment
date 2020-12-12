import React, { useEffect, useState } from 'react'
import './selectUsers.css'

const SelectUsers = ({ selectedUser, onSelectedUserChange }) => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch('/api/users').then(r => {
            if (!r.ok)
                return
            r.json().then(u => {
                setUsers(u)
            })
        })
    }, [])
    const onSelectChange = (e) => {
        const user_id = e?.target?.value
        onSelectedUserChange(user_id)
    }
    return <section className='selectUsers'>
        <label>Comment As</label>
        <select onChange={onSelectChange} >{users.map(u => <option
            key={u.user_id}
            value={u.user_id}
            selected={u.user_id === selectedUser}
        >
            {u.name}
        </option>)}
        </select>
    </section>
}

export { SelectUsers }