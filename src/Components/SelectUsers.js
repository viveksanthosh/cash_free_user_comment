import React, { useEffect, useState } from 'react'
import './SelectUsers.css'

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
        <select value={selectedUser ? selectedUser : ''} onChange={onSelectChange} >{users.map(u => <option
            key={u.user_id}
            value={u.user_id}

        >
            {u.name}
        </option>)}
        </select>
    </section>
}

export { SelectUsers }